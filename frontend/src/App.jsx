import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Music from "./pages/Music";
import Podcasts from "./pages/Podcasts";
import MiniPlayer from "./components/MiniPlayer";
import { useAuth } from "./context/AuthContext";
import Playlists from "./pages/Playlists";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useAudioPlayer } from "./context/AudioPlayerContext";
import { getLastPlayed } from "./services/recentService";


const App = () => {
  const { user } = useAuth();
  const { playTrack } = useAudioPlayer();

useEffect(() => {
  const resume = async () => {
    if (!user) return;

    const last = await getLastPlayed(user.id);
    if (last?.track_id) {
      // We only restore when user clicks play again
      console.log("Last played available", last);
    }
  };

  resume();
}, [user]);


  return (
    <BrowserRouter>
      {user && (
     <nav className="flex gap-6 px-6 py-4 border-b border-gray-700">
  <Link className="hover:text-green-400" to="/">Home</Link>
  <Link className="hover:text-green-400" to="/music">Music</Link>
  <Link className="hover:text-green-400" to="/podcasts">Podcasts</Link>
  <Link className="hover:text-green-400" to="/playlists">Playlists</Link>
</nav>
      )}

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={user ? <Home /> : <Login />} />
      <Route path="/music" element={user ? <Music /> : <Login />} />
      <Route path="/podcasts" element={user ? <Podcasts /> : <Login />} />
      <Route path="/playlists" element={user ? <Playlists /> : <Login />} />
    </Routes>


      <MiniPlayer />
    </BrowserRouter>
  );
};

export default App;
