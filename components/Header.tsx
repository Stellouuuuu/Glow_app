"use client";

import { useState } from "react";
import Link from "next/link";
import AccountMenu from "./AccountMenu";
import Icon from "./Icon";
import SearchBar from "./SearchBar";
import { useCart } from "./CartProvider";

const BRAND = "GLOW";

const mobileLinks = [
  { href: "/#top", label: "Accueil" },
  { href: "/#categories", label: "Beauté" },
  { href: "/#bestsellers", label: "Mode" },
  { href: "/#bestsellers", label: "Mèches & Extensions" },
  { href: "/#bestsellers", label: "Nouveautés" },
  { href: "/#footer", label: "Contact" },
];

const desktopLinks = [
  { href: "/#categories", label: "Catégories" },
  { href: "/#bestsellers", label: "Nouveautés" },
  { href: "/#categories", label: "Beauté" },
  { href: "/#bestsellers", label: "Mode" },
  { href: "/#bestsellers", label: "Mèches" },
  { href: "/#footer", label: "Contact" },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { count } = useCart();
  const close = () => setNavOpen(false);

  return (
    <>
      <div className="announce">
        <div className="wrap announce-row">
          <span className="announce-item">
            <Icon name="i-truck" />
            <span>
              <strong>Livraison offerte</strong> dès 25 000 FCFA
            </span>
          </span>
          <span className="announce-item">
            <Icon name="i-cash" />
            <span>
              <strong>Paiement à la livraison</strong> disponible
            </span>
          </span>
          <span className="announce-item">
            <Icon name="i-refresh" />
            <span>
              <strong>Retours faciles</strong> sous 7 jours
            </span>
          </span>
        </div>
      </div>

      <header className="site">
        <div className="wrap nav-row">
          <Link href="/#top" className="brand">
            <Icon name="i-flower" />
            {BRAND}
          </Link>
          <SearchBar />
          <div className="nav-actions">
            <AccountMenu />
            <Link
              href="/panier"
              className="icon-btn"
              aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}
            >
              <Icon name="i-cart" />
              {count > 0 && <span className="cart-badge">{count}</span>}
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

        <nav className="wrap cat-nav" aria-label="Navigation principale">
          {desktopLinks.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

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
              fontFamily: "var(--font)",
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

      <div className="reassure">
        <span>
          <Icon name="i-shield" />
          Livraison rapide
        </span>
        <span>
          <Icon name="i-cash" />
          Paiement à la livraison
        </span>
      </div>
    </>
  );
}
