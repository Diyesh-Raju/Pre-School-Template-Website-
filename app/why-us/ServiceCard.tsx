"use client";

// 21st.dev template, adapted:
// - Removed `class-variance-authority` (not installed) + its shadcn theme
//   variants (bg-card/text-secondary-foreground/… are undefined here).
// - Added a `description` (the template had none, but copy needs it).
// - Decorative <motion.img> → an animated emoji (no image asset needed),
//   keeping the same hover scale/rotate/x motion.
// framer-motion IS installed, so the motion behaviour is kept as-is.

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
}

const cardAnimation: Variants = {
  hover: { scale: 1.02, transition: { duration: 0.3 } },
};
const iconAnimation: Variants = {
  hover: {
    scale: 1.1,
    rotate: 3,
    x: 10,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};
const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, title, description, icon }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative flex flex-col justify-between w-full h-full min-h-[280px] sm:min-h-[320px] p-10 sm:p-12 overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] group transition-shadow duration-300 ease-in-out",
          className
        )}
        style={{
          background: "linear-gradient(160deg, #FFFFFF 0%, #FFF4EC 100%)",
          border: "2px solid rgba(255,127,80,0.6)",
          boxShadow:
            "0 20px 46px -16px rgba(255,127,80,0.42), 0 4px 14px rgba(255,127,80,0.14)",
        }}
        variants={cardAnimation}
        whileHover="hover"
      >
        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FF7F50] pr-16">
            {title}
          </h3>
          <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[var(--text-secondary)] pr-12">
            {description}
          </p>
        </div>

        <motion.div
          aria-hidden="true"
          variants={iconAnimation}
          className="pointer-events-none absolute -right-2 -bottom-3 text-[7rem] sm:text-[8.5rem] leading-none opacity-20 group-hover:opacity-30 select-none"
        >
          {icon}
        </motion.div>
      </motion.div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
