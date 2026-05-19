"use client";

// 21st.dev template, adapted:
// - Sizes to its CONTAINER (ResizeObserver), not window.innerWidth/Height —
//   the original distorted balls when placed in anything but a full screen.
// - Cancels the requestAnimationFrame on unmount (the original leaked an
//   infinite loop after the component was removed).
// - DPR-aware so the dots stay crisp.

import { useEffect, useRef, type FC } from "react";

interface Ball {
  fillColor: string;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface BouncingBallsProps {
  numBalls?: number;
  colors?: string[];
  minRadius?: number;
  maxRadius?: number;
  speed?: number;
  className?: string;
}

export const BouncingBalls: FC<BouncingBallsProps> = ({
  numBalls = 36,
  colors,
  minRadius = 6,
  maxRadius = 16,
  speed = 0.4,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const palette =
      colors && colors.length > 0
        ? colors
        : ["rgba(255,127,80,0.5)", "rgba(247,183,51,0.5)", "rgba(42,168,196,0.5)"];

    const balls: Ball[] = [];

    const seed = () => {
      balls.length = 0;
      for (let i = 0; i < numBalls; i++) {
        const radius = Math.random() * (maxRadius - minRadius) + minRadius;
        balls.push({
          fillColor: palette[Math.floor(Math.random() * palette.length)],
          radius,
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() * 2 - 1) * speed,
          vy: (Math.random() * 2 - 1) * speed,
        });
      }
    };

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (balls.length === 0) seed();
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);
      for (const b of balls) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x + b.radius > W) {
          b.x = W - b.radius;
          b.vx *= -1;
        } else if (b.x - b.radius < 0) {
          b.x = b.radius;
          b.vx *= -1;
        }
        if (b.y + b.radius > H) {
          b.y = H - b.radius;
          b.vy *= -1;
        } else if (b.y - b.radius < 0) {
          b.y = b.radius;
          b.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.fillColor;
        ctx.fill();
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [numBalls, colors, minRadius, maxRadius, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
};
