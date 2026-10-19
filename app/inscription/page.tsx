"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { normalizePhone } from "@/lib/auth";
import BackButton from "@/components/BackButton";
import Icon from "@/components/Icon";
import Sprite from "@/components/Sprite";

const perks = [
  "Commande plus vite : tes informations sont déjà remplies",
  "Retrouve l'historique de tes commandes",
  "Sois prévenue des nouveautés et des offres",
];

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const cleanPhone = normalizePhone(phone);
    if (cleanPhone.replace(/\D/g, "").length < 8) return setError("Indique un numéro de téléphone valide.");
    if (password.length < 8) return setError("Le mot de passe doit contenir au moins 8 caractères.");

    setLoading(true);
    const { data, error } = await createClient().auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim(), phone: cleanPhone },
        emailRedirectTo: `${window.location.origin}/compte`,
      },
    });
    setLoading(false);

    if (error) {
      setError(
        error.message.toLowerCase().includes("already")
          ? "Un compte existe déjà avec cet e-mail."
          : error.message
      );
      return;
    }

    // Session ouverte directement si la confirmation par e-mail est désactivée.
    if (data.session) {
      router.replace("/compte");
      router.refresh();
    } else {
      setNeedsConfirmation(true);
    }
  }

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
          Nouvelle cliente
        </span>
        <h1>Créer mon compte</h1>

        {needsConfirmation ? (
          <div className="signup-done" role="status">
            <Icon name="i-heart" />
            <p>
              Merci ! Un e-mail de confirmation vient d&apos;être envoyé à <strong>{email}</strong>. Clique sur le
              lien qu&apos;il contient pour activer ton compte.
            </p>
            <Link href="/login" className="btn btn-outline">
              Aller à la connexion
            </Link>
          </div>
        ) : (
          <>
            <ul className="perk-list">
              {perks.map((p) => (
                <li key={p}>
                  <Icon name="i-sparkle" />
                  {p}
                </li>
              ))}
            </ul>
            <form className="login-form" onSubmit={onSubmit}>
              <label htmlFor="full_name">Nom complet</label>
              <input
                id="full_name"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label htmlFor="phone">Téléphone (WhatsApp)</label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+229 ..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label htmlFor="email">Adresse e-mail</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">Mot de passe (8 caractères minimum)</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
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
                {loading ? "Création..." : "Créer mon compte"}
              </button>
            </form>
            <p className="login-alt">
              Déjà un compte ? <Link href="/login">Se connecter</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
