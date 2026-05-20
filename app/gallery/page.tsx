"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";
import FolderGallery from "./FolderGallery";
import ExpandingGallery from "./ExpandingGallery";
import { VideoPlayer } from "./VideoPlayer";
import { ExpandableGallery } from "./ExpandableGallery";
import { isMobileViewport } from "@/components/mobile-reveal";

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
  id: number;
  category: string;
  label: string;
  span?: string;
  src?: string;
};

// "All" intentionally has no entries — to be populated separately.
const galleryItems: GalleryItem[] = [
  { id: 1, category: "Classroom", label: "Atelier & Discovery Area", src: "/gallery/classroom-1.png" },
  { id: 2, category: "Classroom", label: "Bee the Best You Can Bee", src: "/gallery/classroom-2.png" },
  { id: 3, category: "Classroom", label: "Blocks & Loose Parts", src: "/gallery/classroom-3.png" },
  { id: 4, category: "Playgrounds", label: "Outdoor Art Wall", src: "/gallery/playground-1.png" },
  { id: 5, category: "Playgrounds", label: "Hopscotch Garden", src: "/gallery/playground-2.png" },
  { id: 6, category: "Playgrounds", label: "Alphabet Courtyard", src: "/gallery/playground-3.png" },
  { id: 7, category: "Washrooms / Lavatories", label: "Pastel Stalls", src: "/gallery/washroom-1.png" },
  { id: 8, category: "Washrooms / Lavatories", label: "Blue Tile Washroom", src: "/gallery/washroom-2.png" },
  { id: 9, category: "Washrooms / Lavatories", label: "Sage Tile Washroom", src: "/gallery/washroom-3.png" },
];

// Third tab intentionally blank — to be named later.
const categories = ["All", "Classroom", "Playgrounds", "Washrooms / Lavatories", ""];

export default function GalleryPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const visibleItems =
    activeCategory === "All"
      ? galleryItems.filter((item) => item.category === "All")
      : galleryItems.filter((item) => item.category === activeCategory);

  const folderData = [
    { label: "Classrooms", category: "Classroom" },
    { label: "Playgrounds", category: "Playgrounds" },
    { label: "Washrooms / Lavatories", category: "Washrooms / Lavatories" },
  ].map((f) => ({
    title: f.label,
    projects: galleryItems
      .filter((item) => item.category === f.category)
      .map((item) => ({ id: String(item.id), image: item.src ?? "", title: item.label })),
  }));

  useEffect(() => {
    // Mobile: pure CSS handles the reveal animation (replays via key change on filter).
    if (isMobileViewport()) return;

    // The "All" view renders FolderGallery instead of .gallery-item cards —
    // skip GSAP when there are no targets so it doesn't log "target not found".
    if (activeCategory === "All") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative min-h-[40vh] sm:min-h-[45vh] flex items-end" style={{ background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 60%, #FDFCF0 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,127,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,127,80,1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full pt-28 sm:pt-32 pb-10 sm:pb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3 sm:mb-4">Gallery</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 leading-tight">
            Memories in{" "}
            <span style={{ color: "#FFF926" }}>Motion</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl leading-relaxed">
            A visual journey through the vibrant life at Little Millennium—classrooms, celebrations, creativity, and community.
          </p>
        </div>
      </section>

      {/* Filter — desktop only; hidden on phones */}
      <section className="hidden md:block bg-[#FDFCF0] py-4 sm:py-8 sticky top-[96px] md:top-[134px] z-20 border-b border-[#FF7F50]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex gap-2 sm:gap-3 flex-nowrap overflow-x-auto sm:flex-wrap">
          {categories.map((cat, i) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat || `cat-${i}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-colors min-w-[3rem] ${
                  isActive
                    ? "bg-[#FF7F50] text-white border-[#FF7F50]"
                    : "border-[#FF7F50]/30 text-[#333333] hover:bg-[#FF7F50] hover:text-white hover:border-[#FF7F50]"
                }`}
              >
                {cat || " "}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="section bg-[#FDFCF0]">
        <div className="max-w-7xl mx-auto">
          {activeCategory === "All" ? (
            <div className="flex flex-col gap-20 md:gap-28">
              <ExpandingGallery />
              <div className="max-w-4xl mx-auto w-full px-4">
                <VideoPlayer
                  thumbnailUrl="/gallery/playground-1.png"
                  videoUrl="/WhatsApp%20Video%202026-05-15%20at%2023.03.56.mp4"
                  title="A Day at Little Millennium"
                  description="Step inside our campuses — learning, play and joy."
                  aspectRatio="16/9"
                />
              </div>
              <FolderGallery folders={folderData} />
              <ExpandableGallery />
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#FF7F50]/40 bg-white px-6 py-20 text-center">
              <p className="text-[#FF7F50] text-xs uppercase tracking-[0.3em] font-semibold mb-3">
                Coming Soon
              </p>
              <p className="text-[#333333] text-lg font-semibold mb-1">
                Photos are on the way.
              </p>
              <p className="text-[#6B6963] text-sm max-w-md mx-auto">
                This section will be filled in shortly.
              </p>
            </div>
          ) : (
            <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className={`gallery-item relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer ${item.span ?? ""}`}
                  style={{ background: "#FAF5E8" }}
                >
                  {item.src && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.src}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF7F50]/90 via-[#FF7F50]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-[10px] uppercase tracking-widest mb-1">
                      {item.category}
                    </p>
                    <p className="text-white text-sm font-medium">
                      {item.label}
                    </p>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/85 backdrop-blur-sm border border-[#FF7F50]/30">
                    <p className="text-[10px] text-[#FF7F50] uppercase tracking-wider font-semibold">
                      {item.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
