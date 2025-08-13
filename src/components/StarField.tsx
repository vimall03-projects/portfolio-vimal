import { memo, useEffect, useRef } from "react";

interface StarFieldProps {
  density?: number;
  speed?: number;
  parallax?: number;
  className?: string;
}

export const StarField = memo(({ density = 0.00025, speed = 0.05, parallax = 30, className = "" }: StarFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Array<{ x: number; y: number; z: number; vx: number; vy: number }>>([]);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const draw = (ctx: CanvasRenderingContext2D, cssWidth: number, cssHeight: number) => {
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.fillStyle = "rgba(255,255,255,0.9)";

    const stars = starsRef.current;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const px = s.x + cssWidth / 2;
      const py = s.y + cssHeight / 2;
      const size = Math.max(0.8, 2.4 / s.z);
      ctx.globalAlpha = Math.min(1, 1.5 / s.z);
      ctx.fillRect(px, py, size, size);
    }
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = Math.max(window.innerWidth, document.documentElement.clientWidth || 0);
      const cssHeight = Math.max(window.innerHeight, document.documentElement.clientHeight || 0);
      sizeRef.current = { w: cssWidth, h: cssHeight };

      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      canvas.style.width = cssWidth + "px";
      canvas.style.height = cssHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor(cssWidth * cssHeight * density);
      starsRef.current = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const magnitude = speed * (0.4 + 0.6 * Math.random());
        return {
          x: Math.random() * cssWidth - cssWidth / 2,
          y: Math.random() * cssHeight - cssHeight / 2,
          z: Math.random() * 2 + 0.5,
          vx: Math.cos(angle) * magnitude,
          vy: Math.sin(angle) * magnitude,
        };
      });
    };

    handleResize();
    let raf: number;
    const loop = () => {
      const cssWidth = sizeRef.current.w;
      const cssHeight = sizeRef.current.h;
      draw(ctx, cssWidth, cssHeight);
      // motion + twinkle
      const halfW = cssWidth / 2;
      const halfH = cssHeight / 2;
      const wrapGap = 80;
      const jitterScale = speed * 0.01;
      const vMax = speed * 1.2;
      for (const s of starsRef.current) {
        // Depth oscillation for subtle size/alpha variance
        s.z -= speed * 0.002;
        if (s.z < 0.5) s.z = 2;

        // Random walk drift
        s.vx += (Math.random() - 0.5) * jitterScale;
        s.vy += (Math.random() - 0.5) * jitterScale;

        // Clamp velocity
        const vMag = Math.hypot(s.vx, s.vy);
        if (vMag > vMax) {
          s.vx = (s.vx / vMag) * vMax;
          s.vy = (s.vy / vMag) * vMax;
        }

        // Integrate position
        s.x += s.vx;
        s.y += s.vy;

        // Wrap-around so stars remain evenly distributed
        if (s.x > halfW + wrapGap) s.x = -halfW - wrapGap;
        if (s.x < -halfW - wrapGap) s.x = halfW + wrapGap;
        if (s.y > halfH + wrapGap) s.y = -halfH - wrapGap;
        if (s.y < -halfH - wrapGap) s.y = halfH + wrapGap;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [density, speed, parallax]);

  return <canvas ref={canvasRef} className={"fixed inset-0 z-0 pointer-events-none opacity-30 " + className} />;
});

export default StarField;


