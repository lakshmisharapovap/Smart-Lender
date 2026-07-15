export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand-accent" fill="currentColor">
          <path d="M12 3l10 17H2L12 3z" />
        </svg>
      </div>
      <span className={`text-xl font-semibold tracking-tight ${dark ? "text-white" : "text-white"}`}>
        smartlender
      </span>
    </div>
  );
}
