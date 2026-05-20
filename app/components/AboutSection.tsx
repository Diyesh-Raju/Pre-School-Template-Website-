"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileViewport } from "@/components/mobile-reveal";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileViewport()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 82%",
            toggleActions: "restart none none reset",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 50%, #FDFCF0 100%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — Visual accent */}
          <div className="relative hidden lg:block">
            <div className="aspect-square max-w-sm mx-auto">
              {/* Concentric rings */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-[#FF7F50]/25"
                  style={{
                    inset: `${(i - 1) * 14}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
              <div className="absolute inset-[30%] rounded-full bg-[#FF7F50]/15 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[var(--accent-gold)] text-5xl font-bold">15</p>
                  <p className="text-[var(--text-secondary)] text-xs uppercase tracking-widest mt-1">
                    Years of<br />Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="about-content">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-4">
              About Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-8 leading-snug">
              A Mission Rooted in{" "}
              <span style={{ color: "#25A5F5" }}>Child Development</span>
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] text-base leading-relaxed">
              <p>
                Little Millennium Preschool was founded on a simple conviction:
                the earliest years shape the very architecture of a child&apos;s
                developing mind. Our pedagogy blends Montessori principles, the
                Reggio Emilia philosophy, and evidence-based developmental
                psychology into a curriculum that honours each child&apos;s pace.
              </p>
              <p>
                Learning here is active and joyful—built through play,
                exploration, and guided inquiry, in close partnership with
                families—so every child moves forward with not just academic
                skills, but the confidence and resilience to thrive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
