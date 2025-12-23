import { useAudioPlayer } from "../context/AudioPlayerContext";

const MiniPlayer = () => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudioPlayer();

  if (!currentTrack) return null;

  return (
    <div
  style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#111827",
    color: "#fff",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
      <div>
        <strong>{currentTrack.title}</strong>
        <p style={{ margin: 0 }}>{currentTrack.artist}</p>
      </div>

      {isPlaying ? (
        <button onClick={pauseTrack}>Pause</button>
      ) : (
        <button onClick={() => playTrack(currentTrack)}>Play</button>
      )}
    </div>
  );
};

export default MiniPlayer;
