import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Music from "./pages/Music";
import Podcasts from "./pages/Podcasts";
import MiniPlayer from "./components/MiniPlayer";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user && (
        <nav
          style={{
            padding: "10px 20px",
            borderBottom: "1px solid #ccc",
            display: "flex",
            gap: "20px",
          }}
        >
          <Link to="/">Music</Link>
          <Link to="/podcasts">Podcasts</Link>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={user ? <Music /> : <Login />} />
        <Route
          path="/podcasts"
          element={user ? <Podcasts /> : <Login />}
        />
      </Routes>

      <MiniPlayer />
    </BrowserRouter>
  );
};

export default App;
