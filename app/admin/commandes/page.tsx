import OrdersTable from "@/components/admin/OrdersTable";
import { createClient } from "@/lib/supabase/server";
import { ORDER_SELECT, type Order } from "@/lib/types";

export const metadata = { title: "Commandes - Admin GLOW" };

export default async function AdminOrdersPage() {
  const { data, error } = await createClient()
    .from("orders")
    .select(ORDER_SELECT)
    .order("created_at", { ascending: false });

  if (error) console.error("[admin/commandes]", error.message);

  return <OrdersTable orders={(data ?? []) as unknown as Order[]} loadError={error?.message} />;
}
