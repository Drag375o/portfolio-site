'use client';

import { useEffect, useRef } from 'react';

/**
 * A drifting point field with one signal travelling one connection at a time.
 *
 * This is the only ambient motion on the site. It is deliberately a canvas of
 * 1px marks rather than a 3D scene: it costs one script, three draw calls per
 * frame, and never competes with the headline.
 *
 * Replacing it: export a different component from ./index.ts. Nothing else in
 * the codebase knows this file exists.
 */
export default function Lattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const STEP = 56;
    const RADIUS = 165;
    const BUCKET_ALPHA = [0.055, 0.032, 0.014];

    let nx: number[] = [];
    let ny: number[] = [];
    let phase: number[] = [];
    let fade: number[] = [];
    let la: number[] = [];
    let lb: number[] = [];
    let bucket: number[] = [];
    let pulses: { a: number; b: number; start: number; dur: number }[] = [];

    let dpr = 1;
    let W = 0;
    let H = 0;
    let mx = -9999;
    let my = -9999;
    let raf: number | null = null;
    let visible = true;
    let nextPulse = 600;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const link = (a: number, b: number) => {
      const f = (fade[a] + fade[b]) / 2;
      if (f <= 0.05) return;
      la.push(a);
      lb.push(b);
      bucket.push(f > 0.66 ? 0 : f > 0.33 ? 1 : 2);
    };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.offsetWidth;
      H = host.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = 1;

      const cols = Math.ceil(W / STEP) + 1;
      const rows = Math.ceil(H / STEP) + 1;
      nx = [];
      ny = [];
      phase = [];
      fade = [];

      for (let r = 0; r < rows; r++) {
        for (let q = 0; q < cols; q++) {
          const i = r * cols + q;
          // Deterministic jitter, the field reads organic, not like graph paper.
          const j = Math.sin(i * 12.9898) * 43758.5453;
          const k = Math.sin(i * 78.233) * 12345.6789;
          nx[i] = q * STEP + (j - Math.floor(j) - 0.5) * STEP * 0.55;
          ny[i] = r * STEP + (k - Math.floor(k) - 0.5) * STEP * 0.55;
          phase[i] = (j - Math.floor(j)) * 6.283;
          // Fades down the page so the field never fights the copy.
          fade[i] = Math.max(0, 1 - Math.pow(ny[i] / H, 1.15) * 0.92);
        }
      }

      la = [];
      lb = [];
      bucket = [];
      for (let r = 0; r < rows; r++) {
        for (let q = 0; q < cols; q++) {
          const a = r * cols + q;
          if (q + 1 < cols) link(a, a + 1);
          if (r + 1 < rows) link(a, a + cols);
          if ((q + r) % 4 === 0 && q + 1 < cols && r + 1 < rows) link(a, a + cols + 1);
        }
      }

      pulses = [];
      frame(performance.now(), true);
    };

    const frame = (now: number, staticFrame = false) => {
      raf = null;
      const t = now / 1000;
      const n = nx.length;
      const px = new Float32Array(n);
      const py = new Float32Array(n);
      const drift = reduce ? 0 : 1;

      for (let i = 0; i < n; i++) {
        px[i] = nx[i] + Math.sin(t * 0.32 + phase[i]) * 3.1 * drift;
        py[i] = ny[i] + Math.cos(t * 0.26 + phase[i]) * 3.1 * drift;
      }

      ctx.clearRect(0, 0, W, H);

      // Links in three alpha tiers → 3 stroke calls instead of ~1500.
      for (let b = 0; b < 3; b++) {
        ctx.strokeStyle = `rgba(174,205,226,${BUCKET_ALPHA[b]})`;
        ctx.beginPath();
        for (let i = 0; i < la.length; i++) {
          if (bucket[i] !== b) continue;
          ctx.moveTo(px[la[i]], py[la[i]]);
          ctx.lineTo(px[lb[i]], py[lb[i]]);
        }
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(174,205,226,0.16)';
      for (let i = 0; i < n; i++) {
        if (fade[i] <= 0.05) continue;
        ctx.globalAlpha = fade[i];
        ctx.fillRect(px[i] - 0.9, py[i] - 0.9, 1.8, 1.8);
      }
      ctx.globalAlpha = 1;

      if (mx > -9000) {
        ctx.strokeStyle = 'rgba(127,216,247,0.18)';
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const d = Math.hypot(px[i] - mx, py[i] - my);
          if (d >= RADIUS) continue;
          const near = (1 - d / RADIUS) * fade[i];
          if (near < 0.32) continue;
          ctx.moveTo(px[i], py[i]);
          ctx.lineTo(mx, my);
          ctx.fillStyle = `rgba(127,216,247,${(near * 0.55).toFixed(3)})`;
          ctx.fillRect(px[i] - 1.2, py[i] - 1.2, 2.4, 2.4);
        }
        ctx.stroke();
      }

      if (reduce || staticFrame) return;

      if (now > nextPulse && pulses.length < 2 && la.length) {
        const pick = Math.floor(Math.random() * la.length);
        if (bucket[pick] === 0) {
          pulses.push({ a: la[pick], b: lb[pick], start: now, dur: 1400 + Math.random() * 900 });
        }
        nextPulse = now + 900 + Math.random() * 1400;
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const u = (now - p.start) / p.dur;
        if (u >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const ax = px[p.a];
        const ay = py[p.a];
        const bx = px[p.b];
        const by = py[p.b];
        const e = Math.sin(u * Math.PI);
        const cx = ax + (bx - ax) * u;
        const cy = ay + (by - ay) * u;
        const tail = Math.max(0, u - 0.28);
        ctx.strokeStyle = `rgba(127,216,247,${(e * 0.5).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(ax + (bx - ax) * tail, ay + (by - ay) * tail);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.fillStyle = `rgba(160,230,255,${(e * 0.75).toFixed(3)})`;
        ctx.fillRect(cx - 1.1, cy - 1.1, 2.2, 2.2);
      }

      if (visible) raf = requestAnimationFrame((ts) => frame(ts));
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    };

    // Pause the loop the moment the hero leaves the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && raf === null && !reduce) {
          raf = requestAnimationFrame((ts) => frame(ts));
        }
      },
      { threshold: 0 },
    );
    io.observe(host);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);

    build();
    if (!reduce) raf = requestAnimationFrame((ts) => frame(ts));

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
