export function BackgroundChart() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full text-brand-accent/25"
      viewBox="0 0 1440 500"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M0 380 L180 340 L340 360 L520 260 L720 300 L900 200 L1080 240 L1260 140 L1440 180"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="180" cy="340" r="4" fill="currentColor" />
      <circle cx="520" cy="260" r="4" fill="currentColor" />
      <circle cx="900" cy="200" r="4" fill="currentColor" />
      <circle cx="1260" cy="140" r="4" fill="currentColor" />
      <circle cx="90" cy="180" r="60" stroke="currentColor" strokeWidth="1" />
      <circle cx="1330" cy="90" r="80" stroke="currentColor" strokeWidth="1" />
      <g opacity="0.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <circle key={i} cx={430 + i * 12} cy={130 + (i % 2) * 8} r="2" fill="currentColor" />
        ))}
      </g>
    </svg>
  );
}
