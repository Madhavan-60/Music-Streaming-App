const MusicCard = ({ track, isActive, isPlaying, onPlay, onPause }) => {
  return (
    <div
      style={{
        border: isActive ? "2px solid #4f46e5" : "1px solid #ccc",
        background: isActive ? "#eef2ff" : "#fff",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong>{track.title}</strong>
        <p style={{ margin: 0 }}>{track.artist}</p>
        <small>{track.category}</small>
      </div>

      {isActive && isPlaying ? (
        <button onClick={onPause}>Pause</button>
      ) : (
        <button onClick={onPlay}>Play</button>
      )}
    </div>
  );
};

export default MusicCard;
