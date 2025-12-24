import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Music Streaming App 🎵
      </h1>

      <p className="text-gray-400 mb-8">
        Stream music, listen to podcasts, and manage your playlists.
      </p>

      <div className="flex gap-4">
        <Link
          to="/music"
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded font-semibold"
        >
          🎶 Music
        </Link>

        <Link
          to="/podcasts"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded font-semibold"
        >
          🎙 Podcasts
        </Link>

        <Link
          to="/playlists"
          className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded font-semibold"
        >
          📂 Playlists
        </Link>
      </div>
    </div>
  );
};

export default Home;
