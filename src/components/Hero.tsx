import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const templeOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0.65, 1], [1, 0]);
  return (
    <section ref={ref} className="hero" aria-label="Wedding invitation cover">
      <div className="sky-cloud cloud-one" />
      <div className="sky-cloud cloud-two" />
      <div className="sky-cloud cloud-three" />
      <div className="sun-haze" />
      <div className="hero-copy">
        <p className="hero-kicker">A celebration of love</p>
        <h1>
          Nishant <i>weds</i> Diksha
        </h1>
      </div>
      <motion.div
        className="temple-stage"
        style={reduce ? undefined : { scale, opacity: templeOpacity }}
      >
        <img
          className="temple-image"
          src="/images/22.jpg"
          alt="Ornate South Indian temple gopuram"
          fetchPriority="high"
        />
      </motion.div>
      <motion.div
        className="scroll-cue"
        style={reduce ? undefined : { opacity }}
      >
        <span>Scroll to explore</span>
        <ChevronDown size={17} />
      </motion.div>
    </section>
  );
}
