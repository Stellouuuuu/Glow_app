"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import Icon from "./Icon";

// Icône "compte" du header : menu Se connecter / Créer un compte, ou accès à Mon compte.
export default function AccountMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function signOut() {
    await createClient().auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  const name = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0];

  return (
    <div className="account-menu" ref={ref}>
      <button
        type="button"
        className="icon-btn"
        aria-label="Mon compte"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Icon name="i-user" />
        {user && <span className="account-dot" aria-hidden="true" />}
      </button>

      {open && (
        <div className="account-pop card-shadow" role="menu">
          {user ? (
            <>
              <p className="account-pop-title">Bonjour{name ? ` ${name}` : ""}</p>
              <Link href="/compte" className="btn btn-primary" onClick={() => setOpen(false)}>
                Mon compte
              </Link>
              <button type="button" className="account-pop-link" onClick={signOut}>
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <p className="account-pop-title">Bienvenue chez GLOW</p>
              <p className="account-pop-text">Crée ton compte pour commander plus vite et suivre tes commandes.</p>
              <Link href="/inscription" className="btn btn-primary" onClick={() => setOpen(false)}>
                Créer mon compte
              </Link>
              <Link href="/login" className="btn btn-outline" onClick={() => setOpen(false)}>
                Se connecter
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
