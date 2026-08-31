type Props = { size?: number; theme?: "dark" | "light" };

export function Logo({ size = 24, theme = "dark" }: Props) {
  const dot = Math.round(size * 0.2);
  return (
    <span
      aria-label="SpectersAI"
      role="img"
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        gap: size * 0.13,
        fontSize: size,
        fontFamily: "var(--font-archivo)",
        fontWeight: 500,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        color: theme === "dark" ? "#ffffff" : "#201e1d",
      }}
    >
      <span>
        Specters<span style={{ color: theme === "dark" ? "#6f6866" : "#8a8281" }}>ai</span>
      </span>
      <span style={{ width: dot, height: dot, background: "#ec3013", marginBottom: size * 0.09 }} />
    </span>
  );
}
