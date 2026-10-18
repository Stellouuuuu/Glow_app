"use client";

import { useRouter } from "next/navigation";

type Props = {
  // Destination si la page a été ouverte directement (pas d'historique).
  fallback?: string;
  className?: string;
};

export default function BackButton({ fallback = "/", className = "" }: Props) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) router.back();
    else router.push(fallback);
  }

  return (
    <button type="button" className={`back-btn ${className}`} onClick={goBack} aria-label="Retour">
      <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
        <path
          d="M19 12H6M11 6l-6 6 6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
