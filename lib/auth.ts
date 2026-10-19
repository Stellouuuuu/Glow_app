// Redirection interne uniquement (évite les liens ouvrant un autre site).
export function safeNext(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : null;
}

export function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}
