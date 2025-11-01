import { useEffect, useRef } from "react";

const BackgroundEffect = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let particles = [];
    const maxParticles = 60;
    const duration = 5000;
    let alpha = 1;

    if (isDark) {
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 3 + 1,
          s: Math.random() * 1 + 0.5,
        });
      }
    } else {
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 8 + 4,
          s: Math.random() * 0.8 + 0.3,
        });
      }
    }

    let animationFrame;
    const startTime = Date.now();

    const draw = () => {
      const elapsed = Date.now() - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (elapsed > duration) {
        alpha -= 0.02;
        if (alpha <= 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
        ctx.globalAlpha = alpha;
      }

      particles.forEach((p) => {
        if (isDark) {
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          p.y += p.s;
          if (p.y > canvas.height) p.y = 0;
        } else {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
          grad.addColorStop(0, "rgba(255,255,150,0.8)");
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          p.y -= p.s;
          if (p.y < -p.r) p.y = canvas.height;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

export default BackgroundEffect;
