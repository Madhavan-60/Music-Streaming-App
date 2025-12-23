import { useEffect, useState } from "react";
import { getTracks } from "../services/musicService";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import MusicCard from "../components/MusicCard";

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const [category, setCategory] = useState("All");

  const { playTrack, pauseTrack, currentTrack, isPlaying } =
    useAudioPlayer();

  useEffect(() => {
    getTracks().then(setTracks).catch(console.error);
  }, []);

  const categories = ["All", ...new Set(tracks.map((t) => t.category))];

  const filteredTracks =
    category === "All"
      ? tracks
      : tracks.filter((t) => t.category === category);

  return (
    <div style={{ padding: "20px", paddingBottom: "80px" }}>
      <h2>Music</h2>

      {/* CATEGORY FILTER */}
      <div style={{ marginBottom: "15px" }}>
        <label>Category: </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* MUSIC LIST */}
      {filteredTracks.map((track) => (
        <MusicCard
          key={track.id}
          track={track}
          isActive={currentTrack?.id === track.id}
          isPlaying={isPlaying}
          onPlay={() => playTrack(track)}
          onPause={pauseTrack}
        />
      ))}
    </div>
  );
};

export default Music;
