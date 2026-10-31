import Link from "next/link";
import Icon from "./Icon";

const columns = [
  {
    title: "Boutique",
    links: [
      { href: "/#categories", label: "Soins du visage" },
      { href: "/#categories", label: "Maquillage" },
      { href: "/#bestsellers", label: "Mode femme" },
      { href: "/#bestsellers", label: "Mèches & extensions" },
    ],
  },
  {
    title: "Aide",
    links: [
      { href: "/#top", label: "Livraison & retours" },
      { href: "/#top", label: "Suivre ma commande" },
      { href: "/#top", label: "Questions fréquentes" },
      { href: "/#footer", label: "Nous contacter" },
    ],
  },
  {
    title: "À propos",
    links: [
      { href: "/#top", label: "Notre histoire" },
      { href: "/#top", label: "Avis clients" },
      { href: "/#top", label: "Programme fidélité" },
      { href: "/#newsletter", label: "Newsletter" },
    ],
  },
];

// compact : sur mobile, ne garde que la marque et les réseaux (la barre du bas fait déjà la navigation).
export default function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={`site wrap${compact ? " foot-compact" : ""}`} id="footer">
      <div className="foot-grid">
        <div className="foot-brand">
          <Link href="/#top" className="brand">
            <Icon name="i-flower" />
            GLOW
          </Link>
          <p>
            Beauté, mode et mèches sélectionnées avec soin pour une routine qui te ressemble. Fait
            avec amour pour toutes les femmes qui veulent rayonner au quotidien.
          </p>
          <div className="foot-social">
            <Link href="/#top">Instagram</Link>
            <Link href="/#top">TikTok</Link>
            <Link href="/#top">WhatsApp</Link>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="foot-col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="foot-bottom">
        <span>© 2026 GLOW. Tous droits réservés.</span>
        <span>Paiement à la livraison · Mobile Money · Carte bancaire</span>
      </div>
    </footer>
  );
}
