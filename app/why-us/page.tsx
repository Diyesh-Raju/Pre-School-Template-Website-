"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";
import { isMobileViewport } from "@/components/mobile-reveal";
import { ServiceCard } from "./ServiceCard";
import { ImageGallery } from "./ImageGallery";
import { SafetyCards } from "./SafetyCards";
import { StatsBubbles } from "./StatsBubbles";
import { Reveal } from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: "👩‍🏫",
    title: "Guided by teachers. Loved like family",
    description:
      "Our dedicated educators create a warm, family-like environment where children feel safe to explore, learn, and grow.",
  },
  {
    icon: "🪔",
    title: "Connected to Roots. Nurtured by Principles",
    description:
      "From festival celebrations to moral storytelling, we introduce children to Indian traditions in joyful, age-appropriate ways—building cultural awareness and strong value systems from the start.",
  },
  {
    icon: "🛡️",
    title: "Safe Spaces. Secure Futures",
    description:
      "We believe safety is the foundation of childhood joy. Our preschool features state-of-the-art security measures, carefully vetted educators, and strict safety protocols at every level.",
  },
  {
    icon: "🌟",
    title: "We nurture the uniqueness in every child",
    description:
      "We believe in celebrating each child's individual strengths and interests. Our personalized approach ensures that every student receives the attention and support they need to flourish and reach their full potential.",
  },
];

export default function WhyUsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileViewport()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reason-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".reasons-grid",
            start: "top 80%",
            toggleActions: "restart none none reset",
          },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero — image box with overlaid heading */}
      <Reveal>
      <section
        className="px-4 sm:px-8 pt-32 sm:pt-40 pb-10 sm:pb-14"
        style={{
          background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="about-hero-glow relative rounded-3xl overflow-hidden min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] flex items-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/why-us-hero.png"
              alt="Two children in Little Millennium uniforms playing and learning together"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Left-to-right dark scrim so the white text stays readable */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 100%)",
              }}
            />
            <div className="relative z-10 max-w-2xl px-7 sm:px-12 lg:px-16 py-14">
              <h2
                className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.02]"
                style={{ color: "#1ABC9C", textShadow: "0 6px 24px rgba(0,0,0,0.55)" }}
              >
                Why Little Millennium?
              </h2>
              <p
                className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-relaxed"
                style={{ textShadow: "0 3px 14px rgba(0,0,0,0.5)" }}
              >
                Because big futures start with strong roots.
              </p>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      {/* Reasons */}
      <section className="section bg-[#FDFCF0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">
              The Little Millennium Difference
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              What sets us <span className="gradient-text">apart</span>
            </h2>
          </div>

          <div className="reasons-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="reason-card h-full">
                <ServiceCard
                  title={s.title}
                  description={s.description}
                  icon={s.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Moments gallery — spaced well clear of the four cards above */}
      <section className="section bg-[#FDFCF0] pt-20 sm:pt-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">
              A Peek Inside
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Moments from our{" "}
              <span className="gradient-text">classrooms</span>
            </h2>
          </div>
          <ImageGallery />
        </div>
      </section>

      {/* Creating Safe Spaces — carousel of safety features */}
      <Reveal>
      <section className="section bg-[#FDFCF0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] leading-tight">
              Creating Safe Spaces for{" "}
              <span className="gradient-text">Bright Futures</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed lg:pt-2">
              Your child&apos;s safety is our highest priority — from the moment
              they step in, to the moment they go home. What makes us a safe
              choice:
            </p>
          </div>
          <SafetyCards />
        </div>
      </section>
      </Reveal>

      {/* Stat counters — bubbly boxes */}
      <Reveal>
      <section className="section bg-[#FDFCF0] pt-4">
        <div className="max-w-7xl mx-auto">
          <StatsBubbles />
        </div>
      </section>
      </Reveal>

      {/* Closing CTA */}
      <Reveal>
      <section
        className="section relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FDFCF0 0%, #FAF1E2 100%)",
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight">
            See it for yourself
          </h2>
          <p className="mt-5 text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Book a campus visit and experience the warmth, care, and joyful
            learning that sets Little Millennium apart.
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
      </Reveal>

      <Footer />
    </div>
  );
}
