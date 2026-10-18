import Link from "next/link";
import Icon from "./Icon";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function Bestsellers({ products }: { products: Product[] }) {
  return (
    <section className="sec wrap" id="bestsellers">
      <div className="sec-head">
        <div>
          <span className="eyebrow">Les chouchous</span>
          <h2>Nos meilleures ventes</h2>
        </div>
        <Link href="/#bestsellers" className="btn btn-ghost">
          Tout voir <Icon name="i-arrow" />
        </Link>
      </div>
      {products.length > 0 ? (
        <div className="prod-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--ink-soft)" }}>Les nouveautés arrivent très bientôt.</p>
      )}
    </section>
  );
}
