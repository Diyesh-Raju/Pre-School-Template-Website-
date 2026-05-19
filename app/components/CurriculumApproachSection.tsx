"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isMobileViewport } from "@/components/mobile-reveal";

gsap.registerPlugin(ScrollTrigger);

type Petal = {
  title: string;
  image: string;
  desc: string;
  color: string;
};

const petals: Petal[] = [
  {
    title: "Cognitive Skills",
    image:
      "https://www.littlemillennium.com/wp-content/uploads/Home_Flip_Images/cognitiveSkills.png",
    desc: "Building strong memory foundations for learning, concentration, understanding, speaking, reading, and problem-solving skills, enabling children to become confident communicators.",
    color: "#F9B48A",
  },
  {
    title: "Language Skills",
    image:
      "https://www.littlemillennium.com/wp-content/uploads/Home_Flip_Images/languageSkill.png",
    desc: "Building strong foundations in listening, speaking, reading, and writing to help children become confident communicators.",
    color: "#7BC4E8",
  },
  {
    title: "Life Skills",
    image:
      "https://www.littlemillennium.com/wp-content/uploads/Home_Flip_Images/lifeSkill.png",
    desc: "Developing essential abilities for daily living, including self-care, decision-making, financial literacy, and adaptability to new situations.",
    color: "#82C896",
  },
  {
    title: "Socio-Emotional Skills",
    image:
      "https://www.littlemillennium.com/wp-content/uploads/Home_Flip_Images/socialEmotional.png",
    desc: "Nurturing emotional intelligence, empathy, relationship building, self-awareness, and responsible decision-making for positive social interactions.",
    color: "#F4A6BD",
  },
  {
    title: "Nurturing Individuals",
    image:
      "https://www.littlemillennium.com/wp-content/uploads/Home_Flip_Images/nurturingIndividuals.png",
    desc: "Fostering individual growth and development through personalized attention and care.",
    color: "#B89BD3",
  },
  {
    title: "Fine Motor Skills",
    image:
      "https://www.littlemillennium.com/wp-content/uploads/Home_Flip_Images/fineMotorSkila.png",
    desc: "Developing precise hand and finger movements for writing, drawing, and detailed tasks.",
    color: "#F4D58D",
  },
  {
    title: "Thinking Skills",
    image:
      "https://www.littlemillennium.com/wp-content/uploads/Home_Flip_Images/thinkingSkill.png",
    desc: "Enhancing critical thinking, problem-solving, and analytical abilities for better decision making.",
    color: "#6FB8B5",
  },
  {
    title: "Gross Motor Skills",
    image:
      "https://www.littlemillennium.com/wp-content/uploads/Home_Flip_Images/grossMotor.png",
    desc: "Building strength, coordination, and balance through physical activities and movement.",
    color: "#F08A7F",
  },
  {
    title: "Universal Values",
    image:
      "https://www.littlemillennium.com/wp-content/uploads/Home_Flip_Images/universalValues.png",
    desc: "Instilling core values of respect, kindness, honesty, and responsibility in young minds.",
    color: "#A8C99A",
  },
  {
    title: "Personal Awareness",
    image:
      "https://www.littlemillennium.com/wp-content/uploads/Home_Flip_Images/personalAwareness.png",
    desc: "Developing self-understanding, confidence, and personal identity through guided reflection.",
    color: "#E8A88F",
  },
];

export default function CurriculumApproachSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Track scroll position so the arrow buttons can disable at the strip ends.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setCanScrollLeft(track.scrollLeft > 4);
      setCanScrollRight(
        track.scrollLeft + track.clientWidth < track.scrollWidth - 4
      );
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    // Mobile reveal handled by ScrollTriggerInit + globals.css `.is-revealed` toggle.
    if (isMobileViewport()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".petal-intro",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".petal-intro",
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        }
      );

      gsap.fromTo(
        ".petal-mascot",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".petal-mascot",
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        }
      );

      gsap.fromTo(
        ".petal-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".petal-carousel",
            start: "top 88%",
            toggleActions: "restart none none reset",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".petal-card");
    if (!card) return;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "20") || 20;
    const step = card.offsetWidth + gap;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        background:
          "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 50%, #FDFCF0 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading + mascot */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-16 lg:mb-20">
          <div className="petal-intro">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-[1.15]">
              A Scientifically Designed,
              <br />
              <span className="gradient-text">Play-Based Curriculum</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-xl">
              The Seven Petal Approach is our proprietary learning method that
              supports holistic development, language, logic, creativity,
              physical movement, social-emotional learning, and more, all
              through structured play.
            </p>
          </div>

          {/* Mascot block */}
          <div className="petal-mascot relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Soft yellow blob */}
              <div
                className="absolute inset-0 rounded-[55%] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 55% 60%, #FFE2A8 0%, rgba(255,226,168,0.35) 55%, transparent 75%)",
                  transform: "scale(1.05)",
                }}
              />

              {/* Floating balloons */}
              <div
                className="petal-balloons absolute z-10"
                style={{ top: "8%", left: "6%" }}
              >
                <div className="relative flex items-end gap-1.5">
                  <div className="flex flex-col items-center">
                    <span
                      className="w-7 h-9 rounded-full block"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 30%, #FFE16E, #FFC23A)",
                        boxShadow: "0 6px 14px -4px rgba(255,194,58,0.45)",
                      }}
                    />
                    <span className="w-px h-8 bg-[#6B6963]/40" />
                  </div>
                  <div className="flex flex-col items-center -mb-2">
                    <span
                      className="w-7 h-9 rounded-full block"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 30%, #FFB375, #FF7F50)",
                        boxShadow: "0 6px 14px -4px rgba(255,127,80,0.45)",
                      }}
                    />
                    <span className="w-px h-10 bg-[#6B6963]/40" />
                  </div>
                </div>
              </div>

              {/* Mascot */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.littlemillennium.com/wp-content/uploads/2025/09/homeimage.png"
                alt="Little Millennium mascot — a friendly deer with a painter's palette"
                className="petal-bob relative w-full h-auto select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Horizontal carousel: arrow · strip · arrow */}
        <div className="petal-carousel flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous skills"
            className="petal-arrow shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#FF7F50]/35 text-[#FF7F50] shadow-md shadow-[#FF7F50]/15 flex items-center justify-center hover:bg-[#FF7F50] hover:text-white hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#FF7F50] disabled:hover:scale-100"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </button>

          <div
            ref={trackRef}
            className="petal-track flex-1 flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory py-4 -mx-1 px-1"
          >
            {petals.map((p) => (
              <FlipCard key={p.title} petal={p} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Next skills"
            className="petal-arrow shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#FF7F50]/35 text-[#FF7F50] shadow-md shadow-[#FF7F50]/15 flex items-center justify-center hover:bg-[#FF7F50] hover:text-white hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#FF7F50] disabled:hover:scale-100"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

function FlipCard({ petal }: { petal: Petal }) {
  const [flipped, setFlipped] = useState(false);

  // Mobile only: tap toggles the flip (and toggles back on every tap).
  // Desktop is untouched — it keeps the CSS :hover flip and this no-ops.
  const handleClick = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches
    ) {
      setFlipped((f) => !f);
    }
  };

  return (
    <div
      className="petal-card shrink-0 snap-start w-[220px] sm:w-[250px] md:w-[270px]"
      tabIndex={0}
      onClick={handleClick}
    >
      {/* Perspective wrapper — NOT a GSAP target, so 3D space is never flattened. */}
      <div
        className="petal-flip-wrap h-[300px] sm:h-[320px]"
        style={{
          perspective: "1200px",
          WebkitPerspective: "1200px",
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
      >
        <div
          className={`petal-card-inner relative w-full h-full rounded-2xl${
            flipped ? " is-flipped" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col p-4 sm:p-5"
            style={{
              background: petal.color,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              boxShadow: `0 18px 36px -16px ${petal.color}`,
            }}
          >
            <h3 className="relative z-10 text-base sm:text-lg md:text-xl font-bold text-[#1a1a1a] leading-tight">
              {petal.title}
            </h3>
            {/* Decorative cloud */}
            <span
              aria-hidden
              className="absolute top-3 right-3 w-10 h-5 rounded-full bg-white/85"
            />
            <span
              aria-hidden
              className="absolute top-2 right-8 w-5 h-5 rounded-full bg-white/85"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={petal.image}
              alt=""
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] max-h-[72%] object-contain pointer-events-none select-none"
              draggable={false}
              loading="lazy"
            />
          </div>

          {/* Back face — rotateY(180deg) means content was authored mirrored;
             when the inner flips 180deg the back composes to 360deg (= 0deg)
             so the title and description read normally. */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-5 text-center"
            style={{
              background: petal.color,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              WebkitTransform: "rotateY(180deg)",
              boxShadow: `0 18px 36px -16px ${petal.color}`,
            }}
          >
            <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-3">
              {petal.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#1a1a1a]/85 leading-relaxed">
              {petal.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
