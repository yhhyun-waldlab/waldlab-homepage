"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useCountUp
 *
 * 요소가 뷰포트에 진입하는 순간 0 → target 까지 숫자를 부드럽게 올림.
 * - triggerRef : 감시할 DOM 요소에 붙이는 ref
 * - count      : 현재 표시할 숫자
 * - duration   : 총 카운트업 시간 (ms, 기본 1500)
 */
export function useCountUp(
  target: number,
  duration: number = 1500,
): { count: number; triggerRef: React.RefObject<HTMLDivElement> } {
  const [count, setCount] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null!);
  const rafRef     = useRef<number | null>(null);
  const hasRun     = useRef(false);

  const animate = useCallback(() => {
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          animate();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return { count, triggerRef };
}
