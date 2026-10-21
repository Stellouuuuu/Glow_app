"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function Bestsellers({ products, query }: { products: Product[]; query?: string }) {
  const [tab, setTab] = useState("all");

  // Un onglet par catégorie réellement présente dans les produits.
  const tabs = useMemo(() => {
    const seen = new Map<string, string>();
    products.forEach((p) => p.categories && seen.set(p.categories.slug, p.categories.name));
    return Array.from(seen, ([slug, name]) => ({ slug, name }));
  }, [products]);

  const active = tabs.some((t) => t.slug === tab) ? tab : "all";
  const visible = active === "all" ? products : products.filter((p) => p.categories?.slug === active);

  return (
    <section className="sec wrap" id="bestsellers">
      <div className="sec-head">
        <div>
          <span className="eyebrow">{query ? "Recherche" : "Les chouchous"}</span>
          <h2>{query ? `Résultats pour « ${query} »` : "Nos meilleures ventes"}</h2>
        </div>
        {query && (
          <Link href="/#bestsellers" className="btn btn-ghost">
            Effacer la recherche <Icon name="i-arrow" />
          </Link>
        )}
      </div>

      {tabs.length > 1 && (
        <div className="prod-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={active === "all"} className={active === "all" ? "active" : ""} onClick={() => setTab("all")}>
            Tout
          </button>
          {tabs.map((t) => (
            <button
              key={t.slug}
              type="button"
              role="tab"
              aria-selected={active === t.slug}
              className={active === t.slug ? "active" : ""}
              onClick={() => setTab(t.slug)}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}

      {visible.length > 0 ? (
        <div className="prod-grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--ink-soft)" }}>
          {query ? "Aucun produit ne correspond à ta recherche." : "Les nouveautés arrivent très bientôt."}
        </p>
      )}
    </section>
  );
}
