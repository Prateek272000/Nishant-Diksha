import { Instagram as InstagramIcon, Copy } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { Reveal, SectionHeading } from './shared';
export default function Instagram() {
  const copy = () => {
    void navigator.clipboard?.writeText(weddingData.couple.hashtag);
  };
  return (
    <section className="instagram-section section-pad">
      <Reveal>
        <SectionHeading
          eyebrow="Share the joy"
          title="A hashtag for our happily ever after"
        />
        <p className="story-copy">
          Capture your favourite moments and tag them with our wedding hashtag.
          We would love to see the celebration through your eyes.
        </p>
        <div className="hashtag">
          <InstagramIcon size={20} />
          <strong>{weddingData.couple.hashtag}</strong>
          <button onClick={copy} aria-label="Copy wedding hashtag">
            <Copy size={17} />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
