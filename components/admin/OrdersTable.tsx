"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/format";
import { formatDate } from "@/lib/format-date";
import { ORDER_STATUSES, type Order } from "@/lib/types";

export default function OrdersTable({ orders, loadError }: { orders: Order[]; loadError?: string }) {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("all");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const visible = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const count = (status: string) => orders.filter((o) => o.status === status).length;

  async function changeStatus(order: Order, status: string) {
    setError("");
    setBusyId(order.id);
    const { error } = await createClient().from("orders").update({ status }).eq("id", order.id);
    setBusyId(null);
    if (error) return setError(`Changement de statut impossible : ${error.message}`);
    router.refresh();
  }

  return (
    <>
      <div className="admin-head">
        <h1 className="admin-title">Commandes</h1>
      </div>

      <div className="admin-filters" role="tablist">
        <button type="button" className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
          Toutes ({orders.length})
        </button>
        {ORDER_STATUSES.map((s) => (
          <button
            key={s.value}
            type="button"
            className={filter === s.value ? "active" : ""}
            onClick={() => setFilter(s.value)}
          >
            {s.label} ({count(s.value)})
          </button>
        ))}
      </div>

      {loadError && (
        <p className="login-error" role="alert">
          Impossible de charger les commandes : {loadError}
        </p>
      )}
      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Cliente</th>
              <th>Produit</th>
              <th>Qté</th>
              <th>Total</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((o) => {
              const digits = o.customer_phone.replace(/\D/g, "");
              return (
                <tr key={o.id} className={o.status === "annulee" ? "is-off" : ""}>
                  <td>{formatDate(o.created_at)}</td>
                  <td>
                    <strong>{o.customer_name}</strong>
                    <span className="admin-sub">
                      {digits.length >= 8 ? (
                        <a href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer" className="admin-link" style={{ margin: 0 }}>
                          {o.customer_phone}
                        </a>
                      ) : (
                        o.customer_phone
                      )}
                    </span>
                  </td>
                  <td>{o.products?.name ?? "Produit supprimé"}</td>
                  <td>{o.quantity}</td>
                  <td>{formatPrice(o.total_price)}</td>
                  <td>
                    <select
                      className={`admin-status s-${o.status}`}
                      value={o.status}
                      disabled={busyId === o.id}
                      onChange={(e) => changeStatus(o, e.target.value)}
                      aria-label={`Statut de la commande de ${o.customer_name}`}
                    >
                      {!ORDER_STATUSES.some((s) => s.value === o.status) && (
                        <option value={o.status}>{o.status}</option>
                      )}
                      {ORDER_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "var(--ink-soft)", padding: 32 }}>
                  Aucune commande.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
