import { Check } from "lucide-react";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[oklch(0.9_0.09_160)] text-brand-deep">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className="text-brand-deep">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">{children}</p>;
}

function LoanCard() {
  return (
    <div className="rounded-2xl bg-brand-deep p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]">
      <div className="rounded-xl bg-white p-6">
        <div className="flex items-start justify-between">
          <h4 className="text-lg font-bold text-brand-deep">New Loan</h4>
          <span className="rounded-full bg-[oklch(0.9_0.09_160)] px-3 py-1 text-xs font-semibold text-brand-deep">Active</span>
        </div>
        <div className="mt-6">
          <p className="text-xs text-ink-muted">Loan Amount</p>
          <p className="text-3xl font-bold text-brand-deep">₹15,000</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 border-b border-border pb-6">
          <div><p className="text-xs text-ink-muted">Interest Rate</p><p className="text-xl font-bold text-brand-deep">12%</p></div>
          <div><p className="text-xs text-ink-muted">Term</p><p className="text-xl font-bold text-brand-deep">6 months</p></div>
        </div>
        <p className="mt-6 text-xs text-ink-muted">Repayment Schedule</p>
        <div className="mt-3 space-y-2 text-sm">
          {["Month 1", "Month 2", "Month 3"].map((m) => (
            <div key={m} className="flex justify-between text-brand-deep"><span>{m}</span><span className="font-semibold">₹2,800</span></div>
          ))}
          <p className="text-center text-xs text-ink-muted">... 3 more payments</p>
        </div>
      </div>
    </div>
  );
}

function ClientCard() {
  return (
    <div className="rounded-2xl bg-surface-muted p-8">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-deep text-sm font-bold text-white">AS</div>
            <div>
              <p className="font-semibold text-brand-deep">Arjun Sharma</p>
              <p className="text-xs text-ink-muted">ID: ABCDE1234F</p>
            </div>
          </div>
          <span className="rounded-full bg-[oklch(0.9_0.09_160)] px-3 py-1 text-xs font-semibold text-brand-deep">Excellent Payer</span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div><p className="text-xs text-ink-muted">Total Loans</p><p className="text-2xl font-bold text-brand-deep">5</p></div>
          <div><p className="text-xs text-ink-muted">Current Balance</p><p className="text-2xl font-bold text-brand-deep">₹8,500</p></div>
        </div>
        <div className="mt-6 rounded-lg bg-surface-muted p-4">
          <div className="flex justify-between text-sm"><span className="text-brand-deep">Payment History</span><span className="font-semibold text-brand-accent">98% on time</span></div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full w-[98%] rounded-full bg-brand-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard() {
  const rows = [
    { m: "Jan", a: 60 }, { m: "Feb", a: 70 }, { m: "Mar", a: 75 },
    { m: "Apr", a: 82 }, { m: "May", a: 78 }, { m: "Jun", a: 88 },
  ];
  return (
    <div className="rounded-2xl bg-brand-deep p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]">
      <div className="rounded-xl bg-white p-6">
        <h4 className="text-lg font-bold text-brand-deep">Monthly Performance</h4>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-[oklch(0.94_0.05_160)] p-4 text-center">
            <p className="text-2xl font-bold text-brand-deep">₹1,25,000</p>
            <p className="text-xs text-ink-muted">Disbursed</p>
          </div>
          <div className="rounded-lg bg-surface-muted p-4 text-center">
            <p className="text-2xl font-bold text-brand-deep">₹98,000</p>
            <p className="text-xs text-ink-muted">Collected</p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          {rows.map((r) => (
            <div key={r.m} className="flex items-center gap-3">
              <span className="w-8 text-xs text-ink-muted">{r.m}</span>
              <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-surface-muted">
                <div className="h-full rounded-full bg-brand-accent" style={{ width: `${r.a}%` }} />
                <div className="absolute inset-y-0 left-0 rounded-full bg-brand-deep" style={{ width: `${r.a * 0.65}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-6 text-xs text-ink-muted">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-accent" />Disbursed</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-deep" />Collected</span>
        </div>
      </div>
    </div>
  );
}

export function DetailSections() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl space-y-28 px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>Core Loan Management</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold text-brand-deep">Streamline Your Entire Loan Lifecycle</h2>
            <p className="mt-5 text-ink-muted">From creating new loans to tracking payments and managing defaults, SmartLender handles it all with precision.</p>
            <Bullets items={["Automatic repayment schedule generation","Late fee and penalty calculation","Partial payment tracking with notes","Overdue loan monitoring","Write-off management"]} />
          </div>
          <LoanCard />
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <ClientCard />
          <div>
            <Eyebrow>Client Management</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold text-brand-deep">Know Your Clients Inside and Out</h2>
            <p className="mt-5 text-ink-muted">Build comprehensive client profiles and track their payment behavior to make better lending decisions.</p>
            <Bullets items={["Detailed contact and ID information","Complete loan history tracking","Payment behavior analysis","Risk classification system","Physical address management"]} />
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>Analytics &amp; Reporting</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold text-brand-deep">Data-Driven Decisions at Your Fingertips</h2>
            <p className="mt-5 text-ink-muted">Understand your business with comprehensive dashboards and reports that give you real-time insights.</p>
            <Bullets items={["Total capital and disbursement tracking","Monthly profit calculations","Repayment rate analytics","Disbursements vs collections charts","Portfolio performance over time"]} />
          </div>
          <AnalyticsCard />
        </div>
      </div>
    </section>
  );
}
