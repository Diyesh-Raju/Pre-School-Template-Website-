"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileViewport } from "@/components/mobile-reveal";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    stage: "Stage I",
    grade: "Playgroup",
    title: "Developing Roots",
    ages: "2–3 Years",
    icon: "🌱",
    focus: "Sensory exploration and social integration.",
    activities: ["Motor skill development", "Storytelling", "Basic habit formation"],
    accentColor: "#38D93E",
    shadowColor: "rgba(56,217,62,0.45)",
  },
  {
    stage: "Stage II",
    grade: "Nursery",
    title: "Emerging Wings",
    ages: "3–4 Years",
    icon: "🦋",
    focus: "Language foundation and creative expression.",
    activities: ["Pre-writing strokes", "Phonics introduction", "Art & music exploration"],
    accentColor: "#3AD6C9",
    shadowColor: "rgba(58,214,201,0.45)",
  },
  {
    stage: "Stage III",
    grade: "LKG",
    title: "Ready to Fly I",
    ages: "4–5 Years",
    icon: "🚀",
    focus: "Cognitive development and academic readiness.",
    activities: ["Formal phonics", "Number recognition", "Understanding Our World"],
    accentColor: "#FFFB54",
    shadowColor: "rgba(255,251,84,0.45)",
    isReadyToFly: true,
  },
  {
    stage: "Stage IV",
    grade: "UKG",
    title: "Ready to Fly II",
    ages: "5–6 Years",
    icon: "🎓",
    focus: "Advanced literacy, numeracy, and primary school transition.",
    activities: ["Independent reading", "Sentence construction", "Advanced mathematical operations"],
    accentColor: "#FF7F50",
    shadowColor: "rgba(255,127,80,0.45)",
    isReadyToFly: true,
  },
];

export default function CurriculumSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileViewport()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stage-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stage-grid",
            start: "top 78%",
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
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">
            Our Curriculum
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            The Four-Stage{" "}
            <span className="gradient-text">Learning Path</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            A thoughtfully sequenced journey from sensory discovery to academic
            excellence — guiding every child towards their{" "}
            <span className="text-[var(--accent-gold)] font-medium">
              Ready to Fly
            </span>{" "}
            moment.
          </p>
        </div>

        {/* 2×2 Stage Grid */}
        <div className="stage-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stages.map((s) => (
            <div
              key={s.title}
              className="stage-card relative rounded-2xl p-7 flex flex-col gap-5 overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: s.accentColor,
                boxShadow: `0 18px 36px -14px ${s.shadowColor}`,
              }}
            >
              {/* Ambient glow */}
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-25 blur-3xl pointer-events-none"
                style={{ background: "#FFFFFF" }}
              />

              {/* Header row */}
              <div className="flex items-start gap-3">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <span
                    className="text-base sm:text-lg font-mono uppercase tracking-widest px-3 py-1 rounded-full font-semibold"
                    style={{
                      background: "rgba(0,0,0,0.12)",
                      color: "#000000",
                    }}
                  >
                    {s.stage}
                  </span>
                  <p className="text-black/90 text-base sm:text-lg mt-2 font-semibold">
                    {s.grade} · {s.ages}
                  </p>
                </div>
              </div>

              {/* Title + Focus */}
              <div>
                <h3 className="text-xl font-bold mb-2 text-black">
                  {s.title}
                </h3>
                <p className="text-black/80 text-sm leading-relaxed">
                  <span className="text-black font-medium">
                    Focus:{" "}
                  </span>
                  {s.focus}
                </p>
              </div>

              {/* Activities */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/70 mb-2">
                  Activities
                </p>
                <ul className="flex flex-col gap-1.5">
                  {s.activities.map((activity) => (
                    <li
                      key={activity}
                      className="flex items-center gap-2 text-sm text-black/85"
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-black" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ready to Fly badge for LKG & UKG */}
              {s.isReadyToFly && (
                <div className="mt-auto pt-4 border-t border-black/25 flex items-center gap-2">
                  <span className="text-xs text-black">✦</span>
                  <span className="text-xs font-semibold text-black">
                    Ready to Fly — The Ultimate Goal
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
