"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { safeNext } from "@/lib/auth";
import BackButton from "@/components/BackButton";
import Icon from "@/components/Icon";
import Sprite from "@/components/Sprite";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    params.get("error") === "acces-refuse"
      ? "Ce compte n'a pas accès à l'espace admin."
      : ""
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      setError(
        error?.code === "email_not_confirmed"
          ? "Ton e-mail n'est pas encore confirmé. Clique sur le lien reçu par e-mail (pense à regarder les spams)."
          : "E-mail ou mot de passe incorrect."
      );
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();
    const isAdmin = profile?.role === "admin";

    // Admin : /admin par défaut. Cliente : jamais /admin, retour à la page demandée ou /compte.
    const next = safeNext(params.get("next"));
    const dest = isAdmin
      ? next ?? "/admin"
      : next && !next.startsWith("/admin")
        ? next
        : "/compte";

    router.replace(dest);
    router.refresh();
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <label htmlFor="email">Adresse e-mail</label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Mot de passe</label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && (
        <p className="login-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="glow-root login-page">
      <Sprite />
      <BackButton fallback="/" className="back-btn-corner" />
      <div className="login-card card-shadow">
        <Link href="/" className="brand">
          <Icon name="i-flower" />
          GLOW
        </Link>
        <span className="eyebrow" style={{ marginTop: 22, display: "block" }}>
          Mon compte
        </span>
        <h1>Connexion</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
        <p className="login-alt">
          Pas encore de compte ? <Link href="/inscription">Créer mon compte</Link>
        </p>
      </div>
    </div>
  );
}
