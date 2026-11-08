import { useEffect, useRef, useState } from 'react';
import { Music2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const startMusic = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.log('Autoplay was blocked. Click the music button to play.');
      }
    };

    void startMusic();
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.error('Music playback failed:', error);
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
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <button
        className={`music-button ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause wedding music' : 'Play wedding music'}
        title={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? <Music2 size={17} /> : <VolumeX size={17} />}
        <span>{playing ? 'Music on' : 'Music'}</span>
      </button>
    </>
  );
}