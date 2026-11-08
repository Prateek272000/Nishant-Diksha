import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";

type MusicPlayerProps = {
  videoActive: boolean;
};

export default function MusicPlayer({ videoActive }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [needsUserGesture, setNeedsUserGesture] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const videoActiveRef = useRef(videoActive);
  videoActiveRef.current = videoActive;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    let active = true;

    const startMusic = async () => {
      try {
        await audio.play();
        if (active) setNeedsUserGesture(false);
      } catch {
        if (active) setNeedsUserGesture(true);
      }
    };

    const handleUserInteraction = (event: Event) => {
      document.removeEventListener("pointerdown", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("click", handleUserInteraction);

      const target = event.target;
      if (
        target instanceof Element &&
        (buttonRef.current?.contains(target) ||
          target.closest(".video-frame"))
      ) {
        return;
      }

      if (!videoActiveRef.current) void startMusic();
    };

    document.addEventListener("pointerdown", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);
    document.addEventListener("click", handleUserInteraction);
    void startMusic();

    return () => {
      active = false;
      document.removeEventListener("pointerdown", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (!videoActive) return;

    audioRef.current?.pause();
  }, [videoActive]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
        setNeedsUserGesture(false);
      } catch (error) {
        setNeedsUserGesture(true);
        console.error("Music playback failed:", error);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/wedding-music.mp3"
        autoPlay
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <button
        ref={buttonRef}
        className={`music-button ${playing ? "is-playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Pause wedding music" : "Play wedding music"}
        title={playing ? "Pause music" : "Play music"}
      >
        {playing ? <Music2 size={17} /> : <VolumeX size={17} />}
        <span>
          {playing ? "Music on" : needsUserGesture ? "Tap for music" : "Music"}
        </span>
      </button>
    </>
  );
}
