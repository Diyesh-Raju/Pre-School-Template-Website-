"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isMobileViewport } from "@/components/mobile-reveal";

const reviews = [
  {
    name: "Ashwini Rajesh",
    tag: "Poorna Pragna Campus",
    time: "3 months ago",
    text: "The teachers and staff put in a lot of effort to make learning joyful for kids. They treat every child with care and affection. It truly feels like a second home\u2728",
    stars: 5,
  },
  {
    name: "Poornima Kulkarni",
    tag: "Poorna Pragna Campus",
    time: "3 months ago",
    text: "My daughter Poorvi has been a part of Little Millennium since playgroup. Now she is in LKG and it\u2019s been such a wonderful journey. She started off as a shy girl who would just observe other kids and teachers but has beautifully opened up.",
    stars: 5,
  },
  {
    name: "Deepashree V",
    tag: "Poorna Pragna Campus",
    time: "A month ago",
    text: "A wonderfully well-structured play school! My nephew has shown remarkable improvement in all areas after joining here. The School Day and Sports Day were thoughtfully planned and executed flawlessly.",
    stars: 5,
  },
  {
    name: "Mohan BS",
    tag: "Poorna Pragna Campus",
    time: "7 months ago",
    text: "Hats off to the team Little Millennium! Highly qualified, experienced and very professional teaching faculty and efficient support staff. Both my grandchildren study here and are performing very well.",
    stars: 5,
  },
  {
    name: "Rohit Reddy",
    tag: "Poorna Pragna Campus",
    time: "2 years ago",
    text: "They celebrate each and every festival which gives a better idea to children. They are the best in covering both academics and extracurriculars. The Science fair activity was really good!",
    stars: 5,
  },
  {
    name: "Anjana Suresh",
    tag: "Vijaya Bank Campus",
    time: "A month ago",
    text: "Little Millennium provides a wonderful learning experience. Ayana's communication and confidence increased after joining here. Teachers are very creative and maintain a very well balance in play and learn.",
    stars: 5,
  },
  {
    name: "Bhavana Deepak",
    tag: "Vijaya Bank Campus",
    time: "A month ago",
    text: "Extremely happy with Teacher Geetha's dedication and teaching. She handles children with great patience and affection while encouraging learning through play. A true asset to the nursery.",
    stars: 5,
  },
  {
    name: "Vijayalakshmi Bv",
    tag: "Vijaya Bank Campus",
    time: "A month ago",
    text: "One of the best preschools. Principal and teachers are friendly, hardworking, and take good care of children. Especially the cultural activities and annual day events are magnificent.",
    stars: 5,
  },
  {
    name: "R prathiba Pradeep",
    tag: "Vijaya Bank Campus",
    time: "A year ago",
    text: "One of the best preschools I have witnessed. It's just like another home for kids with such loving teachers, friendly environment, and support staff who patiently deal with every child.",
    stars: 5,
  },
  {
    name: "Deepika Mohanty",
    tag: "Vijaya Bank Campus",
    time: "A year ago",
    text: "An outstanding choice for early childhood education, offering a nurturing, restorative, and engaging environment where children flourish and develop a love towards learning.",
    stars: 5,
  },
];

// Duplicate for seamless loop
const allReviews = [...reviews, ...reviews];

export default function ReviewsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Mobile: pure CSS marquee via .lm-marquee-track class (already on the element).
    // No JS needed — CSS @keyframes lmMarqueeSlide handles the loop.
    if (isMobileViewport()) return;

    // Desktop: GSAP-driven marquee (unchanged behavior)
    const totalWidth = track.scrollWidth / 2;

    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
      force3D: true,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();
    track.parentElement?.addEventListener("mouseenter", pause);
    track.parentElement?.addEventListener("mouseleave", resume);

    return () => {
      tweenRef.current?.kill();
      track.parentElement?.removeEventListener("mouseenter", pause);
      track.parentElement?.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="section overflow-hidden" style={{ background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 50%, #FDFCF0 100%)" }}>
      <div className="max-w-7xl mx-auto mb-12 px-4 sm:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">
            Parent Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            What Families{" "}
            <span className="gradient-text">Say</span>
          </h2>
        </div>
      </div>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FDFCF0] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FDFCF0] to-transparent z-10 pointer-events-none" />

        <div className="flex lm-marquee-track" ref={trackRef} style={{ width: "max-content" }}>
          {allReviews.map((review, i) => (
            <div
              key={i}
              className="bg-white border border-[#FF7F50]/25 rounded-2xl p-6 mx-3 flex flex-col gap-4 shrink-0 shadow-sm"
              style={{ width: "340px" }}
            >
              {/* Google badge + Stars */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <span key={s} className="text-[#FF7F50] text-sm">★</span>
                  ))}
                </div>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>

              {/* Quote */}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-[#FF7F50]/15 pt-4">
                <div className="w-9 h-9 rounded-full bg-[#FF7F50]/10 border border-[#FF7F50]/30 flex items-center justify-center text-[#FF7F50] font-bold text-sm shrink-0">
                  {review.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#333333] text-sm font-medium">
                    {review.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="bg-[#FF7F50]/10 border border-[#FF7F50]/25 rounded-full px-3 py-1 text-xs text-[#FF7F50] font-medium">
                      {review.tag}
                    </span>
                    <span className="text-[#6B6963] text-xs">{review.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
