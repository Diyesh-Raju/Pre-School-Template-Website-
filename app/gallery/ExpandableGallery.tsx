"use client";

// 21st.dev template, adapted to this codebase:
// - @hugeicons → lucide-react (hugeicons isn't installed)
// - @/components/ui/button → a plain on-brand button (no shadcn here)
// - next/image → plain <img> (matches the codebase's external-image convention)
// - shadcn theme tokens (bg-background/text-foreground/…) → site palette
// - placeholder dev-marketing copy → preschool-appropriate copy
// Images are still the template's Unsplash placeholders — swap for real photos.

import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import React, { useState, useId, useRef } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Photo = {
  id: string;
  src: string;
  alt: string;
  rotation?: number;
  x?: number;
  y?: number;
  zIndex?: number;
};

const PHOTOS: Photo[] = [
  {
    id: "photo-1",
    src: "/gallery/classroom-1.png",
    alt: "Atelier & Discovery Area",
    rotation: -15,
    x: -90,
    y: 10,
    zIndex: 10,
  },
  {
    id: "photo-2",
    src: "/gallery/classroom-2.png",
    alt: "Bee the Best You Can Bee",
    rotation: -3,
    x: -10,
    y: -15,
    zIndex: 20,
  },
  {
    id: "photo-3",
    src: "/gallery/classroom-3.png",
    alt: "Blocks & Loose Parts",
    rotation: 12,
    x: 75,
    y: 5,
    zIndex: 30,
  },
  {
    id: "photo-4",
    src: "/gallery/playground-1.png",
    alt: "Outdoor Art Wall",
  },
  {
    id: "photo-5",
    src: "/gallery/playground-2.png",
    alt: "Hopscotch Garden",
  },
  {
    id: "photo-6",
    src: "/gallery/playground-3.png",
    alt: "Alphabet Courtyard",
  },
  {
    id: "photo-7",
    src: "/gallery/washroom-1.png",
    alt: "Pastel Stalls",
  },
  {
    id: "photo-8",
    src: "/gallery/washroom-2.png",
    alt: "Blue Tile Washroom",
  },
  {
    id: "photo-9",
    src: "/gallery/washroom-3.png",
    alt: "Sage Tile Washroom",
  },
];

const transition = {
  type: "spring",
  stiffness: 160,
  damping: 18,
  mass: 1,
} as const;

export function ExpandableGallery() {
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutGroupId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    if (isExpanded) setIsExpanded(false);
  });

  return (
    <section className="relative w-full px-4 md:px-8 flex flex-col items-center justify-start min-h-[850px] overflow-hidden">
      <LayoutGroup id={layoutGroupId}>
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-full h-12 flex items-center justify-between px-4 mb-2">
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  key="back-button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-2 transition-all group z-50"
                >
                  <div
                    className="p-2 rounded-full transition-colors"
                    style={{ background: "rgba(255,127,80,0.12)", color: "#FF7F50" }}
                  >
                    <ArrowLeft width={20} height={20} />
                  </div>
                  <span className="font-medium text-[#6B6963] group-hover:text-[#333333]">
                    Go back
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            ref={containerRef}
            layout
            className={cn(
              "relative w-full",
              isExpanded
                ? "grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4"
                : "flex flex-col items-center justify-start pt-4"
            )}
            transition={transition}
          >
            <div
              className={cn(
                "relative",
                isExpanded
                  ? "contents"
                  : "h-[450px] w-full flex items-center justify-center mb-8"
              )}
            >
              {PHOTOS.map((photo, index) => {
                const isPrimary = index < 3;
                if (!isPrimary && !isExpanded) return null;

                return (
                  <motion.div
                    key={`card-${photo.id}`}
                    layoutId={`card-container-${photo.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: !isExpanded ? photo.rotation || 0 : 0,
                      x: !isExpanded ? photo.x || 0 : 0,
                      y: !isExpanded ? photo.y || 0 : 0,
                      zIndex: !isExpanded ? photo.zIndex || index : 10,
                    }}
                    transition={transition}
                    whileHover={
                      !isExpanded
                        ? {
                            scale: 1.05,
                            y: (photo.y || 0) - 15,
                            rotate: (photo.rotation || 0) * 0.8,
                            zIndex: 50,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            },
                          }
                        : { scale: 1.02 }
                    }
                    className={cn(
                      "cursor-pointer overflow-hidden bg-[#FAF5E8]",
                      isExpanded
                        ? "relative aspect-square rounded-[2rem] md:rounded-[3rem] border-4 md:border-[6px] border-white shadow-lg"
                        : "absolute w-44 h-44 md:w-60 md:h-60 rounded-[2.5rem] md:rounded-[3rem] border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                    )}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                  >
                    <motion.div
                      layoutId={`image-inner-${photo.id}`}
                      layout="position"
                      className="w-full h-full relative"
                      transition={transition}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        draggable={false}
                        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  key="stack-content"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center max-w-2xl space-y-8"
                >
                  <h2 className="text-2xl md:text-4xl font-normal tracking-tight text-[#333333] leading-tight">
                    Little moments, big memories.{" "}
                    <br className="hidden md:block" />
                    A glimpse into everyday life at Little Millennium.
                  </h2>

                  <div className="flex justify-center">
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="inline-flex items-center gap-2 rounded-full cursor-pointer py-4 px-8 font-medium text-white transition-transform hover:-translate-y-0.5 group"
                      style={{
                        background: "#FF7F50",
                        boxShadow: "0 10px 22px rgba(255,127,80,0.3)",
                      }}
                    >
                      Explore the gallery
                      <ArrowRight
                        className="transition-transform group-hover:translate-x-1"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </LayoutGroup>
    </section>
  );
}

export default ExpandableGallery;
