import { Reveal, Ornament } from './shared';
import { weddingData } from '../data/weddingData';
export default function Invitation() {
  return (
    <section className="invitation section-pad" id="invitation">
      <Reveal>
        <div className="ganesh" aria-label="Auspicious symbol">
          ॐ<br />
          <small>श्री गणेशाय नमः</small>
        </div>
        <Ornament />
        <p className="eyebrow">With the blessings of our families</p>
        <div className="family-row">
          <span>{weddingData.families.groom}</span>
          <span className="amp">&</span>
          <span>{weddingData.families.bride}</span>
        </div>
        <p className="invite-word">request the pleasure of your company</p>
        <h2 className="couple-names">
          {weddingData.couple.groom}
          <em> & </em>
          {weddingData.couple.bride}
        </h2>
        <p className="invite-sub">as they begin their forever together</p>
        <Ornament />
        <p className="eyebrow">On Sunday</p>
        <p className="invitation-date">13 · 12 · 2026</p>
      </Reveal>
    </section>
  );
}
