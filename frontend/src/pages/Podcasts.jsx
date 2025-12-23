import { useEffect, useState } from "react";
import { getPodcasts } from "../services/podcastService";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const { playTrack, pauseTrack, currentTrack, isPlaying } =
    useAudioPlayer();

  useEffect(() => {
    getPodcasts().then(setPodcasts).catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px", paddingBottom: "80px" }}>
      <h2>Podcasts</h2>

      {podcasts.map((podcast) => (
        <div
          key={podcast.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <strong>{podcast.title}</strong>
            <p style={{ margin: 0 }}>Host: {podcast.host}</p>
            <small>{podcast.category}</small>
          </div>

          {currentTrack?.id === podcast.id && isPlaying ? (
            <button onClick={pauseTrack}>Pause</button>
          ) : (
            <button onClick={() => playTrack(podcast)}>Play</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Podcasts;
