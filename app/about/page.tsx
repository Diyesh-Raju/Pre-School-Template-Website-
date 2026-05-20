"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileViewport } from "@/components/mobile-reveal";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const teachers = [
  { name: "Teacher Geetha", role: "Nursery Educator", desc: "Exceptionally caring and patient. Creates a warm, safe, and joyful environment where children feel comfortable and loved." },
  { name: "Teacher Jyothi", role: "Pre-K Coordinator", desc: "Dedicated to holistic growth. Encourages learning through play, creativity, and highly interactive activities." },
  { name: "Teacher Ayana", role: "Montessori Expert", desc: "Focuses on communication and building core confidence in shy toddlers, helping them blossom socially." },
  { name: "Teacher Kavya", role: "Activity Lead", desc: "Brings unmatched energy to cultural events, Annual Days, and daily physical activities to keep kids engaged." },
  { name: "Teacher Anjali", role: "Early Years Caretaker", desc: "Provides gentle, motherly care and ensures every child feels like they are in their second home." },
];

// Duplicate for seamless loop
const allTeachers = [...teachers, ...teachers];

const awards = [
  {
    title: "Excellence in Early Education Award 2024",
    org: "National Education Council",
    accent: "#F4C77B",
  },
  {
    title: "Most Trusted Preschool Brand of the Year",
    org: "Parents' Choice Survey 2023",
    accent: "#9ED1B0",
  },
  {
    title: "Best Curriculum Innovation in Early Years",
    org: "Early Years Forum 2024",
    accent: "#A9C7E8",
  },
  {
    title: "Top Rated Preschool — Bangalore 2023",
    org: "Regional Education Awards",
    accent: "#E9A9B4",
  },
  {
    title: "Safe & Nurturing Campus Recognition",
    org: "Child Wellbeing Board 2024",
    accent: "#C9B5E0",
  },
  {
    title: "Outstanding Faculty Development Honour",
    org: "Educators' Guild 2023",
    accent: "#F4B58A",
  },
];

const visionCards = [
  {
    label: "Vision",
    icon: "🌟",
    text: "To be every child's first joyful step into a lifelong love of learning — a place where curiosity is sparked, confidence takes root, and potential is given the room to grow.",
    color: "#EFA47C",
    shadow: "rgba(239,164,124,0.45)",
  },
  {
    label: "Mission",
    icon: "🎯",
    text: "To deliver warm, play-led early education that nurtures the whole child — mind, heart, and character — in close partnership with every family we welcome.",
    color: "#86C68C",
    shadow: "rgba(134,198,140,0.45)",
  },
  {
    label: "Philosophy",
    icon: "💡",
    text: "We believe children learn best through play, wonder, and gentle guidance. Every space is designed so a child feels safe, seen, and genuinely excited to explore.",
    color: "#88BBD9",
    shadow: "rgba(136,187,217,0.45)",
  },
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ down: false, startX: 0, startLeft: 0 });

  const scrollAwards = (dir: number) => {
    const el = awardsRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 20 : 240; // 20px = gap-5
    el.scrollTo({ left: el.scrollLeft + dir * step, behavior: "smooth" });
  };

  // Click-drag to scroll the awards carousel (mouse only — touch scrolls natively)
  const onAwardsPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = awardsRef.current;
    if (!el) return;
    dragRef.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onAwardsPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = awardsRef.current;
    if (!el || !dragRef.current.down) return;
    el.scrollLeft = dragRef.current.startLeft - (e.clientX - dragRef.current.startX);
  };
  const onAwardsPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.down = false;
    awardsRef.current?.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    // Mobile: pure CSS animations handle reveals + marquee. No JS needed.
    if (isMobileViewport()) return;

    // Desktop: GSAP path (unchanged)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".principal-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".principal-content",
            start: "top 82%",
            toggleActions: "restart none none reset",
          },
        }
      );
    }, sectionRef);

    const track = trackRef.current;
    if (track) {
      // The teacher list is rendered twice (allTeachers = [...teachers, ...teachers]),
      // so moving the track left by exactly 50% of its own width lands the second
      // copy precisely where the first started — a seamless, layout-independent loop.
      // (The old scrollWidth/2 + modifier approach broke when scrollWidth read 0
      // before the cards had laid out, leaving the marquee frozen.)
      gsap.set(track, { xPercent: 0 });
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
        force3D: true,
      });

      const pause = () => tweenRef.current?.pause();
      const resume = () => tweenRef.current?.resume();
      track.parentElement?.addEventListener("mouseenter", pause);
      track.parentElement?.addEventListener("mouseleave", resume);

      return () => {
        ctx.revert();
        tweenRef.current?.kill();
        track.parentElement?.removeEventListener("mouseenter", pause);
        track.parentElement?.removeEventListener("mouseleave", resume);
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef}>
      {/* Hero — DESKTOP / tablet: full-screen image. id="hero-scroll" tells the
          Navbar to go transparent while this section is in view. Hidden on
          phones, which get a boxed image inside the intro section below. */}
      <section
        id="hero-scroll"
        className="hidden md:block relative w-full h-screen overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-hero-new.png"
          alt="A mother and her daughter reading together at home"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* Intro text — on desktop this follows the full-screen hero; on mobile
          it leads the page with the boxed hero image stacked above. */}
      <section
        className="px-4 sm:px-8 pt-28 md:pt-12 sm:pt-16 pb-12 sm:pb-16"
        style={{ background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Mobile-only boxed hero image — the desktop version above is
              full-bleed, while phones get the original contained card. */}
          <div className="md:hidden about-hero-glow rounded-3xl overflow-hidden mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-hero-new.png"
              alt="A mother and her daughter reading together at home"
              className="block w-full h-auto"
            />
          </div>

          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">
              About Us
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
              Where every child&apos;s{" "}
              <span style={{ color: "#2FD675" }}>first big step</span> begins
            </h1>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
              The earliest years shape a lifetime. At Little Millennium, we
              build a warm, joyful, and thoughtfully designed space where
              curiosity is nurtured, confidence grows, and every child is
              guided to take their first big step with us.
            </p>
          </div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="section" style={{ background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 50%, #FDFCF0 100%)" }}>
        <div className="max-w-7xl mx-auto pt-24">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">
              Our Family
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              The Pillars of{" "}
              <span style={{ color: "#25A5F5" }}>Little Millennium</span>
            </h2>
          </div>

          <div className="principal-content grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left — Photo */}
            <div className="flex justify-center">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-[#FF7F50]/30 overflow-hidden bg-[#FF7F50]/10 flex items-center justify-center">
                <span className="text-[#6B6963] text-sm tracking-widest uppercase font-medium">[ Mom&apos;s Photo ]</span>
              </div>
            </div>

            {/* Right — Text */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-4">
                Principal &amp; Head of Institution
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-6 leading-snug">
                Ms. Shruthi
              </h3>
              <div className="space-y-4 text-[var(--text-secondary)] text-base leading-[1.9]">
                <p>
                  &ldquo;Education is not just about academics; it is about providing a safe, nurturing, and joyful second home for every child. At Little Millennium, my team and I are dedicated to understanding each child&apos;s unique potential.&rdquo;
                </p>
                <p>
                  We believe in building a foundation of love, patience, and holistic development so that their first big step is their best one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision · Mission · Philosophy */}
      <section className="section" style={{ background: "#FDFCF0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {visionCards.map((c) => (
              <div
                key={c.label}
                className="principal-content rounded-3xl p-8 sm:p-9 flex flex-col gap-4 relative overflow-hidden"
                style={{
                  background: c.color,
                  boxShadow: `0 22px 44px -18px ${c.shadow}`,
                }}
              >
                {/* Soft glow */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-25 blur-3xl pointer-events-none"
                  style={{ background: "#FFFFFF" }}
                />
                <span className="text-4xl">{c.icon}</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-black">
                  {c.label}
                </h3>
                <p className="text-black/80 text-sm sm:text-base leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Slider Section */}
      <section className="section overflow-hidden" style={{ background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 50%, #FDFCF0 100%)" }}>
        <div className="max-w-7xl mx-auto mb-12 px-4 sm:px-8">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">
              Our Educators
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Meet the{" "}
              <span style={{ color: "#9B59B6" }}>Heart of Our Classrooms</span>
            </h2>
          </div>
        </div>

        {/* Marquee container — identical structure to ReviewsMarquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FDFCF0] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FDFCF0] to-transparent z-10 pointer-events-none" />

          <div className="flex lm-marquee-track" ref={trackRef} style={{ width: "max-content" }}>
            {allTeachers.map((teacher, i) => (
              <div
                key={i}
                className="bg-white border border-[#FF7F50]/25 rounded-2xl p-6 mx-3 flex flex-col gap-4 shrink-0 shadow-sm"
                style={{ width: "340px" }}
              >
                {/* Avatar + Role badge */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FF7F50]/10 border border-[#FF7F50]/30 flex items-center justify-center text-[#FF7F50] font-bold text-lg shrink-0">
                    {teacher.name.split(" ").pop()?.[0]}
                  </div>
                  <div>
                    <p className="text-[#333333] text-sm font-medium">{teacher.name}</p>
                    <span className="bg-[#FF7F50]/10 border border-[#FF7F50]/25 rounded-full px-3 py-0.5 text-xs text-[#FF7F50] font-medium">
                      {teacher.role}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#6B6963] text-sm leading-relaxed flex-1">
                  {teacher.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us — moved here from the home page */}
      <AboutSection />

      {/* Our Awards */}
      <section
        className="section overflow-hidden"
        style={{ background: "#FDFCF0", paddingBottom: "2rem" }}
      >
        <div className="max-w-7xl mx-auto">
          <div>
            {/* Heading, copy, awards carousel */}
            <div className="principal-content">
              <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-5">
                Our <span style={{ color: "#9B59B6" }}>Awards</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-xl mb-10">
                Celebrated for what matters most — nurturing happy, confident,
                and future-ready children. Every honour we receive reflects the
                trust families place in us and the joyful learning we bring to
                our classrooms each and every day.
              </p>

              {/* Horizontal award-card carousel */}
              <div
                ref={awardsRef}
                onPointerDown={onAwardsPointerDown}
                onPointerMove={onAwardsPointerMove}
                onPointerUp={onAwardsPointerUp}
                onPointerCancel={onAwardsPointerUp}
                className="petal-track flex gap-5 overflow-x-auto snap-x snap-proximity pb-4 -mx-1 px-1 cursor-grab active:cursor-grabbing select-none"
              >
                {awards.map((a) => (
                  <div
                    key={a.title}
                    className="shrink-0 w-[200px] sm:w-[220px] snap-start"
                  >
                    {/* Image area (placeholder — swap with real award photos) */}
                    <div
                      className="rounded-2xl h-[200px] sm:h-[220px] flex items-center justify-center overflow-hidden shadow-[0_14px_28px_-14px_rgba(0,0,0,0.18)]"
                      style={{
                        background: `linear-gradient(160deg, ${a.accent} 0%, #FFFFFF 140%)`,
                      }}
                    >
                      <svg
                        className="w-20 h-20 text-white/90"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 21h8M12 17v4M6 4h12v5a6 6 0 0 1-12 0V4Z" />
                        <path d="M18 5h3v2a3 3 0 0 1-3 3M6 5H3v2a3 3 0 0 0 3 3" />
                      </svg>
                    </div>
                    {/* Title under the image */}
                    <p className="mt-4 text-[var(--text-primary)] text-sm font-semibold leading-snug text-center">
                      {a.title}
                    </p>
                    <p className="mt-1 text-[var(--text-secondary)] text-xs text-center">
                      {a.org}
                    </p>
                  </div>
                ))}
              </div>

              {/* Carousel controls — drag, swipe, or use these arrows */}
              <div className="flex gap-3 mt-6">
                {[-1, 1].map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => scrollAwards(dir)}
                    aria-label={dir < 0 ? "Previous awards" : "Next awards"}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[#FF7F50]/10"
                    style={{ border: "1px solid rgba(255,127,80,0.45)", color: "#FF7F50" }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      style={{ transform: dir < 0 ? "rotate(180deg)" : undefined }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA — bridges the awards section into the footer */}
      <section
        className="section relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FDFCF0 0%, #FAF1E2 100%)",
          paddingTop: "2rem",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,127,80,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-4">
            Visit Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight">
            Ready to begin your child&rsquo;s journey with{" "}
            <span style={{ color: "#25A5F5" }}>Little Millennium</span>?
          </h2>
          <p className="mt-5 text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Book a campus visit and see our joyful, future-ready classrooms for
            yourself — we&rsquo;d love to welcome your family.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5"
              style={{
                background: "#FF7F50",
                color: "#FFFFFF",
                boxShadow: "0 10px 22px rgba(255,127,80,0.3)",
                fontFamily: "var(--font-poppins, Poppins, sans-serif)",
              }}
            >
              Schedule a Visit
            </a>
            <a
              href="tel:+919900477944"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs uppercase tracking-widest transition-colors hover:bg-[#FF7F50]/10"
              style={{
                border: "1px solid rgba(255,127,80,0.45)",
                color: "#FF7F50",
                fontFamily: "var(--font-poppins, Poppins, sans-serif)",
              }}
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
