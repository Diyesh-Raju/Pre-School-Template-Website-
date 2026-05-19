"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Scroll-scrubbed hero video (frame sequence) ──────────────────────────────
// The video is pre-extracted into JPG frames (see /public/hero-frames). Drawing
// a pre-decoded image to a canvas has ZERO decode lag on scroll — unlike seeking
// an <video> element's currentTime, which stutters.
const TOTAL_FRAMES = 192;
// The film reaches its last frame at this fraction of the hero scroll, then
// holds it for the rest. "Little Millennium" eases in over that held tail, so
// the title appears exactly as the video finishes.
const VIDEO_END_PROGRESS = 0.7;

const framePath = (i: number) =>
  `/hero-frames/frame-${String(i + 1).padStart(4, "0")}.jpg`;

export default function ParticleEffectHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const drawnFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const outerRef = useRef<HTMLDivElement>(null); // scroll driver
  const titleRef = useRef<HTMLDivElement>(null); // "Little Millennium" — appears at the end

  // ── Frame preload + scroll-scrubbed canvas draw ──
  // Skipped on phones — mobile uses the lightweight <MobileHero> instead.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches
    )
      return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let disposed = false;
    let cssW = 0;
    let cssH = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = canvas.offsetWidth;
      cssH = canvas.offsetHeight;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      drawnFrameRef.current = -1;
      paint();
    };

    const drawCover = (img: HTMLImageElement) => {
      if (!img.naturalWidth) return;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cssW / cssH;
      let dw: number, dh: number, dx: number, dy: number;
      if (cr > ir) {
        dw = cssW;
        dh = cssW / ir;
        dx = 0;
        dy = (cssH - dh) / 2;
      } else {
        dh = cssH;
        dw = cssH * ir;
        dx = (cssW - dw) / 2;
        dy = 0;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const paint = () => {
      rafRef.current = 0;
      const idx = targetFrameRef.current;
      if (idx === drawnFrameRef.current) return;
      const img = framesRef.current[idx];
      if (img && img.complete && img.naturalWidth) {
        drawCover(img);
        drawnFrameRef.current = idx;
      } else {
        for (let j = idx; j >= 0; j--) {
          const f = framesRef.current[j];
          if (f && f.complete && f.naturalWidth) {
            drawCover(f);
            drawnFrameRef.current = j;
            break;
          }
        }
      }
    };

    const schedulePaint = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(paint);
    };

    framesRef.current = new Array(TOTAL_FRAMES);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      framesRef.current[i] = img;
      if (i === 0) {
        img.onload = () => {
          if (disposed) return;
          drawnFrameRef.current = -1;
          paint();
        };
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const proxy = { p: 0 };
    const st = gsap.to(proxy, {
      p: 1,
      ease: "none",
      scrollTrigger: {
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.6,
      },
      onUpdate: () => {
        const fp = Math.min(proxy.p / VIDEO_END_PROGRESS, 1);
        targetFrameRef.current = Math.round(fp * (TOTAL_FRAMES - 1));
        schedulePaint();
      },
    });

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      st.scrollTrigger?.kill();
      st.kill();
      framesRef.current = [];
    };
  }, []);

  // ── "Little Millennium" eases in once the film has finished ──
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches
    )
      return;
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, scale: 1.08 });

      // Same trigger span as the video scrub, so timeline progress maps 1:1 to
      // it. A leading gap of VIDEO_END_PROGRESS keeps the title hidden until the
      // film reaches its last frame, then it fades in over the remaining scroll.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.6,
        },
      });

      tl.to(
        titleRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1 - VIDEO_END_PROGRESS,
          ease: "power2.out",
        },
        VIDEO_END_PROGRESS
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    // ── Outer div: scroll space that drives the scrub ──
    <div ref={outerRef} id="hero-scroll" style={{ height: "400vh" }}>
      {/* ── Sticky visual container — stays in view while outer scrolls ── */}
      <section className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Full-bleed scroll-scrubbed video frame (behind the navbar) */}
        <div className="absolute inset-0 overflow-hidden">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* "Little Millennium" — eases in as the film ends */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-center"
            style={{
              fontFamily: "var(--font-poppins, Poppins, sans-serif)",
              fontWeight: 700,
              color: "#FF7F50",
              lineHeight: 0.9,
              textShadow: "2px 6px 24px rgba(0,0,0,0.45)",
            }}
          >
            Little
            <br />
            Millennium
          </h1>
        </div>
      </section>
    </div>
  );
}
