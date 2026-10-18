"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { useCart } from "./CartProvider";

const BRAND = "GLOW";

const mobileLinks = [
  { href: "/#top", label: "Accueil" },
  { href: "/#categories", label: "Beauté" },
  { href: "/#promo", label: "Mode" },
  { href: "/#meches", label: "Mèches & Extensions" },
  { href: "/#bestsellers", label: "Nouveautés" },
  { href: "/#footer", label: "Contact" },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { count, add } = useCart();
  const close = () => setNavOpen(false);

  return (
    <>
      <div className="announce">
        Livraison offerte dès 25 000 FCFA<span>•</span>Nouveautés chaque semaine
        <span>•</span>Paiement à la livraison disponible
      </div>

      <header className="site">
        <div className="wrap nav-row">
          <Link href="/#top" className="brand">
            <Icon name="i-flower" />
            {BRAND}
          </Link>
          <nav className="nav-links" aria-label="Navigation principale">
            <Link href="/#top">Accueil</Link>
            <Link href="/#categories">Beauté</Link>
            <Link href="/#promo">Mode</Link>
            <Link href="/#meches">Mèches</Link>
            <Link href="/#bestsellers">Nouveautés</Link>
            <Link href="/#footer">Contact</Link>
          </nav>
          <div className="nav-actions">
            <button type="button" className="icon-btn" aria-label="Rechercher">
              <Icon name="i-search" />
            </button>
            <Link href="/#top" className="icon-btn" aria-label="Mon compte">
              <Icon name="i-user" />
            </Link>
            <button
              type="button"
              className="icon-btn"
              aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}
              onClick={add}
            >
              <Icon name="i-cart" />
              <span className="cart-badge">{count}</span>
            </button>
            <Link
              href="/#bestsellers"
              className="btn btn-primary desktop-only"
              style={{ marginLeft: 6 }}
            >
              Boutique
            </Link>
            <button
              type="button"
              className="icon-btn burger"
              aria-label={navOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setNavOpen(!navOpen)}
            >
              <Icon name="i-menu" />
            </button>
          </div>
        </div>

        <div className={`mobile-panel ${navOpen ? "open" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/#top" className="brand" onClick={close}>
              <Icon name="i-flower" />
              {BRAND}
            </Link>
            <button type="button" className="icon-btn" aria-label="Fermer le menu" onClick={close}>
              <Icon name="i-close" />
            </button>
          </div>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginTop: 36,
              fontSize: 21,
              fontFamily: "var(--font-fraunces), serif",
            }}
          >
            {mobileLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                style={{
                  padding: "14px 4px",
                  borderBottom: i < mobileLinks.length - 1 ? "1px solid var(--line)" : undefined,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#bestsellers"
            onClick={close}
            className="btn btn-primary"
            style={{ marginTop: 28, width: "100%" }}
          >
            Voir la boutique
          </Link>
        </div>
      </header>
    </>
  );
}
