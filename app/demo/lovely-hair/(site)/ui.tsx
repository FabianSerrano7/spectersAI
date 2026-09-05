export function formatCLP(value: number) {
  return "$" + Math.round(value).toLocaleString("es-CL");
}

export function StarRating({ rating, count }: { rating: number; count?: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5 text-[13px]">
      <span className="text-[var(--lh-accent)]" aria-hidden>
        {"★".repeat(full)}
        <span className="text-[var(--lh-ink)]/20">{"★".repeat(5 - full)}</span>
      </span>
      <span className="text-[var(--lh-ink-soft)]">
        {rating.toFixed(1)}
        {count ? ` · ${count} reseñas` : ""}
      </span>
    </div>
  );
}
