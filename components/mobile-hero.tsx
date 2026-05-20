"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Shared coral headline style for the word states (mirrors the desktop hero)
const TEXT_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-poppins, Poppins, sans-serif)",
  fontWeight: 700,
  color: "#FF7F50",
  lineHeight: 1.05,
  textShadow: "0 0 18px rgba(255,127,80,0.2)",
  WebkitTextStroke: "1px rgba(51,51,51,0.35)",
};

const campuses = [
  {
    name: "Poorna Pragna Layout",
    tagline: "Where Every Child Blooms",
    address: "No.67, 4th Main Road, Near Vijaya Bank, Bengaluru 560061",
    phone: "9900477944",
    mapUrl: "https://maps.app.goo.gl/PVD5W2F86Ykoaz4d6",
  },
  {
    name: "Vijaya Bank Layout",
    tagline: "Nurturing Roots, Building Wings",
    address: "No.87, 1st Main, 4th Cross Road, Behind HDFC Bank, Bengaluru 560076",
    phone: "9741530944",
    mapUrl: "https://maps.app.goo.gl/hrDwxLsGX6drHNtMA",
  },
];

export default function MobileHero() {
  const particleRef = useRef<HTMLCanvasElement>(null); // ambient drifting glow
  const outerRef = useRef<HTMLDivElement>(null); // scroll driver
  const text1Ref = useRef<HTMLDivElement>(null); // Little Millennium — center
  const text2Ref = useRef<HTMLDivElement>(null); // Nurture Greatness  — left-middle
  const text3Ref = useRef<HTMLDivElement>(null); // Future Ready       — right-middle
  const text4Ref = useRef<HTMLDivElement>(null); // Playful Learning   — left-middle
  const text5Ref = useRef<HTMLDivElement>(null); // Holistic Growth    — right-middle
  const boxesRef = useRef<HTMLDivElement>(null); // School location cards — finale

  // ── Ambient coral particles drifting up behind the words (lightweight) ──
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = 34;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let parts: {
      x: number;
      y: number;
      r: number;
      vy: number;
      sway: number;
      phase: number;
      a: number;
    }[] = [];

    const seed = () => {
      parts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(1, 3.2),
        vy: rand(6, 20),
        sway: rand(0.3, 1.1),
        phase: Math.random() * Math.PI * 2,
        a: rand(0.16, 0.55),
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const paintOne = (p: (typeof parts)[number], x: number) => {
      ctx.beginPath();
      ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,150,110,${p.a})`;
      ctx.shadowColor = "rgba(255,127,80,0.75)";
      ctx.shadowBlur = p.r * 4;
      ctx.fill();
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.vy * dt;
        p.phase += dt;
        if (p.y < -12) {
          p.y = h + 12;
          p.x = Math.random() * w;
        }
        paintOne(p, p.x + Math.sin(p.phase) * 12 * p.sway);
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if (reduce) {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) paintOne(p, p.x);
    } else {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }

    const onVis = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduce && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // ── Scroll-driven sequence: Little Millennium → two words → location boxes ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          text2Ref.current,
          text3Ref.current,
          text4Ref.current,
          text5Ref.current,
        ],
        { opacity: 0, y: 28, scale: 0.85 }
      );
      gsap.set(boxesRef.current, { opacity: 0, y: 36, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 1 → 2: Little Millennium out, Nurture Greatness in (left)
      tl.to(text1Ref.current, { opacity: 0, scale: 0.9, y: -28, duration: 1 }, 0)
        .to(text2Ref.current, { opacity: 1, y: 0, scale: 1, duration: 1 }, 0.7);

      // 2 → 3: Nurture Greatness out, Future Ready in (right)
      tl.to(text2Ref.current, { opacity: 0, scale: 0.9, y: -18, duration: 0.8 }, 2.3)
        .to(text3Ref.current, { opacity: 1, y: 0, scale: 1, duration: 1 }, 3);

      // 3 → 4: Future Ready out, Playful Learning in (left)
      tl.to(text3Ref.current, { opacity: 0, scale: 0.9, y: -18, duration: 0.8 }, 4.5)
        .to(text4Ref.current, { opacity: 1, y: 0, scale: 1, duration: 1 }, 5.2);

      // 4 → 5: Playful Learning out, Holistic Growth in (right)
      tl.to(text4Ref.current, { opacity: 0, scale: 0.9, y: -18, duration: 0.8 }, 6.7)
        .to(text5Ref.current, { opacity: 1, y: 0, scale: 1, duration: 1 }, 7.4);

      // 5 → finale: Holistic Growth out, the two school-location boxes appear
      tl.to(text5Ref.current, { opacity: 0, scale: 0.9, y: -18, duration: 0.8 }, 8.9)
        .to(boxesRef.current, { opacity: 1, y: 0, scale: 1, duration: 1 }, 9.6);
    });

    return () => ctx.revert();
  }, []);

  return (
    // Outer div: scroll space that drives the timeline
    <div ref={outerRef} style={{ height: "520vh" }}>
      {/* Sticky visual container — stays in view while outer scrolls.
          id="hero-scroll" lets the Navbar go transparent over the dark animation
          and restore its cream background once we scroll past. (MobileHero is
          inside <div class="md:hidden">, so this id only resolves on phones —
          desktop's ParticleEffectHero owns it there.) */}
      <section
        id="hero-scroll"
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 35%, #1f1b18 0%, #0d0b0a 70%, #000 100%)",
        }}
      >
        {/* Soft coral wash */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(255,127,80,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Ambient drifting particles */}
        <canvas
          ref={particleRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
        />

        {/* STATE 1 — "Little Millennium" — centre, with a scroll cue pinned
            near the bottom of the viewport (not stacked under the title). */}
        <div
          ref={text1Ref}
          className="absolute inset-0 z-20 px-5 pointer-events-none"
        >
          <h1
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            style={{
              fontFamily: "var(--font-poppins, Poppins, sans-serif)",
              fontWeight: 700,
              color: "#FF7F50",
              fontSize: "clamp(2.75rem, 15vw, 5rem)",
              lineHeight: 0.92,
              textShadow: "2px 6px 24px rgba(0,0,0,0.55)",
            }}
          >
            Little
            <br />
            Millennium
          </h1>
          {/* Scroll cue — sits towards the bottom of the screen so it reads
              like a "keep going" prompt rather than a subtitle. */}
          <p
            className="absolute left-1/2 -translate-x-1/2 bottom-[12vh] flex items-center gap-2 text-white/85 uppercase font-medium animate-pulse"
            style={{
              fontFamily: "var(--font-poppins, Poppins, sans-serif)",
              fontSize: "clamp(0.78rem, 3.2vw, 0.95rem)",
              letterSpacing: "0.32em",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Scroll
            <span aria-hidden="true" className="text-base leading-none">↓</span>
          </p>
        </div>

        {/* STATE 2 — "Nurture Greatness" — left middle */}
        <div
          ref={text2Ref}
          className="absolute inset-0 flex items-center justify-start pl-6 z-20 pointer-events-none"
        >
          <div>
            <h2 style={{ ...TEXT_STYLE, fontSize: "clamp(2.5rem, 13vw, 4.5rem)" }}>
              Nurture
              <br />
              Greatness
            </h2>
            <p className="text-[#FF7F50] text-[10px] uppercase tracking-[0.25em] font-medium mt-2">
              PERSONALIZED ATTENTION
            </p>
          </div>
        </div>

        {/* STATE 3 — "Future Ready" — right middle */}
        <div
          ref={text3Ref}
          className="absolute inset-0 flex items-center justify-end pr-6 z-20 pointer-events-none text-right"
        >
          <div>
            <h2 style={{ ...TEXT_STYLE, fontSize: "clamp(2.5rem, 13vw, 4.5rem)" }}>
              Future
              <br />
              Ready
            </h2>
            <p className="text-[#FF7F50] text-[10px] uppercase tracking-[0.25em] font-medium mt-2 text-right">
              MODERN PEDAGOGY
            </p>
          </div>
        </div>

        {/* STATE 4 — "Playful Learning" — left middle */}
        <div
          ref={text4Ref}
          className="absolute inset-0 flex items-center justify-start pl-6 z-20 pointer-events-none"
        >
          <div>
            <h2 style={{ ...TEXT_STYLE, fontSize: "clamp(2.5rem, 13vw, 4.5rem)" }}>
              Playful
              <br />
              Learning
            </h2>
            <p className="text-[#FF7F50] text-[10px] uppercase tracking-[0.25em] font-medium mt-2">
              JOYFUL EXPLORATION
            </p>
          </div>
        </div>

        {/* STATE 5 — "Holistic Growth" — right middle */}
        <div
          ref={text5Ref}
          className="absolute inset-0 flex items-center justify-end pr-6 z-20 pointer-events-none text-right"
        >
          <div>
            <h2 style={{ ...TEXT_STYLE, fontSize: "clamp(2.5rem, 13vw, 4.5rem)" }}>
              Holistic
              <br />
              Growth
            </h2>
            <p className="text-[#FF7F50] text-[10px] uppercase tracking-[0.25em] font-medium mt-2 text-right">
              ALL-ROUND DEVELOPMENT
            </p>
          </div>
        </div>

        {/* FINALE — the two school-location boxes */}
        <div
          ref={boxesRef}
          className="absolute inset-0 flex items-center justify-center z-20 px-5"
        >
          <div className="flex flex-col gap-3 w-full max-w-sm">
            {campuses.map((campus) => (
              <div
                key={campus.name}
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(18,18,18,0.6)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,127,80,0.4)",
                  boxShadow: "0 14px 34px rgba(0,0,0,0.5)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "#FF7F50" }}
                      />
                      <h3 className="text-[11px] uppercase tracking-wide font-semibold text-[#FF7F50]">
                        {campus.name}
                      </h3>
                    </div>
                    <p className="text-white/90 text-sm italic mb-1.5 leading-snug">
                      &ldquo;{campus.tagline}&rdquo;
                    </p>
                    <p className="text-white/65 text-[11px] leading-relaxed mb-1">
                      {campus.address}
                    </p>
                    <a
                      href={`tel:+91${campus.phone}`}
                      className="text-xs font-medium text-[#FF7F50]"
                    >
                      📞 {campus.phone}
                    </a>
                  </div>
                  <Link
                    href={campus.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ border: "1px solid rgba(255,127,80,0.4)", color: "#FF7F50" }}
                    aria-label="View on map"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
            <Link
              href="/contact"
              className="mt-1 flex items-center justify-center px-5 py-3 rounded-full font-semibold text-xs uppercase tracking-widest"
              style={{
                background: "#FF7F50",
                color: "#FFFFFF",
                boxShadow: "0 8px 18px rgba(255,127,80,0.3)",
                fontFamily: "var(--font-poppins, Poppins, sans-serif)",
              }}
            >
              Begin Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
