import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Podcasts from "./pages/Podcasts";
import Playlists from "./pages/Playlists";
import AdminUpload from "./pages/AdminUpload";

import MiniPlayer from "./components/MiniPlayer";

import { useAuth } from "./context/AuthContext";
import { useAudioPlayer } from "./context/AudioPlayerContext";
import { getLastPlayed } from "./services/recentService";

const App = () => {
  const { user, signOut } = useAuth();     // ✅ FIXED
  const { playTrack } = useAudioPlayer();

  // 🔁 Resume playback (Day 9)
  useEffect(() => {
    const resume = async () => {
      if (!user) return;

      const last = await getLastPlayed(user.id);
      if (last?.track_id) {
        console.log("Last played available", last);
        // We resume when user presses play again
      }
    };

    resume();
  }, [user]);

  return (
    <BrowserRouter>
      {/* 🔝 NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        {/* LEFT */}
        <div className="flex gap-6">
          <Link className="hover:text-green-400" to="/">Home</Link>
          <Link className="hover:text-green-400" to="/music">Music</Link>
          <Link className="hover:text-green-400" to="/podcasts">Podcasts</Link>
          <Link className="hover:text-green-400" to="/playlists">Playlists</Link>
          <Link className="hover:text-green-400" to="/admin">Admin</Link>
        </div>

        {/* RIGHT */}
        <div>
          {user ? (
            <button
              onClick={signOut}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* 🧭 ROUTES */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/music" element={user ? <Music /> : <Login />} />
        <Route path="/podcasts" element={user ? <Podcasts /> : <Login />} />
        <Route path="/playlists" element={user ? <Playlists /> : <Login />} />
        <Route path="/admin" element={user ? <AdminUpload /> : <Login />} />
      </Routes>

      {/* 🎵 GLOBAL MINI PLAYER */}
      <MiniPlayer />
    </BrowserRouter>
  );
};

export default App;
