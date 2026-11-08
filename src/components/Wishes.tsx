import { useEffect, useState, type FormEvent } from 'react';
import { Reveal, SectionHeading } from './shared';
type Wish = { name: string; message: string; date: string };
export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    try {
      setWishes(
        JSON.parse(localStorage.getItem('nishant-diksha-wishes') || '[]'),
      );
    } catch {
      setWishes([]);
    }
  }, []);
  const add = (e: FormEvent) => {
    e.preventDefault();
    const next = [
      {
        name: name.trim(),
        message: message.trim(),
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      },
      ...wishes,
    ].slice(0, 30);
    setWishes(next);
    localStorage.setItem('nishant-diksha-wishes', JSON.stringify(next));
    setName('');
    setMessage('');
  };
  return (
    <section className="wishes-section section-pad">
      <Reveal>
        <SectionHeading
          eyebrow="A little love goes a long way"
          title="Leave us a wish"
        />
        <p className="story-copy">
          Share a blessing, a memory, or a few words for the journey ahead.
        </p>
        <form className="wish-form" onSubmit={add}>
          <label className="sr-only" htmlFor="wish-name">
            Your name
          </label>
          <input
            id="wish-name"
            required
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <label className="sr-only" htmlFor="wish-message">
            Your wishes
          </label>
          <textarea
            id="wish-message"
            required
            maxLength={280}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your wishes here..."
          />
          <button className="submit-button" type="submit">
            Share your wishes <span>→</span>
          </button>
        </form>
        <div className="wishes-wall" aria-live="polite">
          {wishes.length === 0 ? (
            <p className="empty-wishes">Your lovely wishes will appear here.</p>
          ) : (
            wishes.map((wish, i) => (
              <article className="wish-note" key={`${wish.date}-${i}`}>
                <span>“</span>
                <p>{wish.message}</p>
                <strong>{wish.name}</strong>
                <small>{wish.date}</small>
              </article>
            ))
          )}
        </div>
      </Reveal>
    </section>
  );
}
