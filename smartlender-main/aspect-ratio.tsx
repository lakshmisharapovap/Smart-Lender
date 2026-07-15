import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#top" aria-label="SmartLender home"><Logo /></a>
        <nav className="hidden items-center gap-12 text-sm font-medium text-white/90 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
          <a href="#apply" className="hover:text-white">Apply</a>
        </nav>
        <a
          href="#apply"
          className="rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[0_10px_25px_-10px_color-mix(in_oklab,var(--brand-accent)_70%,transparent)] transition-colors hover:bg-brand-accent-hover"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}
