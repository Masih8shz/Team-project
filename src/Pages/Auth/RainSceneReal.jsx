import { useEffect, useRef } from "react";

const RainSceneReal = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const dropsRef = useRef([]);
  const splashesRef = useRef([]);
  const peopleRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const createDrops = (count = 200) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dropsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        length: 8 + Math.random() * 25,
        speed: 300 + Math.random() * 900,
        wind: -0.3 + Math.random() * 0.6,
        opacity: 0.3 + Math.random() * 0.5,
      }));
    };

    const randomUmbrellaColor = () => {
      const colors = [
        "#60a5fa", // blue
        "#6366f1", // indigo
        "#10b981", // green
        "#f59e0b", // amber
        "#ef4444", // red
        "#ec4899", // pink
        "#8b5cf6", // violet
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const createPeople = () => {
      const count = 3 + Math.floor(Math.random() * 3); // 3 تا 5 نفر
      const h = window.innerHeight;
      const arr = [];
      for (let i = 0; i < count; i++) {
        const fromLeft = Math.random() > 0.5;
        arr.push({
          x: fromLeft ? -100 - Math.random() * 200 : window.innerWidth + 100 + Math.random() * 200,
          y: h - 180 + Math.random() * 40,
          dir: fromLeft ? 1 : -1,
          speed: 30 + Math.random() * 40,
          step: Math.random() * Math.PI * 2,
          color: randomUmbrellaColor(),
        });
      }
      peopleRef.current = arr;
    };

    createDrops();
    createPeople();

    let last = performance.now();

    const drawPerson = (ctx, person, delta) => {
      const { x, y, dir, step, color } = person;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(dir, 1);

      // سایه
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.beginPath();
      ctx.ellipse(0, 46, 25, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // بدن
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(0, 28);
      ctx.stroke();

      // پاها
      const legMove = Math.sin(step * 2) * 5;
      ctx.beginPath();
      ctx.moveTo(0, 28);
      ctx.lineTo(-6 + legMove, 46);
      ctx.moveTo(0, 28);
      ctx.lineTo(6 - legMove, 46);
      ctx.stroke();

      // دست
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#9ca3af";
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.lineTo(10, -15);
      ctx.stroke();

      // چتر
      const sway = Math.sin(step * 1.5) * 3;
      const umbrellaX = 10 + sway;
      const umbrellaY = -55;
      const r = 40;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.moveTo(10, -15);
      ctx.lineTo(umbrellaX, umbrellaY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(10 - r, -55);
      ctx.quadraticCurveTo(umbrellaX, -80, 10 + r, -55);
      const grad = ctx.createLinearGradient(10 - r, -80, 10 + r, -40);
      grad.addColorStop(0, color);
      grad.addColorStop(1, "#1e3a8a");
      ctx.fillStyle = grad;
      ctx.fill();

      // سر
      ctx.beginPath();
      ctx.arc(0, -16, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#f3f4f6";
      ctx.fill();

      // چهره
      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.arc(-2.5, -17, 0.8, 0, Math.PI * 2);
      ctx.arc(2.5, -17, 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = "#111827";
      ctx.lineWidth = 1;
      ctx.arc(0, -14, 2, 0, Math.PI);
      ctx.stroke();

      ctx.restore();

      person.step += delta * 2.5;
      person.x += dir * person.speed * delta;

      // خروج از صفحه و ورود از سمت دیگر
      if (dir === 1 && person.x > window.innerWidth + 100)
        person.x = -100;
      else if (dir === -1 && person.x < -100)
        person.x = window.innerWidth + 100;

      return { x: person.x + dir * umbrellaX, y: person.y + umbrellaY, r };
    };

    const drawSplashes = (ctx, delta) => {
      splashesRef.current.forEach((s) => {
        s.x += s.vx * delta;
        s.y += s.vy * delta;
        s.vy += 100 * delta;
        s.life -= delta;
      });
      splashesRef.current = splashesRef.current.filter((s) => s.life > 0);
      ctx.fillStyle = "rgba(180,210,255,0.6)";
      for (const s of splashesRef.current) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = (t) => {
      const now = t || performance.now();
      const delta = (now - last) / 1000;
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = "#061424";
      ctx.fillRect(0, 0, w, h);

      // باران
      for (let d of dropsRef.current) {
        d.y += d.speed * delta;
        d.x += d.wind;
        if (d.y > h + d.length) {
          d.y = -10;
          d.x = Math.random() * w;
        }
      }

      // آدم‌ها
      const umbrellas = peopleRef.current.map((p) => drawPerson(ctx, p, delta));

      // برخورد قطرات
      for (let d of dropsRef.current) {
        let hit = false;
        for (const umb of umbrellas) {
          const dx = d.x - umb.x;
          const dy = d.y - umb.y;
          if (dx * dx + dy * dy < umb.r * umb.r * 0.8 && dy > -umb.r * 0.4) {
            for (let i = 0; i < 4; i++) {
              splashesRef.current.push({
                x: d.x,
                y: d.y,
                vx: (Math.random() - 0.5) * 100,
                vy: -100 - Math.random() * 150,
                life: 0.4 + Math.random() * 0.4,
                size: 1 + Math.random() * 1.2,
              });
            }
            hit = true;
            break;
          }
        }
        if (hit) {
          d.y = -10;
          d.x = Math.random() * w;
        } else {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(170,200,255,${d.opacity})`;
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + d.wind, d.y + d.length);
          ctx.stroke();
        }
      }

      drawSplashes(ctx, delta);
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="rain-canvas" />;
};

export default RainSceneReal;
