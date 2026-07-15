export function CTA() {
  return (
    <section className="bg-brand-deep py-24 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-bold sm:text-5xl">
          Ready to Transform Your <span className="text-brand-accent">Lending Business?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
          Join hundreds of microlenders across India who are already using SmartLender to grow their business.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#apply" className="rounded-xl bg-brand-accent px-8 py-4 text-base font-semibold text-[color:var(--primary-foreground)] shadow-[0_25px_60px_-15px_color-mix(in_oklab,var(--brand-accent)_80%,transparent)] hover:bg-brand-accent-hover">
            Start Free Trial
          </a>
          <a href="#apply" className="rounded-xl border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10">
            Schedule a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
