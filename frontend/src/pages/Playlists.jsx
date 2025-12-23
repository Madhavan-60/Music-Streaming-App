import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createPlaylist,
  getUserPlaylists,
} from "../services/playlistService";

const Playlists = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const load = async () => {
    const data = await getUserPlaylists(user.id);
    setPlaylists(data);
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  const handleCreate = async () => {
    if (!name) return;
    await createPlaylist(user.id, name);
    setName("");
    load();
  };

  return (
    <div className="p-6 pb-24">
      <h2 className="text-2xl font-bold mb-4">Playlists</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="bg-gray-800 border border-gray-600 px-3 py-2 rounded text-white"
          placeholder="New playlist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {playlists.map((p) => (
        <div
          key={p.id}
          className="bg-gray-800 p-4 rounded mb-2"
        >
          {p.name}
        </div>
      ))}
    </div>
  );
};

export default Playlists;
