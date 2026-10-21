"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Icon from "./Icon";

const DISMISS_KEY = "glow-signup-banner-dismissed";

// Bandeau d'invitation à créer un compte, affiché aux visiteuses non connectées.
export default function SignupBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) return;
    } catch {}
    createClient()
      .auth.getUser()
      .then(({ data }) => setVisible(!data.user));
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  }

  if (!visible) return null;

  return (
    <div className="signup-bar" role="region" aria-label="Créer un compte">
      <span>Crée ton compte et commande plus vite !</span>
      <Link href="/inscription" className="btn btn-primary">
        Créer mon compte
      </Link>
      <button type="button" className="signup-bar-close" onClick={dismiss} aria-label="Fermer">
        <Icon name="i-close" />
      </button>
    </div>
  );
}
