export function formatAmount(value: number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatPrice(value: number) {
  return `${formatAmount(value)} FCFA`;
}

// Illustration de secours quand le produit n'a pas encore de photo.
export function illustrationFor(categorySlug?: string | null) {
  const s = (categorySlug ?? "").toLowerCase();
  if (s.includes("soin")) return "ill-serum";
  if (s.includes("maquill")) return "ill-palette";
  if (s.includes("mode")) return "ill-dress";
  if (s.includes("mech") || s.includes("extension")) return "ill-hair";
  if (s.includes("parfum")) return "ill-perfume";
  return "ill-bouquet";
}

export function whatsappLink(text: string) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
