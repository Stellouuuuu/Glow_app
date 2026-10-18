import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { formatDate } from "@/lib/format-date";
import { createClient } from "@/lib/supabase/server";
import { LOW_STOCK } from "@/lib/types";

export const metadata = { title: "Dashboard - Admin GLOW" };

// Début du mois courant à Cotonou (UTC+1, sans heure d'été), exprimé en UTC.
function startOfMonthIso() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Porto-Novo", year: "numeric", month: "2-digit" })
    .formatToParts(new Date());
  const year = Number(parts.find((p) => p.type === "year")!.value);
  const month = Number(parts.find((p) => p.type === "month")!.value);
  return new Date(Date.UTC(year, month - 1, 1) - 60 * 60 * 1000).toISOString();
}

export default async function AdminDashboard() {
  const supabase = createClient();

  const [pending, sales, lowStock, recent] = await Promise.all([
    supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "en_attente"),
    supabase.from("orders").select("total_price").eq("status", "livree").gte("created_at", startOfMonthIso()),
    supabase
      .from("products")
      .select("id, name, stock")
      .eq("is_active", true)
      .lte("stock", LOW_STOCK)
      .order("stock", { ascending: true }),
    supabase
      .from("orders")
      .select("id, customer_name, total_price, created_at, products(name)")
      .eq("status", "en_attente")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const errors = [pending.error, sales.error, lowStock.error, recent.error].filter(Boolean);
  const monthTotal = (sales.data ?? []).reduce((sum, o) => sum + o.total_price, 0);
  const low = lowStock.data ?? [];
  const recentOrders = (recent.data ?? []) as unknown as {
    id: string;
    customer_name: string;
    total_price: number;
    created_at: string;
    products: { name: string } | null;
  }[];

  return (
    <>
      <h1 className="admin-title">Dashboard</h1>

      {errors.length > 0 && (
        <p className="login-error" role="alert">
          Certaines données n&apos;ont pas pu être chargées : {errors[0]!.message}
        </p>
      )}

      <div className="stat-grid">
        <Link href="/admin/commandes" className="stat-card">
          <span className="stat-label">Commandes en attente</span>
          <span className="stat-value">{pending.count ?? 0}</span>
        </Link>
        <Link href="/admin/produits" className="stat-card">
          <span className="stat-label">Produits en stock faible (≤ {LOW_STOCK})</span>
          <span className="stat-value">{low.length}</span>
        </Link>
        <div className="stat-card">
          <span className="stat-label">Ventes du mois (livrées)</span>
          <span className="stat-value">{formatPrice(monthTotal)}</span>
        </div>
      </div>

      <div className="dash-cols">
        <section className="dash-panel">
          <h2>Stock faible</h2>
          {low.length === 0 ? (
            <p className="dash-empty">Tout est bien approvisionné.</p>
          ) : (
            <ul>
              {low.map((p) => (
                <li key={p.id}>
                  <span>{p.name}</span>
                  <span className={`admin-stock ${p.stock <= 0 ? "out" : "low"}`}>
                    {p.stock <= 0 ? "Rupture" : `${p.stock} restant${p.stock > 1 ? "s" : ""}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="dash-panel">
          <h2>Dernières commandes en attente</h2>
          {recentOrders.length === 0 ? (
            <p className="dash-empty">Aucune commande en attente.</p>
          ) : (
            <ul>
              {recentOrders.map((o) => (
                <li key={o.id}>
                  <span>
                    <strong>{o.customer_name}</strong>
                    <span className="admin-sub">
                      {o.products?.name ?? "Produit supprimé"} · {formatDate(o.created_at)}
                    </span>
                  </span>
                  <span>{formatPrice(o.total_price)}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/admin/commandes" className="admin-link" style={{ marginLeft: 0, display: "inline-block", marginTop: 12 }}>
            Voir toutes les commandes
          </Link>
        </section>
      </div>
    </>
  );
}
