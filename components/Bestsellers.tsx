import Link from "next/link";
import Icon from "./Icon";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function Bestsellers({ products, query }: { products: Product[]; query?: string }) {
  return (
    <section className="sec wrap" id="bestsellers">
      <div className="sec-head">
        <div>
          <span className="eyebrow">{query ? "Recherche" : "Les chouchous"}</span>
          <h2>{query ? `Résultats pour « ${query} »` : "Nos meilleures ventes"}</h2>
        </div>
        <Link href="/#bestsellers" className="btn btn-ghost">
          {query ? "Effacer la recherche" : "Tout voir"} <Icon name="i-arrow" />
        </Link>
      </div>
      {products.length > 0 ? (
        <div className="prod-grid">
          {products.map((p) => (
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
