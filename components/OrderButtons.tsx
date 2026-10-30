"use client";

import Icon from "./Icon";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { logOrders } from "@/lib/orders";
import { formatPrice, whatsappLink } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function OrderButtons({ product }: { product: Product }) {
  const { add } = useCart();
  const outOfStock = product.stock <= 0;

  if (outOfStock) {
    const href = whatsappLink(
      `Bonjour GLOW, "${product.name}" est en rupture de stock. Pouvez-vous me prévenir à son retour ?`
    );
    return (
      <div className="pd-actions">
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          Rupture de stock, me prévenir au retour
        </a>
      </div>
    );
  }

  const href = whatsappLink(
    `Bonjour GLOW, je souhaite commander : ${product.name} (${formatPrice(product.price)}).`
  );

  const logOrder = () => logOrders([{ product_id: product.id, quantity: 1, total_price: product.price }]);

  return (
    <div className="pd-actions">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        onClick={logOrder}
      >
        Commander maintenant <Icon name="i-arrow" />
      </a>
      <button type="button" className="btn btn-outline" onClick={() => add(product)}>
        Ajouter au panier
      </button>
      <Link href="/panier" className="btn btn-outline">
        Voir mon panier
      </Link>
    </div>
  );
}
