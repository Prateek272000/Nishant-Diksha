import { MapPin, Phone, Bell, ExternalLink } from 'lucide-react';
import { Reveal, SectionHeading } from './shared';
import { weddingData } from '../data/weddingData';
export default function ThingsToKnow() {
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(weddingData.venue)}`;
  return (
    <section className="things-section section-pad">
      <Reveal>
        <SectionHeading
          eyebrow="A few helpful details"
          title="Things to Know"
        />
        <div className="things-grid">
          <article className="thing-card">
            <MapPin />
            <h3>Find the venue</h3>
            <p>{weddingData.venue}</p>
            <a href={map} target="_blank" rel="noreferrer">
              Get directions <ExternalLink size={13} />
            </a>
          </article>
          <article className="thing-card">
            <Phone />
            <h3>Need a hand?</h3>
            <p>{weddingData.contact}</p>
            <span className="detail-muted">
              Family contact details can be added here.
            </span>
          </article>
          <article className="thing-card">
            <Bell />
            <h3>Save the date</h3>
            <p>
              Keep 13 December 2026 free for a day filled with love, laughter
              and celebration.
            </p>
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nishant%20weds%20Diksha&dates=20261213T123000Z/20261213T183000Z&details=Wedding%20celebrations%20in%20Greater%20Noida"
              target="_blank"
              rel="noreferrer"
            >
              Add to calendar <ExternalLink size={13} />
            </a>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
