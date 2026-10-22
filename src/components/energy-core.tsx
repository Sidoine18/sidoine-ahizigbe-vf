import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Lightweight faux-3D energy core: rotating rings + orbiting nodes, parallax on scroll. */
export function EnergyCore() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <motion.div ref={ref} style={{ y }} className="pointer-events-none relative aspect-square w-full">
      <motion.div
        style={{ rotate }}
        className="absolute inset-0 grid place-items-center [perspective:1000px]"
      >
        <div className="absolute size-[78%] animate-spin-slow rounded-full border border-primary/30 [transform:rotateX(72deg)]" />
        <div className="absolute size-[60%] animate-spin-slow rounded-full border border-accent/35 [animation-direction:reverse] [transform:rotateX(64deg)_rotateZ(28deg)]" />
        <div className="absolute size-[92%] rounded-full border border-border [transform:rotateX(78deg)_rotateZ(-15deg)]" />

        <div className="absolute size-[42%] rounded-full bg-primary/25 blur-2xl animate-pulse-glow" />
        <div className="absolute size-[26%] animate-float-slow rounded-full bg-gradient-to-br from-primary to-accent glow-ring" />

        {[0, 72, 144, 216, 288].map((deg, i) => (
          <div
            key={deg}
            className="absolute size-[70%] animate-spin-slow"
            style={{ transform: `rotate(${deg}deg)`, animationDuration: `${18 + i * 4}s` }}
          >
            <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_18px_var(--glow)]" />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
