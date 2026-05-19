"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  forwardRef,
} from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FolderImage = { id: string; image: string; title: string };
export type FolderData = { title: string; projects: FolderImage[] };

interface ProjectCardProps {
  image: string;
  title: string;
  delay: number;
  isVisible: boolean;
  index: number;
  totalCount: number;
  onClick: () => void;
  isSelected: boolean;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, title, delay, isVisible, index, totalCount, onClick, isSelected }, ref) => {
    const middleIndex = (totalCount - 1) / 2;
    const factor = totalCount > 1 ? (index - middleIndex) / middleIndex : 0;
    const rotation = factor * 25;
    const translationX = factor * 85;
    const translationY = Math.abs(factor) * 12;

    return (
      <div
        ref={ref}
        className={cn("absolute w-20 h-28 cursor-pointer group/card", isSelected && "opacity-0")}
        style={{
          transform: isVisible
            ? `translateY(calc(-100px + ${translationY}px)) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
            : "translateY(0px) translateX(0px) rotate(0deg) scale(0.4)",
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
          transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          zIndex: 10 + index,
          left: "-40px",
          top: "-56px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <div
          className={cn(
            "w-full h-full rounded-lg overflow-hidden shadow-xl bg-white border border-[#FF7F50]/25 relative",
            "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover/card:-translate-y-6 group-hover/card:shadow-2xl group-hover/card:shadow-[#FF7F50]/40 group-hover/card:ring-2 group-hover/card:ring-[#FF7F50] group-hover/card:scale-125"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/70 via-[#333333]/10 to-transparent" />
          <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-black uppercase tracking-tighter text-white truncate drop-shadow-md">
            {title}
          </p>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

interface ImageLightboxProps {
  projects: FolderImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  sourceRect: DOMRect | null;
  onCloseComplete?: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  projects,
  currentIndex,
  isOpen,
  onClose,
  sourceRect,
  onCloseComplete,
  onNavigate,
}) => {
  const [animationPhase, setAnimationPhase] = useState<"initial" | "animating" | "complete">(
    "initial"
  );
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const totalProjects = projects.length;
  const hasNext = currentIndex < totalProjects - 1;
  const hasPrev = currentIndex > 0;
  const currentProject = projects[currentIndex];

  const navigateNext = useCallback(() => {
    if (currentIndex >= totalProjects - 1) return;
    onNavigate(currentIndex + 1);
  }, [currentIndex, totalProjects, onNavigate]);

  const navigatePrev = useCallback(() => {
    if (currentIndex <= 0) return;
    onNavigate(currentIndex - 1);
  }, [currentIndex, onNavigate]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    onClose();
    setTimeout(() => {
      setIsClosing(false);
      setShouldRender(false);
      setAnimationPhase("initial");
      onCloseComplete?.();
    }, 500);
  }, [onClose, onCloseComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") navigateNext();
      if (e.key === "ArrowLeft") navigatePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose, navigateNext, navigatePrev]);

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      // Drives a multi-phase open animation off the source-rect prop;
      // cascading setStates here are intentional (initial → animating → complete).
      /* eslint-disable react-hooks/set-state-in-effect */
      setShouldRender(true);
      setAnimationPhase("initial");
      setIsClosing(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationPhase("animating");
        });
      });
      const timer = setTimeout(() => {
        setAnimationPhase("complete");
      }, 700);
      /* eslint-enable react-hooks/set-state-in-effect */
      return () => clearTimeout(timer);
    }
  }, [isOpen, sourceRect]);

  const handleDotClick = (idx: number) => {
    if (idx === currentIndex) return;
    onNavigate(idx);
  };

  if (!shouldRender || !currentProject) return null;

  const getInitialStyles = (): React.CSSProperties => {
    if (!sourceRect) return {};
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetWidth = Math.min(800, viewportWidth - 64);
    const targetHeight = Math.min(viewportHeight * 0.85, 600);
    const targetX = (viewportWidth - targetWidth) / 2;
    const targetY = (viewportHeight - targetHeight) / 2;
    const scaleX = sourceRect.width / targetWidth;
    const scaleY = sourceRect.height / targetHeight;
    const scale = Math.max(scaleX, scaleY);
    const translateX =
      sourceRect.left + sourceRect.width / 2 - (targetX + targetWidth / 2) + window.scrollX;
    const translateY =
      sourceRect.top + sourceRect.height / 2 - (targetY + targetHeight / 2) + window.scrollY;
    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      opacity: 0.5,
      borderRadius: "12px",
    };
  };

  const getFinalStyles = (): React.CSSProperties => ({
    transform: "translate(0, 0) scale(1)",
    opacity: 1,
    borderRadius: "24px",
  });

  const currentStyles =
    animationPhase === "initial" && !isClosing ? getInitialStyles() : getFinalStyles();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={handleClose}
      style={{
        opacity: isClosing ? 0 : 1,
        transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="absolute inset-0 bg-[#FDFCF0]/92 backdrop-blur-2xl"
        style={{
          opacity: animationPhase === "initial" && !isClosing ? 0 : 1,
          transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Top-left Back button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className="absolute top-6 left-6 z-50 inline-flex items-center gap-2 h-12 px-4 rounded-full bg-[#FF7F50] text-white shadow-lg shadow-[#FF7F50]/30 hover:bg-[#FF9974] transition-colors"
        style={{
          opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
          transform:
            animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(-30px)",
          transition:
            "opacity 400ms ease-out 400ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms, background-color 200ms ease",
        }}
      >
        <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        <span className="text-xs uppercase tracking-widest font-bold">Back</span>
      </button>

      {/* Prev arrow — only visible when a previous picture exists */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigatePrev();
        }}
        disabled={!hasPrev}
        aria-label="Previous photo"
        className="absolute left-4 md:left-10 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-white border border-[#FF7F50]/30 text-[#FF7F50] shadow-lg shadow-[#FF7F50]/15 hover:bg-[#FF7F50] hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasPrev ? 1 : 0,
          transform:
            animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(-40px)",
          transition:
            "opacity 400ms ease-out 600ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 600ms",
        }}
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={3} />
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigateNext();
        }}
        disabled={!hasNext}
        aria-label="Next photo"
        className="absolute right-4 md:right-10 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-white border border-[#FF7F50]/30 text-[#FF7F50] shadow-lg shadow-[#FF7F50]/15 hover:bg-[#FF7F50] hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
        style={{
          opacity: animationPhase === "complete" && !isClosing && hasNext ? 1 : 0,
          transform:
            animationPhase === "complete" && !isClosing ? "translateX(0)" : "translateX(40px)",
          transition:
            "opacity 400ms ease-out 600ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 600ms",
        }}
      >
        <ChevronRight className="w-6 h-6" strokeWidth={3} />
      </button>

      <div
        className="relative z-10 w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          ...currentStyles,
          transform: isClosing ? "translate(0, 0) scale(0.92)" : currentStyles.transform,
          transition:
            animationPhase === "initial" && !isClosing
              ? "none"
              : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out, border-radius 700ms ease",
          transformOrigin: "center center",
        }}
      >
        <div className="relative overflow-hidden rounded-[inherit] bg-white border border-[#FF7F50]/30 shadow-[0_35px_60px_-15px_rgba(255,127,80,0.30)]">
          <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10]">
            <div
              className="flex w-full h-full"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="min-w-full h-full relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover select-none"
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className="px-8 py-7 bg-white border-t border-[#FF7F50]/15"
            style={{
              opacity: animationPhase === "complete" && !isClosing ? 1 : 0,
              transform:
                animationPhase === "complete" && !isClosing ? "translateY(0)" : "translateY(40px)",
              transition:
                "opacity 500ms ease-out 500ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 500ms",
            }}
          >
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-[#333333] tracking-tight truncate">
                  {currentProject?.title}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF5E8] rounded-full border border-[#FF7F50]/20">
                    {projects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        aria-label={`Go to photo ${idx + 1}`}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-500",
                          idx === currentIndex
                            ? "bg-[#FF7F50] scale-150"
                            : "bg-[#6B6963]/30 hover:bg-[#6B6963]/60"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6B6963]">
                    {currentIndex + 1} / {totalProjects}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AnimatedFolderProps {
  title: string;
  projects: FolderImage[];
  index: number;
}

// Per-folder colour themes + decoration. 0 → paws, 1 → butterflies, 2 → stars.
const folderThemes = [
  {
    icon: "🐾",
    back: "linear-gradient(135deg, #6FC3DF 0%, #3FA9C9 100%)",
    tab: "#2E8FB0",
    front: "linear-gradient(135deg, #4FB3D4 0%, #2E8FB0 100%)",
  },
  {
    icon: "🦋",
    back: "linear-gradient(135deg, #F6A5C8 0%, #EE7AAE 100%)",
    tab: "#D85C92",
    front: "linear-gradient(135deg, #F08DBC 0%, #D85C92 100%)",
  },
  {
    icon: "⭐",
    back: "linear-gradient(135deg, #B79CE3 0%, #9A77D6 100%)",
    tab: "#7E59C0",
    front: "linear-gradient(135deg, #A684DD 0%, #7E59C0 100%)",
  },
];

// Scatter positions for the three decoration glyphs on the folder front.
const decoSpots = [
  { top: "12%", left: "10%", size: "1.9rem", rotate: "-14deg" },
  { top: "40%", left: "56%", size: "2.8rem", rotate: "12deg" },
  { top: "62%", left: "22%", size: "1.6rem", rotate: "-6deg" },
];

const AnimatedFolder: React.FC<AnimatedFolderProps> = ({
  title,
  projects,
  index,
}) => {
  const theme = folderThemes[index % folderThemes.length];
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const folderRef = useRef<HTMLDivElement>(null);

  const previewProjects = projects.slice(0, 5);

  const handleProjectClick = (project: FolderImage, index: number) => {
    const cardEl = cardRefs.current[index];
    if (cardEl) setSourceRect(cardEl.getBoundingClientRect());
    setSelectedIndex(index);
    setHiddenCardId(project.id);
  };

  // Clicking on the folder body (not on a preview card) opens the lightbox at the first picture.
  const handleFolderClick = () => {
    if (projects.length === 0) return;
    const card = cardRefs.current[0] ?? folderRef.current;
    if (card) setSourceRect(card.getBoundingClientRect());
    setSelectedIndex(0);
    setHiddenCardId(projects[0].id);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
    setSourceRect(null);
  };
  const handleCloseComplete = () => {
    setHiddenCardId(null);
  };
  const handleNavigate = (newIndex: number) => {
    setSelectedIndex(newIndex);
    setHiddenCardId(projects[newIndex]?.id || null);
  };

  const folderBack = theme.back;
  const folderTab = theme.tab;
  const folderFront = theme.front;

  return (
    <>
      <div
        ref={folderRef}
        className="relative flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer bg-white border border-[#FF7F50]/25 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-[#FF7F50]/25 hover:border-[#FF7F50]/55 group"
        style={{
          minWidth: "280px",
          minHeight: "320px",
          perspective: "1200px",
          transform: isHovered ? "scale(1.04) rotate(-1.5deg)" : "scale(1) rotate(0deg)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleFolderClick}
      >
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 70%, #FF7F50 0%, transparent 70%)",
            opacity: isHovered ? 0.12 : 0,
          }}
        />
        <div
          className="relative flex items-center justify-center mb-4"
          style={{ height: "160px", width: "200px" }}
        >
          <div
            className="absolute w-32 h-24 rounded-lg shadow-md border border-white/30"
            style={{
              background: folderBack,
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-20deg) scaleY(1.05)" : "rotateX(0deg) scaleY(1)",
              transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 10,
            }}
          />
          <div
            className="absolute w-12 h-4 rounded-t-md border-t border-x border-white/30"
            style={{
              background: folderTab,
              top: "calc(50% - 48px - 12px)",
              left: "calc(50% - 64px + 16px)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-30deg) translateY(-3px)" : "rotateX(0deg) translateY(0)",
              transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 10,
            }}
          />
          <div
            className="absolute"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 20 }}
          >
            {previewProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                image={project.image}
                title={project.title}
                delay={index * 50}
                isVisible={isHovered}
                index={index}
                totalCount={previewProjects.length}
                onClick={() => handleProjectClick(project, index)}
                isSelected={hiddenCardId === project.id}
              />
            ))}
          </div>
          <div
            className="absolute w-32 h-24 rounded-lg shadow-lg border border-white/40 overflow-hidden"
            style={{
              background: folderFront,
              top: "calc(50% - 48px + 4px)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(35deg) translateY(12px)" : "rotateX(0deg) translateY(0)",
              transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 30,
            }}
          >
            {decoSpots.map((spot, di) => (
              <span
                key={di}
                aria-hidden="true"
                className="absolute select-none pointer-events-none"
                style={{
                  top: spot.top,
                  left: spot.left,
                  fontSize: spot.size,
                  transform: `rotate(${spot.rotate})`,
                  filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.18))",
                }}
              >
                {theme.icon}
              </span>
            ))}
          </div>
          <div
            className="absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none"
            style={{
              top: "calc(50% - 48px + 4px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(35deg) translateY(12px)" : "rotateX(0deg) translateY(0)",
              transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 31,
            }}
          />
        </div>
        <div className="text-center">
          <h3
            className="text-lg font-bold text-[#333333] mt-4 transition-all duration-500"
            style={{
              transform: isHovered ? "translateY(2px)" : "translateY(0)",
              letterSpacing: isHovered ? "-0.01em" : "0",
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm font-medium text-[#6B6963] transition-all duration-500"
            style={{ opacity: isHovered ? 0.8 : 1 }}
          >
            {projects.length} {projects.length === 1 ? "photo" : "photos"}
          </p>
        </div>
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#6B6963] transition-all duration-500"
          style={{
            opacity: isHovered ? 0 : 1,
            transform: isHovered ? "translateY(10px)" : "translateY(0)",
          }}
        >
          <span>Hover · Click to open</span>
        </div>
      </div>
      <ImageLightbox
        projects={projects}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={handleCloseLightbox}
        sourceRect={sourceRect}
        onCloseComplete={handleCloseComplete}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default function FolderGallery({ folders }: { folders: FolderData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
      {folders.map((folder, i) => (
        <div key={folder.title} className="w-full max-w-sm">
          <AnimatedFolder
            title={folder.title}
            projects={folder.projects}
            index={i}
          />
        </div>
      ))}
    </div>
  );
}
