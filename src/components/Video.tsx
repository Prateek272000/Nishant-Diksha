import { Reveal, SectionHeading } from "./shared";
import { weddingData } from "../data/weddingData";

type VideoProps = {
  onPlaybackStart: () => void;
};

export default function Video({ onPlaybackStart }: VideoProps) {
  const embedUrl = new URL(weddingData.videoUrl);
  embedUrl.searchParams.set("enablejsapi", "1");
  embedUrl.searchParams.set("origin", window.location.origin);
  const videoId = embedUrl.pathname.split("/").pop();
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <section className="video-section section-pad">
      <Reveal>
        <SectionHeading
          eyebrow="A moment before the big day"
          title="A little preview of our love"
        />

        <div className="video-frame">
          <iframe
            src={embedUrl.toString()}
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
            href={watchUrl}
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
