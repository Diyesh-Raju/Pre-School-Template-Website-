"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileViewport } from "@/components/mobile-reveal";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: "🌱",
    title: "Foundations of Growth",
    desc: "Our educators build secure attachment with every child, creating a safe emotional base from which curiosity and confidence naturally emerge.",
  },
  {
    icon: "💡",
    title: "Igniting Curiosity",
    desc: "Through inquiry-led play, teachers act as facilitators—guiding discovery rather than directing it, so each child learns to ask the right questions.",
  },
  {
    icon: "🤝",
    title: "Mentors for Life",
    desc: "Beyond academics, our staff model empathy, patience, and resilience—qualities that shape character long after formal schooling ends.",
  },
];

export default function TeacherSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mobile: pure CSS animation handles the reveal — no JS needed.
    if (isMobileViewport()) return;

    // Desktop: GSAP scroll-triggered fade-in (unchanged)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".teacher-pillar",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".teacher-grid",
            start: "top 80%",
            toggleActions: "restart none none reset",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-[#FDFCF0]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="text-sm sm:text-base uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">
              Our Educators
            </p>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-primary)]">
              Teachers Who{" "}
              <span className="gradient-text">Transform</span>
            </h2>
          </div>
          <p className="max-w-md text-[var(--text-secondary)] text-lg sm:text-xl lg:text-2xl leading-relaxed">
            At Little Millennium, we believe the teacher is the most powerful
            variable in a child&apos;s early educational journey.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="teacher-grid grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="teacher-pillar glass rounded-2xl p-8 sm:p-9 flex flex-col gap-5 hover:border-[#FF7F50]/50 transition-all duration-300"
            >
              <div className="text-5xl sm:text-6xl">{p.icon}</div>
              <h3 className="text-[var(--accent-gold)] font-semibold text-2xl sm:text-3xl leading-tight">
                {p.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
