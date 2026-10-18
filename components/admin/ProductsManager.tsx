"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/format";
import { LOW_STOCK, type AdminProduct, type Category } from "@/lib/types";
import ProductForm from "./ProductForm";

type Props = {
  products: AdminProduct[];
  categories: Category[];
  loadError?: string;
};

export default function ProductsManager({ products, categories, loadError }: Props) {
  const router = useRouter();
  // null = formulaire fermé, "new" = ajout, sinon le produit à modifier
  const [editing, setEditing] = useState<AdminProduct | "new" | null>(null);
  const [error, setError] = useState("");

  async function toggleActive(p: AdminProduct) {
    setError("");
    const { error } = await createClient()
      .from("products")
      .update({ is_active: !p.is_active })
      .eq("id", p.id);
    if (error) return setError(error.message);
    router.refresh();
  }

  function done() {
    setEditing(null);
    router.refresh();
  }

  return (
    <>
      <div className="admin-head">
        <h1 className="admin-title">Produits</h1>
        {!editing && (
          <button type="button" className="btn btn-primary admin-btn-sm" onClick={() => setEditing("new")}>
            Ajouter un produit
          </button>
        )}
      </div>

      {loadError && (
        <p className="login-error" role="alert">
          Impossible de charger les produits : {loadError}
        </p>
      )}
      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}

      {editing && (
        <ProductForm
          key={editing === "new" ? "new" : editing.id}
          product={editing === "new" ? null : editing}
          categories={categories}
          onDone={done}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Produit</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Statut</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className={p.is_active ? "" : "is-off"}>
                <td>
                  {p.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.photo_url} alt="" className="admin-thumb" />
                  ) : (
                    <span className="admin-thumb admin-thumb-empty" />
                  )}
                </td>
                <td>
                  <strong>{p.name}</strong>
                  <span className="admin-sub">{p.categories?.name ?? "Sans catégorie"}</span>
                </td>
                <td>
                  {formatPrice(p.price)}
                  {p.old_price ? <span className="admin-sub">{formatPrice(p.old_price)}</span> : null}
                </td>
                <td>
                  <span className={`admin-stock${p.stock <= 0 ? " out" : p.stock <= LOW_STOCK ? " low" : ""}`}>
                    {p.stock <= 0 ? "Rupture" : p.stock}
                  </span>
                </td>
                <td>{p.is_active ? "Actif" : "Désactivé"}</td>
                <td className="admin-actions">
                  <button type="button" className="admin-link" onClick={() => setEditing(p)}>
                    Modifier
                  </button>
                  <button type="button" className="admin-link" onClick={() => toggleActive(p)}>
                    {p.is_active ? "Désactiver" : "Activer"}
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "var(--ink-soft)", padding: 32 }}>
                  Aucun produit pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
