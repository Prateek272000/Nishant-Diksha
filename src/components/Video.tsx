import { Reveal, SectionHeading } from "./shared";
import { weddingData } from "../data/weddingData";

type VideoProps = {
  onPlaybackStart: () => void;
};

export default function Video({ onPlaybackStart }: VideoProps) {
  return (
    <section className="video-section section-pad">
      <Reveal>
        <SectionHeading
          eyebrow="A moment before the big day"
          title="A little preview of our love"
        />

        <div className="video-frame">
          <iframe
            src={weddingData.videoUrl}
            title="Nishant and Diksha Wedding Invitation"
            loading="lazy"
            width={560}
            height={315}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onFocus={onPlaybackStart}
          />
        </div>

        <div className="video-actions">
          <a
            href={weddingData.videoUrl.replace("/preview", "/view")}
            target="_blank"
            rel="noopener noreferrer"
            className="video-full-link"
          >
            Watch Full Video
          </a>
        </div>

        <p className="video-note">
          Our story, in moving pictures. More memories coming soon.
        </p>
      </Reveal>
    </section>
  );
}
