"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="wrap" id="newsletter" style={{ paddingBottom: "clamp(48px,7vw,86px)" }}>
      <div className="news">
        <span className="eyebrow">Newsletter</span>
        <h2 style={{ marginTop: 10 }}>Ne manque aucune nouveauté</h2>
        <p>
          Offres exclusives, nouveaux arrivages et conseils beauté, directement dans ta boîte mail.
        </p>
        {subscribed ? (
          <div className="news-thanks">
            <Icon name="i-heart" />
            Merci, à très vite.
          </div>
        ) : (
          <form
            className="news-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
          >
            <label
              htmlFor="news-email"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
              }}
            >
              Adresse e-mail
            </label>
            <input
              id="news-email"
              type="email"
              placeholder="Ton adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              S&apos;inscrire
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
