import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Hairline reading-progress bar along the top edge of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1200] h-[2px] origin-left bg-gradient-to-r from-blue-700 via-blue-500 to-sky-300"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
