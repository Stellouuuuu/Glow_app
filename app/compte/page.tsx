import Link from "next/link";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileTabBar from "@/components/MobileTabBar";
import Sprite from "@/components/Sprite";
import { formatPrice } from "@/lib/format";
import { formatDate } from "@/lib/format-date";
import { createClient } from "@/lib/supabase/server";
import { ORDER_STATUSES } from "@/lib/types";

export const metadata = { title: "Mon compte - GLOW" };

type MyOrder = {
  id: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
  products: { name: string } | null;
};

export default async function AccountPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/compte");

  const [{ data: profile }, { data: orders, error }] = await Promise.all([
    supabase.from("profiles").select("full_name, phone, role").eq("id", user.id).maybeSingle(),
    supabase
      .from("orders")
      .select("id, quantity, total_price, status, created_at, products(name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);
  if (error) console.error("[compte] commandes :", error.message);

  async function signOut() {
    "use server";
    await createClient().auth.signOut();
    redirect("/");
  }

  const myOrders = (orders ?? []) as unknown as MyOrder[];
  const statusLabel = (s: string) => ORDER_STATUSES.find((x) => x.value === s)?.label ?? s;

  return (
    <div className="glow-root" id="top">
      <Sprite />
      <Header />
      <div className="wrap back-row">
        <BackButton fallback="/" />
      </div>
      <main className="sec wrap account">
        <span className="eyebrow">Mon compte</span>
        <h1 className="account-title">Bonjour {profile?.full_name || "toi"}</h1>

        <div className="account-card">
          <dl>
            <div>
              <dt>E-mail</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Téléphone</dt>
              <dd>{profile?.phone || "-"}</dd>
            </div>
          </dl>
          <div className="account-actions">
            {profile?.role === "admin" && (
              <Link href="/admin" className="btn btn-primary admin-btn-sm">
                Espace admin
              </Link>
            )}
            <form action={signOut}>
              <button type="submit" className="btn btn-outline admin-btn-sm">
                Se déconnecter
              </button>
            </form>
          </div>
        </div>

        <h2 className="account-sub">Mes commandes</h2>
        {myOrders.length === 0 ? (
          <p style={{ color: "var(--ink-soft)", fontSize: 14.5 }}>
            Tu n&apos;as pas encore passé de commande. <Link href="/#bestsellers" style={{ color: "var(--rose)", fontWeight: 600 }}>Découvrir la boutique</Link>
          </p>
        ) : (
          <ul className="account-orders">
            {myOrders.map((o) => (
              <li key={o.id}>
                <span>
                  <strong>{o.products?.name ?? "Produit"}</strong>
                  <span className="admin-sub">
                    {formatDate(o.created_at)} · Qté {o.quantity}
                  </span>
                </span>
                <span style={{ textAlign: "right" }}>
                  {formatPrice(o.total_price)}
                  <span className={`admin-status s-${o.status} account-status`}>{statusLabel(o.status)}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer compact />
      <MobileTabBar />
    </div>
  );
}
