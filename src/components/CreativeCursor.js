import React, { useEffect, useRef, useState } from 'react';
import '../styles/CreativeCursor.css';

const CreativeCursor = () => {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Canvas sizing
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    // Coordinates state
    const mouse = { x: -200, y: -200, prevX: -200, prevY: -200, speed: 0 };
    const ring = { x: -200, y: -200 };

    // Twinkling Star Particle Collection
    const stars = [];
    const MAX_STARS = 150;

    // Smooth subtle ribbon points
    const trailPoints = [];
    const MAX_TRAIL = 18;

    // Theme detector
    const isLightTheme = () => {
      return (
        document.documentElement.getAttribute('data-theme') === 'light' ||
        document.body.classList.contains('theme-light')
      );
    };

    const getPalette = () => {
      if (isLightTheme()) {
        return {
          primary: '#f59e0b',
          secondary: '#fbbf24',
          accent: '#d97706',
          spark: '#ffffff',
          glow: 'rgba(245, 158, 11, 0.45)',
          ribbon: ['#fbbf24', '#f59e0b'],
        };
      }
      return {
        primary: '#38bdf8', // Cyan
        secondary: '#a855f7', // Purple
        accent: '#818cf8', // Indigo
        spark: '#ffffff', // Star White
        glow: 'rgba(56, 189, 248, 0.55)',
        ribbon: ['#38bdf8', '#a855f7'],
      };
    };

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener('resize', handleResize);

    // Twinkle Star Spawner
    const spawnTwinkleStars = (x, y, count = 2, speedMult = 1) => {
      const palette = getPalette();
      const colors = [palette.primary, palette.secondary, palette.accent, palette.spark, '#ffffff'];

      for (let i = 0; i < count; i++) {
        if (stars.length >= MAX_STARS) stars.shift();

        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2.2 + 0.6) * speedMult;
        const color = colors[Math.floor(Math.random() * colors.length)];

        stars.push({
          x: x * dpr,
          y: y * dpr,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.15, // slight ambient float
          baseSize: Math.random() * 4.2 + 2.2,
          color,
          alpha: 1,
          decay: Math.random() * 0.022 + 0.016,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.08,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.28 + 0.18,
          spikes: Math.random() > 0.25 ? 4 : 8,
          inset: Math.random() > 0.25 ? 0.24 : 0.38,
        });
      }
    };

    // Draw 4-point or 8-point geometric glowing twinkle star
    const drawStar = (starX, starY, size, spikes, inset, alpha, color) => {
      ctx.save();
      ctx.translate(starX, starY);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12 * dpr;

      ctx.beginPath();
      const step = Math.PI / spikes;
      let rot = (Math.PI / 2) * 3;

      ctx.moveTo(0, -size);
      for (let i = 0; i < spikes; i++) {
        let curX = Math.cos(rot) * size;
        let curY = Math.sin(rot) * size;
        ctx.lineTo(curX, curY);
        rot += step;

        curX = Math.cos(rot) * (size * inset);
        curY = Math.sin(rot) * (size * inset);
        ctx.lineTo(curX, curY);
        rot += step;
      }
      ctx.lineTo(0, -size);
      ctx.closePath();
      ctx.fill();

      // White crystal core hot spot
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0.8, size * 0.22), 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 6 * dpr;
      ctx.fill();

      ctx.restore();
    };

    let hasMoved = false;

    const handleMouseMove = (e) => {
      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
        ring.x = e.clientX;
        ring.y = e.clientY;
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      mouse.speed = Math.hypot(dx, dy);

      // Trailing ribbon with alpha decay
      trailPoints.push({ 
        x: mouse.x * dpr, 
        y: mouse.y * dpr,
        alpha: 1.0 
      });
      if (trailPoints.length > MAX_TRAIL) {
        trailPoints.shift();
      }

      // Spawn twinkle stars on movement
      if (mouse.speed > 1.2) {
        const starCount = Math.min(Math.floor(mouse.speed / 5) + 1, 4);
        spawnTwinkleStars(mouse.x, mouse.y, starCount, Math.min(mouse.speed * 0.1, 2.2));
      }

      // Update center dot position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      // Check if hovering interactive element (for subtle glow, NO size change)
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = target && target.closest(
        'button, a, [role="button"], .btn, [class*="btn"], [class*="cta"], [class*="toggle"], [class*="action"], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = (e) => {
      // Burst of sparkling twinkle stars on click
      spawnTwinkleStars(e.clientX, e.clientY, 18, 3.2);

      if (ringRef.current) {
        ringRef.current.classList.add('cursor-ring--click');
      }
    };

    const handleMouseUp = () => {
      if (ringRef.current) {
        ringRef.current.classList.remove('cursor-ring--click');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      trailPoints.length = 0;
      stars.length = 0;
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // 60-120fps Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const palette = getPalette();

      // 1. Age and decay ribbon trail points so tail smoothly disappears when stopped
      for (let i = trailPoints.length - 1; i >= 0; i--) {
        trailPoints[i].alpha -= 0.035;
        if (trailPoints[i].alpha <= 0) {
          trailPoints.splice(i, 1);
        }
      }

      // Render Soft Comet Ribbon Trail
      if (trailPoints.length > 1) {
        ctx.save();
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        for (let i = 1; i < trailPoints.length; i++) {
          const ptPrev = trailPoints[i - 1];
          const ptCurr = trailPoints[i];
          const progress = i / trailPoints.length;
          const segmentAlpha = Math.min(ptPrev.alpha, ptCurr.alpha) * progress * 0.45;

          if (segmentAlpha <= 0.01) continue;

          const grad = ctx.createLinearGradient(ptPrev.x, ptPrev.y, ptCurr.x, ptCurr.y);
          grad.addColorStop(0, palette.ribbon[0]);
          grad.addColorStop(1, palette.ribbon[1]);

          ctx.beginPath();
          ctx.moveTo(ptPrev.x, ptPrev.y);
          ctx.lineTo(ptCurr.x, ptCurr.y);

          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(0.5, progress * 3.2 * dpr);
          ctx.globalAlpha = segmentAlpha;
          ctx.shadowColor = palette.primary;
          ctx.shadowBlur = progress * 10 * dpr;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Render Animated Twinkling Stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.alpha -= s.decay;
        s.rotation += s.rotSpeed;
        s.twinklePhase += s.twinkleSpeed;

        if (s.alpha <= 0) {
          stars.splice(i, 1);
          continue;
        }

        const twinkleScale = 0.65 + 0.35 * Math.sin(s.twinklePhase);
        const currentSize = s.baseSize * dpr * twinkleScale;

        drawStar(s.x, s.y, currentSize, s.spikes, s.inset, s.alpha, s.color);
      }

      // 3. Smooth Fixed-Size Outer Circle Follower (always small, constant size)
      if (ringRef.current && hasMoved) {
        const lerpFactor = 0.22;
        ring.x += (mouse.x - ring.x) * lerpFactor;
        ring.y += (mouse.y - ring.y) * lerpFactor;

        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      className={`creative-cursor-root ${isVisible ? 'cursor-visible' : 'cursor-hidden'} ${isHovered ? 'cursor-hovered' : ''}`}
      aria-hidden="true"
    >
      {/* Twinkling Star Canvas */}
      <canvas ref={canvasRef} className="cursor-canvas" />

      {/* Small Outer Ring (Fixed Size) */}
      <div ref={ringRef} className="cursor-ring">
        <div className="cursor-ring-inner" />
      </div>

      {/* Precision Core Dot */}
      <div ref={dotRef} className="cursor-dot">
        <div className="cursor-dot-glow" />
      </div>
    </div>
  );
};

export default CreativeCursor;