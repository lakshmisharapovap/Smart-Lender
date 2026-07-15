import { BackgroundChart } from "./BackgroundChart";
import { DashboardMock } from "./DashboardMock";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-deep pb-24 pt-36 text-white">
      <BackgroundChart />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">
          Loan Management Made Simple
        </p>
        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
          Never Lose Track of<br />
          a{" "}
          <span className="underline-squiggle">
            Loan
            <svg className="underline-squiggle-mark" viewBox="0 0 120 12" preserveAspectRatio="none" fill="none">
              <path d="M2 8 C 20 2, 40 10, 60 6 S 100 2, 118 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>{" "}
          Again
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          Manage loans, track payments, and grow your business with our
          powerful loan management platform.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href="#apply"
            className="rounded-2xl bg-brand-accent px-10 py-4 text-lg font-semibold text-[color:var(--primary-foreground)] shadow-[0_25px_60px_-15px_color-mix(in_oklab,var(--brand-accent)_80%,transparent)] transition-transform hover:scale-[1.02]"
          >
            Get Started Free
          </a>
          <span className="text-sm text-white/70">1 month free trial</span>
        </div>
        <div className="mt-16">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
