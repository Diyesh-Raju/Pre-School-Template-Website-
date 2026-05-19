"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const campuses = [
  {
    name: "Poorna Pragna Layout Campus",
    tagline: "Where Every Child Blooms",
    principal: "Mrs. [Mom's Name]",
    address: "No.67, 4th Main Road, Near Vijaya Bank, Bengaluru 560061",
    phone: "9900477944",
    mapUrl: "https://maps.app.goo.gl/PVD5W2F86Ykoaz4d6",
    slideFrom: "-120%",
  },
  {
    name: "Vijaya Bank Layout Campus",
    tagline: "Nurturing Roots, Building Wings",
    principal: "Mrs. [Mom's Name]",
    address: "No.87, 1st Main, 4th Cross Road, Behind HDFC Bank, Bengaluru 560076",
    phone: "9741530944",
    mapUrl: "https://maps.app.goo.gl/hrDwxLsGX6drHNtMA",
    slideFrom: "120%",
  },
];

export default function HeroSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { x: campuses[i].slideFrom, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.15,
          }
        );
      });

      // Fade in hero text
      gsap.fromTo(
        ".hero-badge",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-headline",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.35 }
      );
      gsap.fromTo(
        ".hero-sub",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.55 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFCF0] via-[#FAF5E8] to-[#FDFCF0]" />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#FDFCF0]/40" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,127,80,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,127,80,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#FF7F50]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#1e3a5f]/40 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Child Image */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Image frame */}
            <div className="relative w-full max-w-md lg:max-w-full">
              {/* Gold border accent */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#FF7F50]/40 via-transparent to-[#FF7F50]/20 blur-sm" />
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#FAF5E8]">
                {/* Placeholder image — replace src with actual photo */}
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#FAF5E8] to-[#FDFCF0]">
                  <div className="w-32 h-32 rounded-full bg-[#FF7F50]/10 border-2 border-[#FF7F50]/30 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-[#FF7F50]/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm text-center px-4">
                    Student photo in<br />Little Millennium uniform
                  </p>
                  <p className="text-[#FF7F50]/50 text-xs">(Replace with actual image)</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 shadow-xl">
                <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">
                  Est. 2010
                </p>
                <p className="text-[var(--accent-gold)] font-bold text-sm">
                  Bangalore
                </p>
              </div>
            </div>
          </div>

          {/* Right — Text + Cards */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="hero-badge inline-block text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-4 border border-[#FF7F50]/30 px-3 py-1 rounded-full">
                Premium Early Education
              </p>
              <h1
                className="hero-headline hero-main-text text-4xl sm:text-5xl lg:text-6xl font-bold"
                style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)", lineHeight: 0.85 }}
              >
                <span style={{ color: '#FFD700' }}>Little</span>
                <br />
                <span style={{ color: '#FFD700' }}>Millennium</span>
                <br />
                <span className="text-[var(--text-secondary)] text-2xl sm:text-3xl font-light">
                  Preschool
                </span>
              </h1>
              <p className="hero-sub mt-4 text-[var(--text-secondary)] text-lg leading-relaxed max-w-sm">
                Two campuses. One vision. Shaping confident, curious, and
                compassionate young minds in the heart of Bangalore.
              </p>
            </div>

            {/* Campus Cards */}
            <div className="flex flex-col gap-4">
              {campuses.map((campus, i) => (
                <div
                  key={campus.name}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="glass rounded-2xl p-5 hover:border-[#FF7F50]/40 transition-all duration-300 group cursor-pointer"
                  style={{ border: "1px solid rgba(255,127,80,0.2)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)]" />
                        <h3 className="text-[var(--accent-gold)] font-semibold text-sm uppercase tracking-wide">
                          {campus.name}
                        </h3>
                      </div>
                      <p className="text-[var(--text-primary)] text-base font-light italic mb-2">
                        &ldquo;{campus.tagline}&rdquo;
                      </p>
                      <p className="text-[var(--text-secondary)] text-xs mb-1">
                        {campus.address}
                      </p>
                      <p className="text-[var(--text-secondary)] text-xs mb-1">
                        Principal:{" "}
                        <span className="text-[var(--text-primary)]">
                          {campus.principal}
                        </span>
                      </p>
                      <p className="text-[var(--accent-gold)] text-xs font-medium">
                        📞 {campus.phone}
                      </p>
                    </div>
                    <Link
                      href={campus.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-10 h-10 rounded-full border border-[#FF7F50]/30 flex items-center justify-center text-[var(--accent-gold)] hover:bg-[#FF7F50]/10 transition-colors"
                      aria-label="View on map"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
            </div>

            {/* CTA */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-[var(--accent-gold)] text-[#FDFCF0] font-bold text-sm uppercase tracking-widest hover:bg-[var(--accent-gold-light)] transition-colors"
              >
                Enquire Now
              </Link>
              <Link
                href="/about-us"
                className="px-6 py-3 rounded-full border border-[#FF7F50]/40 text-[var(--accent-gold)] text-sm uppercase tracking-widest hover:bg-[#FF7F50]/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#FF7F50] to-transparent" />
      </div>
    </section>
  );
}
