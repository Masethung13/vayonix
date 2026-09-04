import React, { useEffect, useRef, useState } from 'react';
import '../styles/CreativeCursor.css';

const CreativeCursor = () => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // 1. Detect touch device / coarse pointer
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
    const MAX_STARS = 120;

    // Smooth subtle ribbon points
    const trailPoints = [];
    const MAX_TRAIL = 16;

    // Theme detector (Multi-channel detection for instant reactivity)
    const isLightTheme = () => {
      return (
        document.documentElement.getAttribute('data-theme') === 'light' ||
        document.body.classList.contains('theme-light') ||
        document.body.getAttribute('data-theme') === 'light' ||
        localStorage.getItem('vayonix_theme') === 'light'
      );
    };

    const getPalette = () => {
      const isLight = isLightTheme();
      if (isLight) {
        return {
          isLight: true,
          primary: '#ea580c', // Fiery neon orange
          secondary: '#f59e0b', // Golden amber
          accent: '#e11d48', // Vibrant rose
          spark: '#fbbf24', // Yellow gold
          glow: 'rgba(234, 88, 12, 0.45)',
          ribbon: ['#ea580c', '#f59e0b'],
          starColors: ['#ea580c', '#d97706', '#f59e0b', '#e11d48', '#8b5cf6', '#0284c7'],
        };
      }
      return {
        isLight: false,
        primary: '#38bdf8', // Cyan
        secondary: '#a855f7', // Purple
        accent: '#818cf8', // Indigo
        spark: '#ffffff', // Star White
        glow: 'rgba(56, 189, 248, 0.55)',
        ribbon: ['#38bdf8', '#a855f7'],
        starColors: ['#38bdf8', '#a855f7', '#818cf8', '#ffffff', '#c084fc'],
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
      const colors = palette.starColors;

      for (let i = 0; i < count; i++) {
        if (stars.length >= MAX_STARS) stars.shift();

        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2.2 + 0.6) * speedMult;
        const color = colors[Math.floor(Math.random() * colors.length)];

        stars.push({
          x: x * dpr,
          y: y * dpr,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.15,
          baseSize: Math.random() * 3.8 + 2.0,
          color,
          alpha: 1,
          decay: Math.random() * 0.024 + 0.018,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.08,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.28 + 0.18,
          spikes: Math.random() > 0.25 ? 4 : 8,
          inset: Math.random() > 0.25 ? 0.24 : 0.38,
        });
      }
    };

    // Draw 4-point or 8-point geometric glowing twinkle star (Zero black background in Light Mode)
    const drawStar = (starX, starY, size, spikes, inset, alpha, color, isLight) => {
      ctx.save();
      ctx.translate(starX, starY);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      // Sharp geometric star polygon
      ctx.fillStyle = color;
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

      // Sparkling crystal core hotspot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0.6, size * 0.24), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    let hasMoved = false;

    // Instant Zero-Latency Mouse Movement Tracker
    const handleMouseMove = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        if (rootRef.current) {
          rootRef.current.classList.remove('cursor-hidden');
          rootRef.current.classList.add('cursor-visible');
        }
        ring.x = clientX;
        ring.y = clientY;
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = clientX;
      mouse.y = clientY;

      // 0ms INSTANT tracking: update inner dot synchronously without waiting for next frame
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      mouse.speed = Math.hypot(dx, dy);

      // Trailing ribbon points
      trailPoints.push({
        x: clientX * dpr,
        y: clientY * dpr,
        alpha: 1.0,
      });
      if (trailPoints.length > MAX_TRAIL) {
        trailPoints.shift();
      }

      // Spawn twinkle stars on movement
      if (mouse.speed > 1.4) {
        const starCount = Math.min(Math.floor(mouse.speed / 5) + 1, 3);
        spawnTwinkleStars(clientX, clientY, starCount, Math.min(mouse.speed * 0.1, 2.0));
      }
    };

    // Event-driven hover detection: ONLY triggers on enter/leave (Zero mousemove CPU overhead)
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isInteractive = target.closest(
        'button, a, [role="button"], .btn, [class*="btn"], [class*="cta"], [class*="toggle"], [class*="action"], input, textarea, select, [tabindex]:not([tabindex="-1"]), label, summary'
      );

      if (rootRef.current) {
        rootRef.current.classList.toggle('cursor-hovered', !!isInteractive);
      }
    };

    const handleMouseOut = (e) => {
      const related = e.relatedTarget;
      if (!related || (related instanceof Element && !related.closest(
        'button, a, [role="button"], .btn, [class*="btn"], [class*="cta"], [class*="toggle"], [class*="action"], input, textarea, select, [tabindex]:not([tabindex="-1"]), label, summary'
      ))) {
        if (rootRef.current) {
          rootRef.current.classList.remove('cursor-hovered');
        }
      }
    };

    const handleMouseDown = (e) => {
      // Burst of sparkling twinkle stars on click
      spawnTwinkleStars(e.clientX, e.clientY, 16, 3.0);

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
      if (rootRef.current) {
        rootRef.current.classList.remove('cursor-visible');
        rootRef.current.classList.add('cursor-hidden');
      }
      trailPoints.length = 0;
      stars.length = 0;
    };

    const handleMouseEnter = () => {
      if (rootRef.current) {
        rootRef.current.classList.remove('cursor-hidden');
        rootRef.current.classList.add('cursor-visible');
      }
    };

    // 60-120fps Hardware-Accelerated Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const palette = getPalette();

      // 1. Age and decay ribbon trail points
      for (let i = trailPoints.length - 1; i >= 0; i--) {
        trailPoints[i].alpha -= 0.04;
        if (trailPoints[i].alpha <= 0) {
          trailPoints.splice(i, 1);
        }
      }

      // Render Soft Comet Ribbon Trail
      if (trailPoints.length > 1) {
        ctx.save();
        ctx.globalCompositeOperation = palette.isLight ? 'source-over' : 'lighter';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        for (let i = 1; i < trailPoints.length; i++) {
          const ptPrev = trailPoints[i - 1];
          const ptCurr = trailPoints[i];
          const progress = i / trailPoints.length;
          const segmentAlpha = Math.min(ptPrev.alpha, ptCurr.alpha) * progress * (palette.isLight ? 0.55 : 0.42);

          if (segmentAlpha <= 0.01) continue;

          const grad = ctx.createLinearGradient(ptPrev.x, ptPrev.y, ptCurr.x, ptCurr.y);
          grad.addColorStop(0, palette.ribbon[0]);
          grad.addColorStop(1, palette.ribbon[1]);

          ctx.beginPath();
          ctx.moveTo(ptPrev.x, ptPrev.y);
          ctx.lineTo(ptCurr.x, ptCurr.y);

          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(0.6, progress * 3.0 * dpr);
          ctx.globalAlpha = segmentAlpha;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Render Animated Twinkling Stars
      if (stars.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = palette.isLight ? 'source-over' : 'lighter';

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

          const twinkleScale = 0.68 + 0.32 * Math.sin(s.twinklePhase);
          const currentSize = s.baseSize * dpr * twinkleScale;

          drawStar(s.x, s.y, currentSize, s.spikes, s.inset, s.alpha, s.color, palette.isLight);
        }
        ctx.restore();
      }

      // 3. Ultra-Snappy Follower Ring (lerpFactor 0.50 eliminates perceived delay while keeping fluid smoothness)
      if (ringRef.current && hasMoved) {
        const lerpFactor = 0.50;
        ring.x += (mouse.x - ring.x) * lerpFactor;
        ring.y += (mouse.y - ring.y) * lerpFactor;

        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      // Sync dot on vsync as well
      if (dotRef.current && hasMoved) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
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
      ref={rootRef}
      className="creative-cursor-root cursor-hidden"
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