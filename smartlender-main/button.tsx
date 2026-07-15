import { Check } from "lucide-react";

const plans = [
  { name: "Starter", tag: "Perfect for getting started", price: "Free", features: ["Up to 10 active loans","1 user account","Basic loan management","Client profiles","Email support"] },
  { name: "Professional", tag: "For growing lending businesses", price: "₹499", popular: true, features: ["Up to 100 active loans","5 user accounts","Advanced analytics","Priority support","Activity logging"] },
  { name: "Enterprise", tag: "For large operations", price: "₹1,499", features: ["Unlimited loans","Unlimited users","Custom integrations","Dedicated support"] },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-surface-muted py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">Simple Pricing</p>
          <h2 className="mt-4 text-4xl font-bold text-brand-deep sm:text-5xl">
            Plans That <span className="text-brand-accent">Scale With You</span>
          </h2>
          <p className="mt-4 text-lg text-ink-muted">Start free and upgrade as your business grows. All plans include a 1-month free trial.</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3 md:items-start">
          {plans.map((p) => {
            const popular = p.popular;
            return (
              <div key={p.name} className={`relative rounded-2xl p-8 ${popular ? "bg-brand-deep text-white shadow-[0_40px_80px_-30px_rgba(0,86,83,0.6)] md:-translate-y-4" : "bg-white text-brand-deep ring-1 ring-black/5"}`}>
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-accent px-4 py-1 text-xs font-semibold text-[color:var(--primary-foreground)]">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-2xl font-bold ${popular ? "text-white" : "text-brand-deep"}`}>{p.name}</h3>
                <p className={`mt-1 text-sm ${popular ? "text-white/70" : "text-ink-muted"}`}>{p.tag}</p>
                <div className="mt-8 flex items-baseline gap-1">
                  <span className={`text-5xl font-bold ${popular ? "text-white" : "text-brand-deep"}`}>{p.price}</span>
                  <span className={`text-sm ${popular ? "text-white/70" : "text-ink-muted"}`}>/month</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${popular ? "bg-brand-accent text-brand-deep" : "bg-[oklch(0.9_0.09_160)] text-brand-deep"}`}>
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className={popular ? "text-white/90" : "text-brand-deep"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#apply"
                  className={`mt-10 block rounded-xl px-4 py-3 text-center text-sm font-semibold ${
                    popular
                      ? "bg-brand-accent text-[color:var(--primary-foreground)] hover:bg-brand-accent-hover"
                      : "bg-brand-deep text-white hover:opacity-90"
                  }`}
                >
                  Get Started
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
