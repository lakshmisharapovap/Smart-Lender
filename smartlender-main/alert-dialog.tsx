import { IndianRupee, Users, Search, TrendingUp, Bell, ShieldCheck } from "lucide-react";

const items = [
  { icon: IndianRupee, title: "Loan Management", desc: "Record new loans with custom interest rates and repayment schedules. Automatic schedule generation, late fees, and partial payment tracking." },
  { icon: Users, title: "Client Management", desc: "Maintain detailed client profiles with contact info, ID numbers, and addresses. Track payment behavior and flag high-risk clients." },
  { icon: Search, title: "Smart Search & Filtering", desc: "Quickly find clients or loans. Filter by status (active, overdue, paid off) and sort by amount owed or payment behavior." },
  { icon: TrendingUp, title: "Analytics Dashboard", desc: "Track repayment rates, view disbursements vs collections charts, and monitor your portfolio's performance over time." },
  { icon: Bell, title: "Automated Communications", desc: "Send SMS payment reminders and automated overdue notifications to keep your clients informed and payments on track." },
  { icon: ShieldCheck, title: "User Management & Security", desc: "Multiple user accounts with Admin and Loan Officer roles. Complete activity logging to track all changes." },
];

export function Features() {
  return (
    <section id="features" className="bg-surface-muted py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">Powerful Features</p>
          <h2 className="mt-4 text-4xl font-bold text-brand-deep sm:text-5xl">
            Everything You Need to <span className="text-brand-accent">Manage Loans</span>
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            The all-in-one platform helping Indian microlenders spend less time on admin and more time growing.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div key={f.title} className="rounded-2xl bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-[oklch(0.94_0.05_160)] text-brand-deep">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-deep">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
