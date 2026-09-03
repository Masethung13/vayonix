import React, { useState, useEffect, useRef } from 'react';
import '../styles/ScrollTitle.css';

/**
 * ScrollTitle Component
 * Renders multi-line titles with silky smooth word-by-word scroll-triggered color transformations.
 * 
 * Supports two line formats:
 * Format A (Simple):
 *   lines={[
 *     [ { text: 'Engineering', type: 'normal' }, { text: 'High-Impact', type: 'normal' } ],
 *     [ { text: 'That', type: 'normal' }, { text: 'Fuel', type: 'gradient' } ]
 *   ]}
 * Format B (With line custom classes):
 *   lines={[
 *     { className: 'heading-line-1', words: [{ text: 'DIGITAL', type: 'normal' }, { text: 'MARKETING', type: 'normal' }] },
 *     { className: 'heading-line-2', words: [{ text: 'WEB', type: 'normal' }, { text: 'DESIGN', type: 'normal' }] }
 *   ]}
 */
const ScrollTitle = ({
  lines = [],
  as: Tag = 'h2',
  className = '',
  startOffset = 0.9,
  endOffset = 0.35,
  isHero = false,
  children,
}) => {
  const titleRef = useRef(null);
  const [scrollRatio, setScrollRatio] = useState(0);

  // Normalize lines to standard structure
  const normalizedLines = lines.map((item) => {
    if (Array.isArray(item)) {
      return { className: '', words: item };
    }
    return { className: item.className || '', words: item.words || [] };
  });

  // Calculate total words across all lines
  const totalWords = normalizedLines.reduce((acc, line) => acc + line.words.length, 0) || 1;

  // Smooth Staggered Illumination on Mount (and on scroll) for Hero Titles
  useEffect(() => {
    if (!isHero) return;

    let animFrame = null;
    const duration = 1600; // 1.6s smooth word illumination sequence
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      setScrollRatio(ease);

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setScrollRatio(1);
      }
    };

    const timer = setTimeout(() => {
      animFrame = requestAnimationFrame(step);
    }, 150);

    return () => {
      clearTimeout(timer);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isHero]);

  // Smooth Scroll Trigger Calculation for Body Section Titles
  useEffect(() => {
    if (isHero) return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (titleRef.current) {
            const rect = titleRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const startThreshold = windowHeight * startOffset;
            const endThreshold = windowHeight * endOffset;
            const progress = (startThreshold - rect.top) / (startThreshold - endThreshold);
            setScrollRatio(Math.max(0, Math.min(1, progress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startOffset, endOffset, isHero]);

  let wordCounter = 0;

  return (
    <Tag ref={titleRef} className={`scroll-title-container ${className}`}>
      {normalizedLines.map((line, lineIdx) => (
        <span key={lineIdx} className={`scroll-title-line ${line.className}`}>
          {line.words.map((word, wordIdx) => {
            const currentIdx = wordCounter++;
            const start = currentIdx / (totalWords + 1.2);
            const end = (currentIdx + 1.8) / (totalWords + 1.2);
            const progress = Math.max(0, Math.min(1, (scrollRatio - start) / (end - start)));
            const isLit = progress > 0.35;

            return (
              <span
                key={wordIdx}
                className={`scroll-title-word word-${word.type || 'normal'} ${isLit ? 'is-lit' : 'is-unlit'}`}
                style={{
                  opacity: 0.22 + progress * 0.78,
                  transform: `translate3d(0, ${(1 - progress) * 5}px, 0)`,
                  filter: `blur(${(1 - progress) * 1.2}px)`,
                  transition: 'color 0.3s ease, text-shadow 0.3s ease, filter 0.2s ease, opacity 0.2s ease',
                }}
              >
                {word.text}
              </span>
            );
          })}
        </span>
      ))}
      {children}
    </Tag>
  );
};

export default ScrollTitle;
