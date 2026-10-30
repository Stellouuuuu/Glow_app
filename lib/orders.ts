import { createClient } from "@/lib/supabase/client";

export type OrderLine = { product_id: string; quantity: number; total_price: number };

// Trace discrète des commandes WhatsApp (une ligne par produit), sans bloquer l'ouverture de WhatsApp.
// Si la cliente est connectée, les commandes sont rattachées à son compte.
export async function logOrders(lines: OrderLine[]) {
  if (!lines.length) return;
  const supabase = createClient();
  const base = {
    customer_name: "Client WhatsApp",
    customer_phone: "inconnu",
    status: "en_attente",
    source: "whatsapp",
  };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    await supabase.from("orders").insert(lines.map((l) => ({ ...base, ...l })));
    return;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user.id)
    .maybeSingle();
  const who = {
    ...base,
    customer_name: profile?.full_name || base.customer_name,
    customer_phone: profile?.phone || base.customer_phone,
  };
  const { error } = await supabase.from("orders").insert(lines.map((l) => ({ ...who, ...l, user_id: user.id })));
  // Colonne user_id absente ou refusée : on enregistre quand même les commandes.
  if (error) await supabase.from("orders").insert(lines.map((l) => ({ ...who, ...l })));
}
