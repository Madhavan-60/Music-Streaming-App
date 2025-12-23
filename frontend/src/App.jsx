import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Music from "./pages/Music";
import MiniPlayer from "./components/MiniPlayer";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={user ? <Music /> : <Login />} />
      </Routes>

      {/* GLOBAL PLAYER */}
      <MiniPlayer />
    </BrowserRouter>
  );
};

export default App;
