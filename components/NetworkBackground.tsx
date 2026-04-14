import React, { useEffect, useRef } from 'react';

/* ─── config ─── */
const NODE_COUNT  = 28;
const MAX_DIST    = 130;
const SPEED       = 0.12;
const PULSE_COUNT = 4;     // nodes that glow Apple Blue

/* colours — tuned for dark (black) background */
const BLUE  = '#0071e3';
const GRAY  = '#48484a';   // dim gray on black
const BG    = '#000000';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  isPulse: boolean;
  phase: number;   // for glow oscillation
}

function makeNode(w: number, h: number, isPulse: boolean): Node {
  const angle = Math.random() * Math.PI * 2;
  const speed = SPEED * (0.4 + Math.random() * 0.6);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: isPulse ? 4 + Math.random() * 3 : 2 + Math.random() * 2.5,
    isPulse,
    phase: Math.random() * Math.PI * 2,
  };
}

const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* ── sizing ── */
    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── nodes ── */
    const pulseSet = new Set<number>();
    while (pulseSet.size < PULSE_COUNT) pulseSet.add(Math.floor(Math.random() * NODE_COUNT));
    let nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) =>
      makeNode(W, H, pulseSet.has(i))
    );

    /* ── mouse parallax ── */
    let mx = 0, my = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── draw helpers ── */
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1,3),16);
      const g = parseInt(hex.slice(3,5),16);
      const b = parseInt(hex.slice(5,7),16);
      return { r, g, b };
    };
    const blueRGB = hexToRgb(BLUE);
    const grayRGB = hexToRgb(GRAY);

    /* ── animation ── */
    let rafId: number;
    let t = 0;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      t += 0.016;

      /* smooth parallax offset */
      const ox = mx * 18;
      const oy = my * 10;

      ctx.clearRect(0, 0, W, H);

      /* ── subtle grid on black ── */
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.8;
      const gridSize = 72;
      const gOffX = (ox * 0.08) % gridSize;
      const gOffY = (oy * 0.08) % gridSize;
      for (let x = -gridSize + gOffX; x < W + gridSize; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = -gridSize + gOffY; y < H + gridSize; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.restore();

      /* ── update + draw ── */
      nodes.forEach(n => {
        // drift
        n.x += n.vx;
        n.y += n.vy;
        // bounce
        if (n.x < 0 || n.x > W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)); }
        if (n.y < 0 || n.y > H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)); }
      });

      /* ── connections ── */
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = a.x + ox;
        const ay = a.y + oy;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bx = b.x + ox;
          const by = b.y + oy;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < MAX_DIST) {
            const fade = 1 - dist / MAX_DIST;
            const isPulseConn = a.isPulse || b.isPulse;

            let r = isPulseConn ? blueRGB.r : grayRGB.r;
            let g = isPulseConn ? blueRGB.g : grayRGB.g;
            let b2 = isPulseConn ? blueRGB.b : grayRGB.b;
            const alpha = isPulseConn ? fade * 0.18 : fade * 0.08;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r},${g},${b2},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      /* ── nodes ── */
      nodes.forEach(n => {
        const nx = n.x + ox;
        const ny = n.y + oy;

        if (n.isPulse) {
          // pulse glow — Apple Blue halo
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 + n.phase);
          const outerR = n.r + 4 + pulse * 6;

          const grd = ctx.createRadialGradient(nx, ny, n.r * 0.5, nx, ny, outerR);
          grd.addColorStop(0, `rgba(0,113,227,${0.12 + pulse * 0.08})`);
          grd.addColorStop(1, 'rgba(0,113,227,0)');
          ctx.beginPath();
          ctx.arc(nx, ny, outerR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,113,227,0.65)`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(96,96,100,0.4)';
          ctx.fill();
        }
      });

      // (data packets removed — too visually busy)
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
};

export default NetworkBackground;
