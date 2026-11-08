import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';
export default function Hero(){
 const ref=useRef<HTMLElement>(null); const reduce=useReducedMotion(); const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
 const scale=useTransform(scrollYProgress,[0,1],[1,1.8]); const leftX=useTransform(scrollYProgress,[0,.42,1],['0%','-52%','-76%']); const rightX=useTransform(scrollYProgress,[0,.42,1],['0%','52%','76%']); const glow=useTransform(scrollYProgress,[0,.35,.8],[0,.85,0]); const opacity=useTransform(scrollYProgress,[.65,1],[1,0]);
 return <section ref={ref} className="hero" aria-label="Wedding invitation cover">
  <div className="sky-cloud cloud-one"/><div className="sky-cloud cloud-two"/><div className="sky-cloud cloud-three"/><div className="sun-haze"/>
  <div className="hero-copy"><p className="hero-kicker">A celebration of love</p><h1>Nishant <i>weds</i> Diksha</h1><div className="hero-date">13 December 2026</div><div className="hero-rule"/></div>
  <motion.div className="temple-stage" style={reduce?undefined:{scale,opacity}}>
   <motion.div className="temple-half temple-left" style={reduce?undefined:{x:leftX}}><img src="/images/temple-gopuram.png" alt="Ornate South Indian temple gopuram" fetchPriority="high"/></motion.div>
   <motion.div className="temple-half temple-right" style={reduce?undefined:{x:rightX}}><img src="/images/temple-gopuram.png" alt="" aria-hidden="true" fetchPriority="high"/></motion.div>
   <motion.div className="portal-glow" style={reduce?{opacity:0}:{opacity:glow}}/>
  </motion.div>
  <motion.div className="scroll-cue" style={reduce?undefined:{opacity}}><span>Scroll to explore</span><ChevronDown size={17}/></motion.div>
 </section>
}
