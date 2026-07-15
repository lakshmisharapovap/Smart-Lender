import { LayoutGrid, FileText, CreditCard, BarChart3, AlertOctagon, CheckCircle2, IndianRupee, AlertTriangle, ChevronDown } from "lucide-react";

function Stat({
  icon: Icon,
  label,
  value,
  tone = "muted",
}: {
  icon: typeof LayoutGrid;
  label: string;
  value: string;
  tone?: "muted" | "green" | "amber";
}) {
  const toneMap = {
    muted: "bg-[oklch(0.94_0.02_180)] text-brand-deep",
    green: "bg-[oklch(0.9_0.08_160)] text-brand-deep",
    amber: "bg-[oklch(0.92_0.08_60)] text-[oklch(0.4_0.15_60)]",
  }[tone];
  return (
    <div className="rounded-xl bg-[oklch(0.975_0.005_180)] p-5">
      <div className="mb-6 flex items-center gap-3">
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${toneMap}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-sm text-ink-muted">{label}</span>
      </div>
      <div className="text-2xl font-bold text-brand-deep sm:text-3xl">{value}</div>
    </div>
  );
}

function DonutChart() {
  // Donut using conic-gradient. Segments: Active 60%, Overdue 12%, Completed 23%, Defaulted 5%
  const deep = "var(--brand-deep)";
  const accent = "var(--brand-accent)";
  const light = "oklch(0.88 0.12 160)";
  const muted = "oklch(0.92 0.01 200)";
  const bg = `conic-gradient(${deep} 0 60%, ${accent} 60% 72%, ${light} 72% 95%, ${muted} 95% 100%)`;
  return (
    <div className="relative grid h-40 w-40 place-items-center rounded-full" style={{ background: bg }}>
      <div className="grid h-24 w-24 place-items-center rounded-full bg-white">
        <span className="text-2xl font-bold text-brand-deep">529</span>
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-ink-muted">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </div>
  );
}

function PurposeBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[90px_1fr] items-center gap-3">
      <span className="text-sm text-ink-muted">{label}</span>
      <div className="h-3 rounded-full bg-[oklch(0.92_0.01_200)]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: "linear-gradient(90deg, var(--brand-deep), var(--brand-accent))",
          }}
        />
      </div>
    </div>
  );
}

export function DashboardMock() {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-4 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)] sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-deep">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-accent" fill="currentColor"><path d="M12 3l10 17H2L12 3z" /></svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-brand-deep">smartlender</span>
            <span className="text-sm font-medium text-brand-accent">Dashboard</span>
          </div>
        </div>
        <button className="hidden items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-brand-deep hover:bg-surface-muted sm:flex">
          <ChevronDown className="h-4 w-4" />
          Kumar Loans &amp; Financial Services
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="space-y-2">
          <button className="w-full rounded-xl bg-brand-accent px-4 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[0_10px_20px_-10px_color-mix(in_oklab,var(--brand-accent)_70%,transparent)]">
            + Record new loan
          </button>
          <nav className="rounded-xl bg-[oklch(0.975_0.005_180)] p-2">
            {[
              { icon: LayoutGrid, label: "Overview", active: true },
              { icon: FileText, label: "Loans" },
              { icon: CreditCard, label: "Payments" },
              { icon: BarChart3, label: "Analytics" },
            ].map((i) => (
              <a
                key={i.label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  i.active ? "bg-white text-brand-accent shadow-sm" : "text-ink-muted hover:text-brand-deep"
                }`}
              >
                <i.icon className="h-4 w-4" />
                {i.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-brand-deep">Overview</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat icon={LayoutGrid} label="Active Loans" value="328" tone="green" />
            <Stat icon={AlertOctagon} label="Overdue Loans" value="23" tone="amber" />
            <Stat icon={CheckCircle2} label="Collection Rate" value="94.5%" tone="green" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Stat icon={IndianRupee} label="Total Outstanding" value="₹3,50,000" />
            <Stat icon={AlertTriangle} label="Total Overdue" value="₹34,500" tone="amber" />
          </div>

          <div className="grid gap-6 pt-2 sm:grid-cols-2">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-brand-deep">Portfolio Distribution</h4>
              <div className="rounded-xl bg-[oklch(0.975_0.005_180)] p-5">
                <div className="flex items-center gap-5">
                  <DonutChart />
                  <div className="space-y-2">
                    <LegendDot color="var(--brand-deep)" label="Active" />
                    <LegendDot color="var(--brand-accent)" label="Overdue" />
                    <LegendDot color="oklch(0.88 0.12 160)" label="Completed" />
                    <LegendDot color="oklch(0.92 0.01 200)" label="Defaulted" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-brand-deep">Loans by Purpose</h4>
              <div className="rounded-xl bg-[oklch(0.975_0.005_180)] p-5">
                <div className="space-y-3">
                  <PurposeBar label="Agriculture" value={40} />
                  <PurposeBar label="Small Business" value={75} />
                  <PurposeBar label="Healthcare" value={55} />
                  <PurposeBar label="Education" value={50} />
                  <PurposeBar label="Housing" value={45} />
                </div>
                <div className="mt-3 grid grid-cols-[90px_1fr] gap-3 text-[10px] text-ink-muted">
                  <span />
                  <div className="flex justify-between">
                    <span>0</span><span>40</span><span>80</span><span>120</span><span>160</span><span>200</span>
                  </div>
                </div>
                <div className="mt-1 text-center text-[10px] text-ink-muted">(thousands ₹)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
