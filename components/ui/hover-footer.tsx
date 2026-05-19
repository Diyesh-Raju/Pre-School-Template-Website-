"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextHoverEffectProps {
  text: string;
  className?: string;
}

export function TextHoverEffect({ text, className = "" }: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== 0 && cursor.y !== 0) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercent = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercent = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercent}%`,
        cy: `${cyPercent}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1200 200"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={className}
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF7F50" />
          <stop offset="50%" stopColor="#FF9974" />
          <stop offset="100%" stopColor="#FF7F50" />
        </linearGradient>
        <radialGradient id="revealMask" gradientUnits="userSpaceOnUse" r="20%" cx={maskPosition.cx} cy={maskPosition.cy}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Base outline text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1.4"
        className="fill-transparent stroke-[#333333] font-bold"
        style={{ fontSize: "80px" }}
      >
        {text}
      </text>

      {/* Hover-revealed gradient text */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        className="fill-transparent font-bold"
        style={{ fontSize: "80px" }}
        stroke="url(#textGradient)"
        mask="url(#textMask)"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={hovered ? { strokeDashoffset: 0 } : { strokeDashoffset: 1000 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
    </svg>
  );
}

export function FooterBackgroundGradient() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute bottom-0 left-0 right-0 h-[40rem] bg-gradient-to-t from-[#FF7F50]/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-[#FF7F50]/8 rounded-full blur-3xl" />
    </div>
  );
}
