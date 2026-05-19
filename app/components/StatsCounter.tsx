"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileViewport } from "@/components/mobile-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type IconKind = "graduation" | "building" | "heart" | "star";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  icon: IconKind;
};

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Qualified Educators", icon: "graduation" },
  { value: 2, suffix: "", label: "Premium Campuses", icon: "building" },
  { value: 500, suffix: "+", label: "Happy Families", icon: "heart" },
  { value: 15, suffix: "+", label: "Years of Excellence", icon: "star" },
];

const BANNER_BG = "#F5A623";
const PAGE_BG = "#FDFCF0";

function StatIcon({ kind }: { kind: IconKind }) {
  const cls = "w-14 h-14 sm:w-16 sm:h-16 text-white";
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "graduation":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5Z" />
          <path d="M6 11.5V16c1.6 1.3 3.8 2 6 2s4.4-.7 6-2v-4.5" />
          <path d="M22 9.5V14" />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <path d="M4 21V7l8-4 8 4v14" />
          <path d="M4 21h16" />
          <path d="M9 12h2M13 12h2M9 16h2M13 16h2" />
          <path d="M11 21v-3h2v3" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6L12 16.9 6.6 19.6l1.2-6L3.3 9.4l6.1-.8L12 3Z" />
        </svg>
      );
  }
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (isMobileViewport()) {
      const section = sectionRef.current;
      if (!section) return;

      let rafId = 0;

      const setDisplay = (mult: number) => {
        stats.forEach((stat, i) => {
          const el = numberRefs.current[i];
          if (!el) return;
          el.textContent = `${Math.round(stat.value * mult)}${stat.suffix}`;
        });
      };

      const stopCounter = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
      };

      const runCounter = () => {
        stopCounter();
        setDisplay(0);
        const duration = 2200;
        const startTime = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 2);
          setDisplay(eased);
          if (t < 1) rafId = requestAnimationFrame(tick);
          else rafId = 0;
        };
        rafId = requestAnimationFrame(tick);
      };

      let observer: IntersectionObserver | null = null;
      let everFired = false;
      try {
        observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (!entry) return;
            const ratio = entry.intersectionRatio;
            const rect = entry.boundingClientRect;
            if (ratio >= 0.2) {
              everFired = true;
              runCounter();
            } else if (ratio === 0 && rect.top > 0) {
              stopCounter();
              setDisplay(0);
            }
          },
          { threshold: [0, 0.2] }
        );
        observer.observe(section);
      } catch {
        // Older Safari without IO — fall back to the safety net below.
      }

      const fallback = window.setTimeout(() => {
        if (!everFired) runCounter();
      }, 1200);

      return () => {
        observer?.disconnect();
        clearTimeout(fallback);
        stopCounter();
      };
    }

    // Desktop: GSAP scroll-triggered count-up with restart-on-enter / reset-on-leave-back.
    const ctx = gsap.context(() => {
      const counters = { v0: 0, v1: 0, v2: 0, v3: 0 };

      const paint = () => {
        stats.forEach((stat, i) => {
          const el = numberRefs.current[i];
          if (!el) return;
          const key = `v${i}` as keyof typeof counters;
          el.textContent = `${Math.round(counters[key])}${stat.suffix}`;
        });
      };

      gsap.to(counters, {
        v0: stats[0].value,
        v1: stats[1].value,
        v2: stats[2].value,
        v3: stats[3].value,
        duration: 4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "restart none none reset",
        },
        onUpdate: paint,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stats-banner relative overflow-hidden"
      style={{ background: BANNER_BG }}
    >
      {/* Top wave — fills the page background color down into the banner */}
      <svg
        aria-hidden
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute top-0 inset-x-0 w-full h-10 sm:h-14 md:h-20 pointer-events-none"
      >
        <path
          d="M0,0 L1440,0 L1440,30 C1200,90 960,10 720,50 C480,90 240,20 0,55 Z"
          fill={PAGE_BG}
        />
      </svg>

      {/* Bottom wave */}
      <svg
        aria-hidden
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute bottom-0 inset-x-0 w-full h-10 sm:h-14 md:h-20 pointer-events-none"
      >
        <path
          d="M0,90 L1440,90 L1440,60 C1200,0 960,80 720,40 C480,0 240,70 0,35 Z"
          fill={PAGE_BG}
        />
      </svg>

      {/* Decorative shapes — animated, never block clicks */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* ── White cloud, top-right ─ drifts horizontally ── */}
        <div
          className="absolute"
          style={{ top: "12%", right: "8%" }}
        >
          <div className="deco-drift">
            <svg
              viewBox="0 0 140 70"
              className="w-24 sm:w-32 md:w-40 h-auto"
              style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.08))" }}
            >
              <path
                d="M30 55 C14 55 6 46 12 36 C2 30 6 16 22 18 C26 6 44 4 52 16 C58 4 78 8 80 22 C94 18 108 26 106 38 C124 38 130 54 114 58 L34 58 C28 58 26 56 30 55 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </div>

        {/* ── ABC, top-left ─ bobs ── */}
        <div
          className="absolute"
          style={{ top: "16%", left: "5%" }}
        >
          <div className="deco-bob">
            <span
              className="select-none text-5xl sm:text-6xl md:text-7xl font-black tracking-tight"
              style={{
                WebkitTextStroke: "1.6px rgba(255,255,255,0.55)",
                color: "transparent",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              ABC
            </span>
          </div>
        </div>

        {/* ── Protractor / semicircle, bottom-left ─ rotates ── */}
        <div
          className="absolute hidden sm:block"
          style={{ bottom: "14%", left: "4%" }}
        >
          <div className="deco-spin" style={{ transformOrigin: "50% 80%" }}>
            <svg viewBox="0 0 120 70" className="w-24 md:w-28 h-auto text-white/45">
              <path
                d="M8 60 A52 52 0 0 1 112 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line x1="8" y1="60" x2="112" y2="60" stroke="currentColor" strokeWidth="2" />
              {Array.from({ length: 9 }).map((_, i) => {
                const angle = (i * 180) / 8;
                const rad = (angle * Math.PI) / 180;
                const x1 = 60 - Math.cos(rad) * 52;
                const y1 = 60 - Math.sin(rad) * 52;
                const x2 = 60 - Math.cos(rad) * 46;
                const y2 = 60 - Math.sin(rad) * 46;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                );
              })}
              <circle cx="60" cy="60" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* ── Paperclip, mid-right ─ sways ── */}
        <div
          className="absolute hidden sm:block"
          style={{ top: "44%", right: "3%" }}
        >
          <div className="deco-sway">
            <svg viewBox="0 0 80 110" className="w-12 md:w-16 h-auto text-white/55">
              <path
                d="M40 12 C56 12 64 22 64 38 L64 86 C64 96 56 102 46 102 C36 102 28 96 28 86 L28 36 C28 28 34 22 42 22 C50 22 56 28 56 36 L56 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* ── Triangle ruler, top-right above cloud ─ sways gently ── */}
        <div
          className="absolute hidden md:block"
          style={{ top: "8%", right: "32%" }}
        >
          <div className="deco-wobble">
            <svg viewBox="0 0 110 80" className="w-20 md:w-24 h-auto text-white/45">
              <path
                d="M8 12 L102 12 L102 70 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {[0.2, 0.35, 0.5, 0.65, 0.8].map((t) => (
                <line
                  key={t}
                  x1={8 + 94 * t}
                  y1={12}
                  x2={8 + 94 * t}
                  y2={18}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* ── Sun, center top ─ rotates slowly ── */}
        <div
          className="absolute"
          style={{ top: "10%", left: "48%" }}
        >
          <div className="deco-spin-rev">
            <svg viewBox="0 0 60 60" className="w-10 sm:w-12 md:w-14 h-auto text-white/45">
              <circle cx="30" cy="30" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                const rad = (angle * Math.PI) / 180;
                const x1 = 30 + Math.cos(rad) * 14;
                const y1 = 30 + Math.sin(rad) * 14;
                const x2 = 30 + Math.cos(rad) * 22;
                const y2 = 30 + Math.sin(rad) * 22;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* ── Pencil, mid-left ─ tilts ── */}
        <div
          className="absolute hidden md:block"
          style={{ top: "55%", left: "8%" }}
        >
          <div className="deco-sway" style={{ animationDuration: "6s" }}>
            <svg viewBox="0 0 110 20" className="w-24 h-auto">
              <path
                d="M8 6 L82 6 L82 14 L8 14 Z"
                fill="rgba(255,255,255,0.45)"
              />
              <path d="M82 6 L96 10 L82 14 Z" fill="rgba(255,255,255,0.65)" />
              <path d="M96 10 L102 10" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
              <rect x="8" y="6" width="6" height="8" fill="rgba(255,255,255,0.6)" />
            </svg>
          </div>
        </div>

        {/* ── Star, bottom-right ─ rotates ── */}
        <div
          className="absolute"
          style={{ bottom: "20%", right: "20%" }}
        >
          <div className="deco-spin" style={{ animationDuration: "18s" }}>
            <svg viewBox="0 0 40 40" className="w-8 sm:w-10 md:w-12 h-auto text-white/55">
              <path
                d="m20 4 4.5 10 11 1.5-8 7.5 2 11L20 28.8 10.5 34l2-11-8-7.5 11-1.5L20 4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* ── Small floating dot cluster, bottom-center ─ bobs slow ── */}
        <div
          className="absolute hidden sm:block"
          style={{ bottom: "16%", left: "44%" }}
        >
          <div className="deco-bob-slow">
            <svg viewBox="0 0 60 16" className="w-14 h-auto">
              <circle cx="6"  cy="8" r="3" fill="rgba(255,255,255,0.55)" />
              <circle cx="22" cy="8" r="2" fill="rgba(255,255,255,0.45)" />
              <circle cx="36" cy="8" r="3" fill="rgba(255,255,255,0.55)" />
              <circle cx="52" cy="8" r="2" fill="rgba(255,255,255,0.45)" />
            </svg>
          </div>
        </div>

        {/* ── Small cloud, bottom-left ─ drifts ── */}
        <div
          className="absolute hidden md:block"
          style={{ bottom: "26%", left: "30%" }}
        >
          <div className="deco-drift" style={{ animationDuration: "9s" }}>
            <svg viewBox="0 0 100 50" className="w-20 h-auto" style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.06))" }}>
              <path
                d="M20 40 C8 40 4 32 10 26 C2 22 6 12 16 14 C18 6 32 4 36 12 C42 4 58 8 60 18 C72 16 80 24 78 32 C90 32 92 42 80 44 L24 44 C20 44 18 42 20 40 Z"
                fill="rgba(255,255,255,0.85)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-24 md:py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0">
          {stats.map((s, i) => {
            const mobileLeft = i % 2 === 1;
            const desktopLeft = i > 0;
            return (
              <div
                key={s.label}
                className={[
                  "flex flex-col items-center text-center px-3 sm:px-5 md:px-6",
                  mobileLeft
                    ? "border-l border-dashed border-white/45"
                    : "",
                  desktopLeft
                    ? "md:border-l md:border-dashed md:border-white/45"
                    : "md:border-l-0",
                  !mobileLeft && desktopLeft ? "border-l-0" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <StatIcon kind={s.icon} />
                <span
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                  className="block mt-5 mb-2 text-white font-bold leading-none text-5xl sm:text-6xl md:text-7xl tabular-nums"
                  style={{
                    textShadow: "0 6px 18px rgba(180, 90, 0, 0.18)",
                  }}
                >
                  0{s.suffix}
                </span>
                <p className="text-white/95 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.15em] leading-tight">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
