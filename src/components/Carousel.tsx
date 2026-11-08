import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const photos = [
  {
    url: '/images/1.jpg',
    alt: 'Romantic wedding celebration with warm lights',
  },
  {
    url: '/images/3.jpg',
    alt: 'Elegant wedding ceremony details',
  },
  {
    url: '/images/4.jpg',
    alt: 'A couple celebrating their wedding',
  },
  {
    url: '/images/5.jpg',
    alt: 'A couple celebrating their wedding',
  },
  {
    url: '/images/6.jpg',
    alt: 'A couple celebrating their wedding',
  },
];
export default function Carousel() {
  const [index, setIndex] = useState(0);
  const change = (n: number) => setIndex((n + photos.length) % photos.length);
  return (
    <div className="photo-carousel">
      <div className="carousel-frame">
        <img src={photos[index].url} alt={photos[index].alt} loading="lazy" />
        <span className="photo-caption">A little glimpse of forever</span>
      </div>
      <div className="carousel-controls">
        <button onClick={() => change(index - 1)} aria-label="Previous photo">
          <ChevronLeft />
        </button>
        <div className="carousel-dots">
          {photos.map((p, i) => (
            <button
              key={p.url}
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={index === i}
              className={index === i ? 'active' : ''}
              onClick={() => change(i)}
            />
          ))}
        </div>
        <button onClick={() => change(index + 1)} aria-label="Next photo">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
