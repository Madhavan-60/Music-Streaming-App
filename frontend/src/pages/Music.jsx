import { useEffect, useState } from "react";
import { getTracks } from "../services/musicService";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const { playTrack, pauseTrack, currentTrack, isPlaying } = useAudioPlayer();

  useEffect(() => {
    getTracks().then(setTracks).catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Music</h2>

      {tracks.map((track) => (
        <div
          key={track.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <strong>{track.title}</strong>
            <p>{track.artist}</p>
          </div>

          {currentTrack?.id === track.id && isPlaying ? (
            <button onClick={pauseTrack}>Pause</button>
          ) : (
            <button onClick={() => playTrack(track)}>Play</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Music;
