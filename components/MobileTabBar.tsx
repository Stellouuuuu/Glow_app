"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { whatsappLink } from "@/lib/format";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
    <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" {...stroke} />
  </svg>
);
const GridIcon = () => (
  <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" {...stroke} />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" {...stroke} />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" {...stroke} />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" {...stroke} />
  </svg>
);

export default function MobileTabBar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onAccount = ["/compte", "/login", "/inscription"].includes(pathname);

  return (
    <nav className="tab-bar" aria-label="Navigation mobile">
      <Link href="/" className={onHome ? "active" : ""}>
        <HomeIcon />
        Accueil
      </Link>
      <Link href="/#categories">
        <GridIcon />
        Catégories
      </Link>
      <Link href="/#bestsellers">
        <Icon name="i-bag" />
        Boutique
      </Link>
      <a
        href={whatsappLink("Bonjour GLOW, j'ai une question.")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="i-headset" />
        Aide
      </a>
      <Link href="/compte" className={onAccount ? "active" : ""}>
        <Icon name="i-user" />
        Compte
      </Link>
    </nav>
  );
}
