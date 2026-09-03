import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedNumber Component
 * Automatically parses strings like "+210%", "500K+", "4.9★", "#1 Rank", "250+", "-75%"
 * and performs a silky smooth scroll-triggered count-up animation using requestAnimationFrame and IntersectionObserver.
 * 
 * Props:
 * - value: string or number to animate (e.g. "+210%", 98, "500K+")
 * - duration: duration in ms (default: 1800ms)
 * - delay: delay in ms before starting animation (default: 0)
 * - once: whether to trigger only once or every time it enters viewport (default: false for always scroll trigger)
 * - threshold: IntersectionObserver threshold (default: 0.2)
 * - className: custom class names
 */
const AnimatedNumber = ({
  value,
  duration = 1800,
  delay = 0,
  once = false,
  threshold = 0.2,
  className = '',
}) => {
  const elementRef = useRef(null);

  // Parse prefix, numeric value, suffix, and decimal count
  const parseValue = (val) => {
    if (typeof val === 'number') {
      return {
        prefix: '',
        target: val,
        suffix: '',
        decimals: Number.isInteger(val) ? 0 : 1,
        isRaw: false,
      };
    }
    const str = String(val || '').trim();
    const match = str.match(/^([^0-9.]*)(-?[0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (match) {
      const prefix = match[1] || '';
      const num = parseFloat(match[2]);
      const suffix = match[3] || '';
      const decimalMatch = match[2].match(/\.(\d+)/);
      const decimals = decimalMatch ? decimalMatch[1].length : 0;
      return { prefix, target: num, suffix, decimals, isRaw: false };
    }
    return { prefix: '', target: 0, suffix: str, decimals: 0, isRaw: true };
  };

  const parsed = parseValue(value);
  const [displayValue, setDisplayValue] = useState(() => {
    if (parsed.isRaw) return parsed.suffix;
    return `${parsed.prefix}${Number(0).toFixed(parsed.decimals)}${parsed.suffix}`;
  });

  useEffect(() => {
    const elem = elementRef.current;
    if (!elem || parsed.isRaw) return;

    let animFrame = null;
    let timeoutId = null;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const startCountAnimation = () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const startTime = performance.now();
        const startVal = 0;
        const targetVal = parsed.target;

        const step = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = easeOutExpo(progress);
          const currentNum = startVal + (targetVal - startVal) * easeProgress;

          const formatted = parsed.decimals > 0
            ? currentNum.toFixed(parsed.decimals)
            : Math.round(currentNum).toString();

          setDisplayValue(`${parsed.prefix}${formatted}${parsed.suffix}`);

          if (progress < 1) {
            animFrame = requestAnimationFrame(step);
          } else {
            const finalFormatted = parsed.decimals > 0
              ? targetVal.toFixed(parsed.decimals)
              : Math.round(targetVal).toString();
            setDisplayValue(`${parsed.prefix}${finalFormatted}${parsed.suffix}`);
          }
        };

        animFrame = requestAnimationFrame(step);
      }, delay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCountAnimation();
            if (once) {
              observer.unobserve(elem);
            }
          } else if (!once) {
            // Reset to 0 when out of view so it animates smoothly when re-entering
            setDisplayValue(`${parsed.prefix}${Number(0).toFixed(parsed.decimals)}${parsed.suffix}`);
          }
        });
      },
      { threshold }
    );

    observer.observe(elem);

    return () => {
      if (elem) observer.unobserve(elem);
      if (animFrame) cancelAnimationFrame(animFrame);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [value, duration, delay, once, threshold, parsed.target, parsed.prefix, parsed.suffix, parsed.decimals, parsed.isRaw]);

  return (
    <span
      ref={elementRef}
      className={`animated-number-counter ${className}`}
      style={{
        fontVariantNumeric: 'tabular-nums',
        display: 'inline-block',
      }}
    >
      {displayValue}
    </span>
  );
};

export default AnimatedNumber;
