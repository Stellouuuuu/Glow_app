"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/slug";
import type { AdminProduct, Category } from "@/lib/types";

const BUCKET = "product-photos";
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const NEW_CATEGORY = "__new__";
const MAX_PHOTOS = 8;

// Une photo du formulaire : déjà en ligne (url) ou en attente d'upload (file).
type PhotoItem = { key: string; url: string; file?: File };

const storagePath = (url: string) => {
  const marker = `/${BUCKET}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
};

type Props = {
  product: AdminProduct | null;
  categories: Category[];
  onDone: () => void;
  onCancel: () => void;
};

export default function ProductForm({ product, categories, onDone, onCancel }: Props) {
  const [name, setName] = useState(product?.name ?? "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "");
  const [newCategory, setNewCategory] = useState("");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [oldPrice, setOldPrice] = useState(product?.old_price ? String(product.old_price) : "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [stock, setStock] = useState(product ? String(product.stock) : "0");
  const [badge, setBadge] = useState(product?.badge ?? "");
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const urls = product?.photos?.length ? product.photos : product?.photo_url ? [product.photo_url] : [];
    return urls.map((url) => ({ key: url, url }));
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function onPhotosChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    if (files.some((f) => !f.type.startsWith("image/"))) return setError("Les fichiers doivent être des images.");
    if (files.some((f) => f.size > MAX_PHOTO_BYTES)) return setError("Chaque photo ne doit pas dépasser 5 Mo.");
    if (photos.length + files.length > MAX_PHOTOS) return setError(`Maximum ${MAX_PHOTOS} photos par produit.`);
    setError("");
    setPhotos((prev) => [
      ...prev,
      ...files.map((file) => ({ key: crypto.randomUUID(), url: URL.createObjectURL(file), file })),
    ]);
  }

  function movePhoto(i: number, dir: -1 | 1) {
    setPhotos((prev) => {
      const next = [...prev];
      [next[i], next[i + dir]] = [next[i + dir], next[i]];
      return next;
    });
  }

  const removePhoto = (i: number) => setPhotos((prev) => prev.filter((_, j) => j !== i));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const priceNum = Number(price);
    const oldPriceNum = oldPrice ? Number(oldPrice) : null;
    const stockNum = Number(stock);
    if (!Number.isInteger(priceNum) || priceNum <= 0) return setError("Le prix doit être un nombre entier positif.");
    if (oldPriceNum !== null && (!Number.isInteger(oldPriceNum) || oldPriceNum <= 0))
      return setError("Le prix barré doit être un nombre entier positif.");
    if (!Number.isInteger(stockNum) || stockNum < 0) return setError("Le stock doit être un entier supérieur ou égal à 0.");
    if (categoryId === NEW_CATEGORY && !newCategory.trim()) return setError("Indique le nom de la nouvelle catégorie.");

    setSaving(true);
    const supabase = createClient();

    // 1. Catégorie à créer au besoin
    let finalCategoryId: string | null = categoryId && categoryId !== NEW_CATEGORY ? categoryId : null;
    if (categoryId === NEW_CATEGORY) {
      const { data, error } = await supabase
        .from("categories")
        .insert({ name: newCategory.trim(), slug: slugify(newCategory) })
        .select("id")
        .single();
      if (error) {
        setSaving(false);
        return setError(`Catégorie : ${error.message}`);
      }
      finalCategoryId = data.id;
    }

    // 2. Upload des nouvelles photos dans Supabase Storage (l'ordre du formulaire est conservé)
    const uploadedPaths: string[] = [];
    const urls: string[] = [];
    for (const item of photos) {
      if (!item.file) {
        urls.push(item.url);
        continue;
      }
      const ext = (item.file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `${crypto.randomUUID()}.${ext || "jpg"}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, item.file, { contentType: item.file.type, upsert: false });
      if (error) {
        if (uploadedPaths.length) await supabase.storage.from(BUCKET).remove(uploadedPaths);
        setSaving(false);
        return setError(`Upload de la photo : ${error.message}`);
      }
      uploadedPaths.push(path);
      urls.push(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
    }

    // 3. Enregistrement du produit (le slug d'un produit existant ne change pas)
    const values = {
      name: name.trim(),
      category_id: finalCategoryId,
      price: priceNum,
      old_price: oldPriceNum,
      description: description.trim() || null,
      stock: stockNum,
      badge: badge.trim() || null,
      is_active: isActive,
      photo_url: urls[0] ?? null,
      photos: urls,
    };

    const { error } = product
      ? await supabase.from("products").update(values).eq("id", product.id)
      : await supabase.from("products").insert({ ...values, slug: slugify(name) });

    if (error) {
      // Évite de laisser une photo orpheline si l'enregistrement a échoué
      if (uploadedPaths.length) await supabase.storage.from(BUCKET).remove(uploadedPaths);
      setSaving(false);
      return setError(
        error.code === "23505" ? "Un produit avec ce nom (ou ce lien) existe déjà." : error.message
      );
    }

    // 4. Nettoyage des photos retirées du produit
    const before = product?.photos?.length ? product.photos : product?.photo_url ? [product.photo_url] : [];
    const removed = before.filter((u) => !urls.includes(u)).map(storagePath).filter((x): x is string => !!x);
    if (removed.length) await supabase.storage.from(BUCKET).remove(removed);

    setSaving(false);
    onDone();
  }

  return (
    <form className="admin-form card-shadow" onSubmit={onSubmit}>
      <h2>{product ? "Modifier le produit" : "Ajouter un produit"}</h2>

      <div className="admin-grid">
        <div className="admin-field admin-span2">
          <label htmlFor="p-name">Nom</label>
          <input id="p-name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="admin-field">
          <label htmlFor="p-cat">Catégorie</label>
          <select id="p-cat" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Sans catégorie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
            <option value={NEW_CATEGORY}>+ Nouvelle catégorie...</option>
          </select>
          {categoryId === NEW_CATEGORY && (
            <input
              aria-label="Nom de la nouvelle catégorie"
              placeholder="Nom de la catégorie"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{ marginTop: 8 }}
            />
          )}
        </div>

        <div className="admin-field">
          <label htmlFor="p-badge">Badge (optionnel)</label>
          <input id="p-badge" placeholder="Nouveau, Populaire, -20%..." value={badge} onChange={(e) => setBadge(e.target.value)} />
        </div>

        <div className="admin-field">
          <label htmlFor="p-price">Prix (FCFA)</label>
          <input id="p-price" type="number" min="1" step="1" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div className="admin-field">
          <label htmlFor="p-old">Prix barré (optionnel)</label>
          <input id="p-old" type="number" min="1" step="1" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
        </div>

        <div className="admin-field">
          <label htmlFor="p-stock">Stock</label>
          <input id="p-stock" type="number" min="0" step="1" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>

        <div className="admin-field admin-check">
          <label>
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Visible sur le site
          </label>
        </div>

        <div className="admin-field admin-span2">
          <label htmlFor="p-desc">Description</label>
          <textarea id="p-desc" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="admin-field admin-span2">
          <label htmlFor="p-photo">
            Photos ({photos.length}/{MAX_PHOTOS}) - la première est la photo de couverture
          </label>
          <div className="admin-photos">
            {photos.map((p, i) => (
              <div className="admin-photo-item" key={p.key}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={`Photo ${i + 1}`} className="admin-thumb" />
                {i === 0 && <span className="admin-photo-cover">Couverture</span>}
                <div className="admin-photo-tools">
                  <button type="button" aria-label="Déplacer à gauche" disabled={i === 0} onClick={() => movePhoto(i, -1)}>
                    ←
                  </button>
                  <button type="button" aria-label="Retirer la photo" onClick={() => removePhoto(i)}>
                    ✕
                  </button>
                  <button type="button" aria-label="Déplacer à droite" disabled={i === photos.length - 1} onClick={() => movePhoto(i, 1)}>
                    →
                  </button>
                </div>
              </div>
            ))}
          </div>
          {photos.length < MAX_PHOTOS && (
            <input id="p-photo" type="file" accept="image/*" multiple onChange={onPhotosChange} style={{ marginTop: 10 }} />
          )}
        </div>
      </div>

      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-primary admin-btn-sm" disabled={saving}>
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
        <button type="button" className="btn btn-outline admin-btn-sm" onClick={onCancel} disabled={saving}>
          Annuler
        </button>
      </div>
    </form>
  );
}
