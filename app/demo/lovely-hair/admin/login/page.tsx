import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-2xl border p-8"
        style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--acc)" }} />
          <span className="text-[11px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Specters × Lovely Hair
          </span>
        </div>
        <h1 className="font-display text-2xl mb-6">Panel de administración</h1>
        <LoginForm />
      </div>
    </div>
  );
}
