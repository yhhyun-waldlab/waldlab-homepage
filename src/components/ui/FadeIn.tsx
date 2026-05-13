"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, CSSProperties } from "react";

interface FadeInProps {
  children: ReactNode;
  /** 트리거 딜레이 (ms) */
  delay?: number;
  /** 이동 방향 */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** 진입 임계값 (0~1) */
  threshold?: number;
  className?: string;
  style?: CSSProperties;
}

const OFFSETS: Record<NonNullable<FadeInProps["direction"]>, string> = {
  up:    "translateY(28px)",
  down:  "translateY(-28px)",
  left:  "translateX(-28px)",
  right: "translateX(28px)",
  none:  "none",
};

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  threshold = 0.1,
  className = "",
  style,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translate(0,0)" : OFFSETS[direction],
        transition: `opacity 0.75s ease-out ${delay}ms, transform 0.75s ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
