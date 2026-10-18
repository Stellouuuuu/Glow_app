import { formatDate } from "@/lib/format-date";
import { createClient } from "@/lib/supabase/server";
import type { Client } from "@/lib/types";

export const metadata = { title: "Clientes - Admin GLOW" };

export default async function AdminClientsPage() {
  const { data, error } = await createClient()
    .from("profiles")
    .select("id, full_name, phone, created_at")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  if (error) console.error("[admin/clientes]", error.message);
  const clients = (data ?? []) as Client[];

  return (
    <>
      <div className="admin-head">
        <h1 className="admin-title">Clientes</h1>
        <span className="admin-sub" style={{ margin: 0 }}>
          {clients.length} inscrite{clients.length > 1 ? "s" : ""}
        </span>
      </div>

      {error && (
        <p className="login-error" role="alert">
          Impossible de charger les clientes : {error.message}
        </p>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Inscrite le</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>
                  <strong>{c.full_name || "Sans nom"}</strong>
                </td>
                <td>{c.phone || "-"}</td>
                <td>{formatDate(c.created_at)}</td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", color: "var(--ink-soft)", padding: 32 }}>
                  Aucune cliente inscrite pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
