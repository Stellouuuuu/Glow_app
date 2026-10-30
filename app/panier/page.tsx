"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useCart } from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import MobileTabBar from "@/components/MobileTabBar";
import Sprite from "@/components/Sprite";
import { formatPrice, illustrationFor, whatsappLink } from "@/lib/format";
import { logOrders } from "@/lib/orders";

export default function CartPage() {
  const { items, setQty, toggle, toggleAll, remove } = useCart();
  const selected = items.filter((i) => i.selected && i.stock > 0);
  const total = selected.reduce((sum, i) => sum + i.price * i.qty, 0);
  const units = selected.reduce((sum, i) => sum + i.qty, 0);
  const allSelected = items.length > 0 && items.every((i) => i.selected);

  const message =
    `Bonjour GLOW, je souhaite commander :\n` +
    selected.map((i) => `- ${i.name} x${i.qty} (${formatPrice(i.price * i.qty)})`).join("\n") +
    `\nTotal : ${formatPrice(total)}`;

  function order() {
    logOrders(selected.map((i) => ({ product_id: i.id, quantity: i.qty, total_price: i.price * i.qty })));
    remove(selected.map((i) => i.id));
  }

  return (
    <div className="glow-root" id="top">
      <Sprite />
      <Header />
      <div className="wrap back-row">
        <BackButton fallback="/" />
      </div>
      <main className="sec wrap cart">
        <span className="eyebrow">Mon panier</span>
        <h1 className="account-title">Mes envies de commande</h1>

        {items.length === 0 ? (
          <p style={{ color: "var(--ink-soft)", fontSize: 14.5 }}>
            Ton panier est vide.{" "}
            <Link href="/#bestsellers" style={{ color: "var(--rose)", fontWeight: 600 }}>
              Découvrir la boutique
            </Link>
          </p>
        ) : (
          <>
            <div className="cart-bar">
              <label>
                <input type="checkbox" checked={allSelected} onChange={(e) => toggleAll(e.target.checked)} />
                Tout sélectionner
              </label>
              <button type="button" className="cart-link" onClick={() => remove(items.filter((i) => i.selected).map((i) => i.id))}>
                Supprimer la sélection
              </button>
            </div>

            <ul className="cart-list">
              {items.map((i) => {
                const out = i.stock <= 0;
                return (
                  <li key={i.id} className={`cart-item${out ? " out" : ""}`}>
                    <input
                      type="checkbox"
                      aria-label={`Commander ${i.name}`}
                      checked={i.selected && !out}
                      disabled={out}
                      onChange={() => toggle(i.id)}
                    />
                    <Link href={`/produit/${i.slug}`} className="cart-thumb">
                      {i.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={i.photo_url} alt={i.name} className="prod-photo" />
                      ) : (
                        <Icon name={illustrationFor(null)} />
                      )}
                    </Link>
                    <div className="cart-info">
                      <Link href={`/produit/${i.slug}`} className="cart-name">
                        {i.name}
                      </Link>
                      <span className="price">{formatPrice(i.price)}</span>
                      {out ? (
                        <span className="prod-out">Rupture de stock</span>
                      ) : (
                        <div className="cart-qty">
                          <button type="button" aria-label="Diminuer" disabled={i.qty <= 1} onClick={() => setQty(i.id, i.qty - 1)}>
                            −
                          </button>
                          <span>{i.qty}</span>
                          <button type="button" aria-label="Augmenter" disabled={i.qty >= i.stock} onClick={() => setQty(i.id, i.qty + 1)}>
                            +
                          </button>
                        </div>
                      )}
                    </div>
                    <button type="button" className="cart-remove" aria-label={`Retirer ${i.name}`} onClick={() => remove([i.id])}>
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="cart-summary">
              <div className="cart-total">
                <span>
                  Total ({units} article{units > 1 ? "s" : ""})
                </span>
                <strong>{formatPrice(total)}</strong>
              </div>
              {selected.length === 0 ? (
                <button type="button" className="btn btn-primary" disabled>
                  Coche au moins un article
                </button>
              ) : (
                <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={order}>
                  Commander <Icon name="i-arrow" />
                </a>
              )}
              <p className="cart-note">Tu finalises ta commande sur WhatsApp. Paiement à la livraison disponible.</p>
            </div>
          </>
        )}
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  );
}
