import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, SectionHeading } from './shared';
export default function DateReveal() {
  const [open, setOpen] = useState(false);
  return (
    <section className="date-reveal section-pad">
      <Reveal>
        <SectionHeading
          eyebrow="A day to remember"
          title="A little date to hold close"
        />
        <button
          className="date-seal"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Reveal the wedding date"
        >
          <span className="seal-top">SAVE THE DATE</span>
          <span className="seal-day">??</span>
          <span className="seal-month">DECEMBER · 2026</span>
          <span className="seal-bottom">{open ? '✧' : 'TAP TO REVEAL'}</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              className="revealed-date"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <span>Sunday</span>
              <strong>13 December 2026</strong>
              <span>Greater Noida · Uttar Pradesh</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
