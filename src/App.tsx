import { useState } from "react";
import Hero from "./components/Hero";
import Invitation from "./components/Invitation";
import DateReveal from "./components/DateReveal";
import Functions from "./components/Functions";
import Couple from "./components/Couple";
import Instagram from "./components/Instagram";
import Video from "./components/Video";
import Countdown from "./components/Countdown";
import ThingsToKnow from "./components/ThingsToKnow";
import RSVP from "./components/RSVP";
import Wishes from "./components/Wishes";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";

export default function App() {
  const [videoActive, setVideoActive] = useState(false);

  return (
    <>
      <a className="skip-link" href="#invitation">
        Skip to invitation
      </a>
      <div id="top">
        <Hero />
      </div>
      <main>
        <Invitation />
        <DateReveal />
        <Functions />
        <Couple />
        <Instagram />
        <Video onPlaybackStart={() => setVideoActive(true)} />
        <Countdown />
        <ThingsToKnow />
      </main>
      <Footer />
      <MusicPlayer videoActive={videoActive} />
    </>
  );
}
