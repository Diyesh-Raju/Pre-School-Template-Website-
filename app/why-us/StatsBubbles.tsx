"use client";

import { useEffect, useRef, useState } from "react";

// Placeholder figures — swap with the real numbers.
const stats = [
  { value: 2000, suffix: "+", label: "Parents who trust us" },
  { value: 5000, suffix: "+", label: "Student alumni" },
  { value: 15, suffix: "+", label: "Years of experience" },
];

function StatBubble({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    // Reset to 0 whenever it scrolls out of view, so it re-counts on return.
    if (!start) {
      setN(0);
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setN(value);
      return;
    }
    let raf = 0;
    const duration = 1600;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <div
      className="flex flex-col items-center text-center rounded-[2rem] sm:rounded-[2.5rem] px-8 py-10 sm:py-12"
      style={{
        background: "linear-gradient(160deg, #FFFFFF 0%, #FFF4EC 100%)",
        border: "2px solid rgba(255,127,80,0.55)",
        boxShadow:
          "0 20px 46px -16px rgba(255,127,80,0.40), 0 4px 14px rgba(255,127,80,0.12)",
      }}
    >
      <span className="text-5xl sm:text-6xl font-bold text-[#FF7F50] leading-none tabular-nums">
        {n.toLocaleString("en-US")}
        {suffix}
      </span>
      <span className="mt-3 text-sm sm:text-base font-medium text-[var(--text-secondary)]">
        {label}
      </span>
    </div>
  );
}

export function StatsBubbles() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Keep observing (no disconnect) so the counter resets when it leaves
    // and re-counts every time it scrolls back into view.
    const io = new IntersectionObserver(
      (entries) => setStart(entries[0].isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto"
    >
      {stats.map((s) => (
        <StatBubble key={s.label} {...s} start={start} />
      ))}
    </div>
  );
}
