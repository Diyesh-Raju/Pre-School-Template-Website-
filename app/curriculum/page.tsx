"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";
import { BouncingBalls } from "../components/BouncingBalls";
import { isMobileViewport } from "@/components/mobile-reveal";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    stage: "Stage I",
    grade: "Playgroup",
    title: "Developing Roots",
    ages: "2–3 Years",
    icon: "🌱",
    image: "/curriculum/stage-1.png",
    imgPos: "center 32%",
    duration: "2–3 Hours",
    classSize: "10–12 Kids",
    intervals: "Weekdays",
    ourFocus: [
      "Fun-Filled Problem Solving",
      "Socializing Skills",
      "Motor-Skill Enhancement",
      "Perception & Discernment",
      "Language Skills",
    ],
    focus: "Sensory exploration and social integration.",
    focusDetail:
      "At this foundational stage, children embark on their first structured learning journey. Through rich sensory experiences and guided social interactions, young learners develop the essential building blocks for all future growth — curiosity, trust, and a love of exploration.",
    activities: [
      {
        name: "Motor Skill Development",
        desc: "Gross and fine motor exercises through purposeful play, outdoor movement, and hands-on crafting activities that build coordination and body awareness.",
      },
      {
        name: "Storytelling",
        desc: "Interactive storytelling sessions that build listening comprehension, vocabulary, and imagination — laying the groundwork for a lifelong love of language.",
      },
      {
        name: "Basic Habit Formation",
        desc: "Gentle routines that establish self-care practices, respect for peers, and a positive relationship with learning from the very first day.",
      },
    ],
    accentColor: "#FF7F50",
  },
  {
    stage: "Stage II",
    grade: "Nursery",
    title: "Emerging Wings",
    ages: "3–4 Years",
    icon: "🦋",
    image: "/curriculum/stage-2.png",
    imgPos: "center 60%",
    duration: "3–4 Hours",
    classSize: "12–15 Kids",
    intervals: "Weekdays",
    ourFocus: [
      "Creative Expression",
      "Phonics Foundations",
      "Confident Communication",
      "Fine Motor Control",
      "Imaginative Play",
    ],
    focus: "Language foundation and creative expression.",
    focusDetail:
      "With growing confidence, children at this stage begin to find their voice — both literally and creatively. Language emerges as a powerful tool for communication and connection, while art and music become windows into the child's unique inner world.",
    activities: [
      {
        name: "Pre-Writing Strokes",
        desc: "Structured exercises developing pencil grip, hand control, and fine motor precision — the essential foundations for writing readiness and academic confidence.",
      },
      {
        name: "Phonics Introduction",
        desc: "Systematic phonics exposure through songs, games, and hands-on letter activities that make reading an adventure rather than a task.",
      },
      {
        name: "Art & Music Exploration",
        desc: "Multi-sensory creative sessions fostering self-expression, aesthetic appreciation, and joyful discovery across visual art, rhythm, and movement.",
      },
    ],
    accentColor: "#FF7F50",
  },
  {
    stage: "Stage III",
    grade: "LKG",
    title: "Ready to Fly I",
    ages: "4–5 Years",
    icon: "🚀",
    image: "/curriculum/stage-3.png",
    imgPos: "center 50%",
    duration: "4–5 Hours",
    classSize: "15–18 Kids",
    intervals: "Weekdays",
    ourFocus: [
      "Reading Readiness",
      "Number Sense",
      "Inquiry & Curiosity",
      "Independent Thinking",
      "Collaborative Learning",
    ],
    focus: "Cognitive development and academic readiness.",
    focusDetail:
      "Children spread their wings as structured learning becomes purposeful and engaging. Cognitive abilities sharpen through inquiry-based activities that prepare young minds for the formal academic world ahead — building confidence alongside knowledge.",
    activities: [
      {
        name: "Formal Phonics",
        desc: "A progressive phonics curriculum building decoding skills, sight word recognition, and early reading fluency through structured, joyful practice.",
      },
      {
        name: "Number Recognition",
        desc: "Conceptual mathematics through manipulatives, patterns, and real-world number sense activities that make numeracy tangible and meaningful.",
      },
      {
        name: "Understanding Our World",
        desc: "Environmental science explorations that cultivate curiosity about nature, community, and the wider universe — the child's first steps into scientific thinking.",
      },
    ],
    accentColor: "#FF7F50",
    isReadyToFly: true,
  },
  {
    stage: "Stage IV",
    grade: "UKG",
    title: "Ready to Fly II",
    ages: "5–6 Years",
    icon: "🎓",
    image: "/curriculum/stage-4.png",
    imgPos: "center 68%",
    duration: "4–5 Hours",
    classSize: "15–20 Kids",
    intervals: "Weekdays",
    ourFocus: [
      "Independent Reading",
      "Sentence Construction",
      "Logical Reasoning",
      "School Readiness",
      "Leadership & Confidence",
    ],
    focus: "Advanced literacy, numeracy, and primary school transition.",
    focusDetail:
      "The culmination of the Little Millennium journey. Children emerge as confident, curious, and capable learners — fully prepared to take on the challenges and opportunities of primary school with grace, resilience, and enthusiasm.",
    activities: [
      {
        name: "Independent Reading",
        desc: "Building reading stamina and comprehension through levelled texts, library sessions, and guided reading circles that foster a genuine love of books.",
      },
      {
        name: "Sentence Construction",
        desc: "Structured writing activities developing grammatical awareness, narrative ability, and written communication — giving children a powerful voice on the page.",
      },
      {
        name: "Advanced Mathematical Operations",
        desc: "Problem-solving, basic arithmetic, and logical reasoning exercises that lay a strong foundation for mathematical excellence in primary school and beyond.",
      },
    ],
    accentColor: "#FF7F50",
    isReadyToFly: true,
  },
];

export default function CurriculumPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  // Mobile only: tap toggles the flip. Desktop is untouched — it flips on
  // CSS :hover (see globals.css) and this no-ops there.
  const toggleFlip = (i: number) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches
    ) {
      setFlipped((f) => ({ ...f, [i]: !f[i] }));
    }
  };

  useEffect(() => {
    if (isMobileViewport()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".curriculum-stage",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".curriculum-list",
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
      {/* Hero */}
      <section
        className="relative min-h-[40vh] sm:min-h-[45vh] flex items-end"
        style={{
          background:
            "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 60%, #FDFCF0 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,127,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,127,80,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full pt-28 sm:pt-32 pb-10 sm:pb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3 sm:mb-4">
            Our Curriculum
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 leading-tight">
            Four-Stage{" "}
            <span style={{ color: "#DC69FF" }}>Learning Path</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
            A purposefully designed developmental journey — from sensory roots
            to the soaring confidence of our{" "}
            <span className="text-[var(--accent-gold)] font-medium">
              Ready to Fly
            </span>{" "}
            graduates.
          </p>
        </div>
      </section>

      {/* Curriculum Stages — Detailed Vertical List */}
      <section className="section bg-[#FDFCF0] relative overflow-hidden">
        {/* Decorative bouncing balls — fill the gutters around the boxes */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <BouncingBalls
            numBalls={110}
            minRadius={5}
            maxRadius={18}
            speed={0.4}
            colors={[
              "rgba(255,127,80,0.45)",
              "rgba(247,183,51,0.45)",
              "rgba(42,168,196,0.40)",
              "rgba(240,108,168,0.40)",
              "rgba(155,123,212,0.40)",
              "rgba(123,196,127,0.42)",
            ]}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="curriculum-list flex flex-col gap-10">
            {stages.map((s, i) => (
              <div key={s.title} className="relative">
                <div
                  className="flip-card cursor-pointer md:cursor-default"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleFlip(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleFlip(i);
                    }
                  }}
                >
                <div
                  className={`flip-card-inner${
                    flipped[i] ? " is-flipped" : ""
                  }`}
                >
                <div
                  className="flip-card-front curriculum-stage relative rounded-2xl p-8 sm:p-10 overflow-hidden bg-white"
                  style={{
                    border: "1px solid rgba(255,127,80,0.3)",
                    boxShadow:
                      "0 14px 30px -12px rgba(255,127,80,0.18)",
                  }}
                >
                  {/* Background photo — focal-cropped so children's heads show */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                    style={{ objectPosition: s.imgPos }}
                  />
                  {/* Frosted wash — mutes the soft photo into an intentional
                      soft-focus backdrop while keeping the text crisp */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(253,252,240,0.5) 0%, rgba(253,252,240,0.4) 45%, rgba(253,252,240,0.56) 100%)",
                    }}
                  />

                  {/* Ambient glow */}
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
                    style={{ background: s.accentColor }}
                  />

                  <div className="relative z-10">
                  {/* Stage badge + Icon row */}
                  <div className="flex items-center gap-4 mb-7">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{
                        background: `${s.accentColor}15`,
                        border: `1px solid ${s.accentColor}30`,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <span
                        className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          background: `${s.accentColor}18`,
                          color: "#111111",
                        }}
                      >
                        {s.stage}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <h2
                          className="text-2xl sm:text-3xl font-bold"
                          style={{ color: "#111111" }}
                        >
                          {s.title}
                        </h2>
                        {s.isReadyToFly && (
                          <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[var(--accent-gold)]/10 text-[#111111] border border-[var(--accent-gold)]/20 font-semibold">
                            ✦ Ready to Fly
                          </span>
                        )}
                      </div>
                      <p className="text-[#111111] text-sm font-medium mt-0.5">
                        {s.grade} · {s.ages}
                      </p>
                    </div>
                  </div>

                  {/* Focus */}
                  <div className="mb-7">
                    <p className="text-[10px] uppercase tracking-widest text-[#111111] mb-2">
                      Focus
                    </p>
                    <p className="text-[#111111] font-semibold mb-2">
                      {s.focus}
                    </p>
                    <p className="text-[#111111] text-sm leading-relaxed">
                      {s.focusDetail}
                    </p>
                  </div>

                  {/* Key Activities */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#111111] mb-4">
                      Key Activities
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {s.activities.map((activity) => (
                        <div
                          key={activity.name}
                          className="rounded-xl p-4"
                          style={{
                            background: "rgba(255,255,255,0.92)",
                            border: `1px solid ${s.accentColor}30`,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: s.accentColor }}
                            />
                            <h4
                              className="text-sm font-semibold"
                              style={{ color: "#111111" }}
                            >
                              {activity.name}
                            </h4>
                          </div>
                          <p className="text-[#111111] text-xs leading-relaxed">
                            {activity.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hint — "Click" on phones, "Hover" on desktop */}
                  <p
                    className="mt-7 text-center text-[10px] uppercase tracking-[0.3em] font-semibold"
                    style={{ color: "#111111" }}
                  >
                    <span className="md:hidden">⤵ Click</span>
                    <span className="hidden md:inline">⤵ Hover</span>
                  </p>
                  </div>
                </div>

                {/* Flip back — Information + Our Focus */}
                <div
                  className="flip-card-back rounded-2xl p-6 sm:p-8 bg-white"
                  style={{
                    border: "1px solid rgba(255,127,80,0.3)",
                    boxShadow: "0 14px 30px -12px rgba(255,127,80,0.18)",
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 content-start h-full">
                    {/* Information */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#111111] mb-2">
                        Information
                      </h3>
                      <div
                        className="h-px mb-4"
                        style={{ background: `${s.accentColor}55` }}
                      />
                      <dl className="space-y-3.5">
                        {[
                          ["Age Group", s.ages],
                          ["Duration", s.duration],
                          ["Class Size", s.classSize],
                          ["Intervals", s.intervals],
                        ].map(([label, value]) => (
                          <div key={label}>
                            <dt className="text-sm text-[#111111]">
                              {label}
                            </dt>
                            <dd
                              className="text-sm font-semibold"
                              style={{ color: "#111111" }}
                            >
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    {/* Our Focus */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#111111] mb-2">
                        Our Focus
                      </h3>
                      <div
                        className="h-px mb-4"
                        style={{ background: `${s.accentColor}55` }}
                      />
                      <ul className="space-y-3">
                        {s.ourFocus.map((item) => (
                          <li
                            key={item}
                            className="text-sm text-[#111111] flex items-start gap-2"
                          >
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: s.accentColor }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                </div>
                </div>

                {/* Stage connector arrow */}
                {i < stages.length - 1 && (
                  <div className="flex flex-col items-center py-2 gap-0.5">
                    <div
                      className="w-px h-5"
                      style={{
                        background: `linear-gradient(to bottom, ${s.accentColor}40, transparent)`,
                      }}
                    />
                    <span
                      className="text-xs opacity-30"
                      style={{ color: s.accentColor }}
                    >
                      ↓
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
