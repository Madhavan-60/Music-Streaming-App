import { createContext, useContext, useRef, useState, useEffect } from "react";
import { savePlayback } from "../services/recentService";
import { useAuth } from "./AuthContext";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useAuth();

  const playTrack = (track, startTime = 0) => {
    if (!track) return;

    if (currentTrack?.id !== track.id) {
      audioRef.current.src = track.audio_url;
      audioRef.current.currentTime = startTime;
      setCurrentTrack(track);
    }

    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Save playback position every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (user && currentTrack && !audioRef.current.paused) {
        savePlayback(
          user.id,
          currentTrack.id,
          Math.floor(audioRef.current.currentTime)
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user, currentTrack]);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        audioRef,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
