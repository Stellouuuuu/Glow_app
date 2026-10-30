"use client";

import Link from "next/link";
import Icon from "./Icon";
import { useCart } from "./CartProvider";
import { formatAmount, formatPrice, illustrationFor } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const outOfStock = product.stock <= 0;

  return (
    <article className="prod-card">
      <button type="button" className="wish-btn" aria-label="Ajouter aux favoris">
        <Icon name="i-heart" />
      </button>
      <Link href={`/produit/${product.slug}`} className="prod-link">
        <div className="prod-media">
          {product.badge && (
            <span className={`prod-tag${product.badge.startsWith("-") ? " sale" : ""}`}>
              {product.badge}
            </span>
          )}
          {product.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.photo_url} alt={product.name} className="prod-photo" />
          ) : (
            <Icon name={illustrationFor(product.categories?.slug)} />
          )}
        </div>
        <div className="prod-body">
          <h3 className="prod-name">{product.name}</h3>
          <div className="price-row">
            <span className="price">
              {formatAmount(product.price)}
              <small>FCFA</small>
            </span>
            {product.old_price ? (
              <span className="price-old">{formatPrice(product.old_price)}</span>
            ) : null}
          </div>
          {outOfStock && <span className="prod-out">Rupture de stock</span>}
        </div>
      </Link>
      {!outOfStock && (
        <button type="button" className="prod-mini" onClick={() => add(product)} aria-label={`Ajouter ${product.name} au panier`}>
          <Icon name="i-cart" />
        </button>
      )}
    </article>
  );
}
