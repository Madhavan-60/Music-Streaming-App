const MusicCard = ({ track, isActive, isPlaying, onPlay, onPause }) => {
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg mb-4 
      ${isActive ? "bg-gray-700 border border-green-400" : "bg-gray-800"}
      `}
    >
      <div>
        <h3 className="text-white font-semibold">{track.title}</h3>
        <p className="text-gray-400 text-sm">{track.artist}</p>
        <span className="text-gray-500 text-xs">{track.category}</span>
      </div>

      {isActive && isPlaying ? (
        <button
          onClick={onPause}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Pause
        </button>
      ) : (
        <button
          onClick={onPlay}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Play
        </button>
      )}
    </div>
  );
};

export default MusicCard;
