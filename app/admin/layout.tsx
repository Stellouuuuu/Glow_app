import BackButton from "@/components/BackButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/produits", label: "Produits" },
  { href: "/admin/commandes", label: "Commandes" },
  { href: "/admin/clientes", label: "Clientes" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  async function signOut() {
    "use server";
    await createClient().auth.signOut();
    redirect("/login");
  }

  return (
    <div className="glow-root admin">
      <header className="admin-bar">
        <div className="wrap admin-bar-row">
          <Link href="/" className="brand">GLOW <span className="admin-tag">admin</span></Link>
          <nav className="admin-nav">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>
          <form action={signOut}>
            <button type="submit" className="btn btn-outline admin-btn-sm">Déconnexion</button>
          </form>
        </div>
      </header>
      <main className="wrap admin-main">
        <BackButton fallback="/admin" className="admin-back" />
        {children}
      </main>
    </div>
  );
}
