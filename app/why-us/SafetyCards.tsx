"use client";

import { useState } from "react";

// Cards 1–3 are verbatim from littlemillennium.com/why-us (the only ones
// visible in the reference). Cards 4–6 (sanitization, trained staff, child-safe
// spaces) are on-brand copy in the same tone — the live site serves these as
// baked-in images so the exact text could not be extracted.
const cards = [
  {
    icon: "📋",
    title: "Regular Safety Audits & Operational Checks",
    desc: "Routine inspections help us maintain the highest standards across all locations.",
    color: "#8FD19E",
  },
  {
    icon: "🔐",
    title: "Secure Access & Child Pick-Up Systems",
    desc: "Children are only handed over to authorized guardians for added security.",
    color: "#F2D58B",
  },
  {
    icon: "📹",
    title: "CCTV Surveillance in Every Center",
    desc: "Real-time monitoring ensures transparency and peace of mind for parents.",
    color: "#F0A78A",
  },
  {
    icon: "🧼",
    title: "Daily Sanitization & Hygiene",
    desc: "Classrooms, toys, and surfaces are cleaned and sanitized regularly to keep children healthy.",
    color: "#9CC9E8",
  },
  {
    icon: "👩‍🏫",
    title: "Trained & Background-Verified Staff",
    desc: "Every educator is carefully vetted and trained in child safety and first aid.",
    color: "#C9B6E4",
  },
  {
    icon: "🧸",
    title: "Child-Safe Spaces & Equipment",
    desc: "Rounded edges, safe materials, and age-appropriate play areas designed for little explorers.",
    color: "#F3B0C3",
  },
];

const PER_PAGE = 3;

export function SafetyCards() {
  const pages = Math.ceil(cards.length / PER_PAGE);
  const [page, setPage] = useState(0);
  const go = (p: number) => setPage(((p % pages) + pages) % pages);

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            width: `${pages * 100}%`,
            transform: `translateX(-${page * (100 / pages)}%)`,
          }}
        >
          {Array.from({ length: pages }).map((_, p) => (
            <div
              key={p}
              className="shrink-0"
              style={{ width: `${100 / pages}%` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-1">
                {cards
                  .slice(p * PER_PAGE, p * PER_PAGE + PER_PAGE)
                  .map((card) => (
                    <div
                      key={card.title}
                      className="rounded-[1.75rem] p-5 sm:p-6 flex flex-col h-full"
                      style={{ background: card.color }}
                    >
                      <div className="rounded-2xl h-40 sm:h-44 mb-5 flex items-center justify-center bg-white/35 text-[3.25rem] select-none">
                        {card.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#2a2a2a] leading-snug">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#333333]/85">
                        {card.desc}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls — dots + an arrow to advance to the next set */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex gap-2">
          {Array.from({ length: pages }).map((_, p) => (
            <button
              key={p}
              onClick={() => go(p)}
              aria-label={`Go to slide ${p + 1}`}
              className="h-2.5 rounded-full transition-all"
              style={{
                width: p === page ? "1.75rem" : "0.625rem",
                background: p === page ? "#FF7F50" : "rgba(255,127,80,0.35)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(page + 1)}
          aria-label="Next safety features"
          className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105"
          style={{
            border: "1px solid rgba(255,127,80,0.45)",
            color: "#FF7F50",
            background: "rgba(255,127,80,0.06)",
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
