"use client";

import Icon from "./Icon";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, whatsappLink } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function OrderButtons({ product }: { product: Product }) {
  const outOfStock = product.stock <= 0;

  if (outOfStock) {
    const href = whatsappLink(
      `Bonjour GLOW, "${product.name}" est en rupture de stock. Pouvez-vous me prévenir à son retour ?`
    );
    return (
      <div className="pd-actions">
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          Rupture de stock, me prévenir au retour
        </a>
      </div>
    );
  }

  const href = whatsappLink(
    `Bonjour GLOW, je souhaite commander : ${product.name} (${formatPrice(product.price)}).`
  );

  // Trace discrète de la commande, sans bloquer l'ouverture de WhatsApp.
  // Si la cliente est connectée, la commande est rattachée à son compte.
  async function logOrder() {
    const supabase = createClient();
    const order = {
      customer_name: "Client WhatsApp",
      customer_phone: "inconnu",
      product_id: product.id,
      quantity: 1,
      total_price: product.price,
      status: "en_attente",
      source: "whatsapp",
    };

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      await supabase.from("orders").insert(order);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("id", user.id)
      .maybeSingle();
    const { error } = await supabase.from("orders").insert({
      ...order,
      customer_name: profile?.full_name || order.customer_name,
      customer_phone: profile?.phone || order.customer_phone,
      user_id: user.id,
    });
    // Colonne user_id absente ou refusée : on enregistre quand même la commande.
    if (error) {
      await supabase.from("orders").insert({
        ...order,
        customer_name: profile?.full_name || order.customer_name,
        customer_phone: profile?.phone || order.customer_phone,
      });
    }
  }

  return (
    <div className="pd-actions">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
        onClick={logOrder}
      >
        Commander maintenant <Icon name="i-arrow" />
      </a>
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-outline" onClick={logOrder}>
        Discuter sur WhatsApp
      </a>
    </div>
  );
}
