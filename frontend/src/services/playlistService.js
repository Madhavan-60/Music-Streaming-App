const API = import.meta.env.VITE_API_BASE_URL;

export const createPlaylist = async (user_id, name) => {
  const res = await fetch(`${API}/api/playlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, name }),
  });
  return res.json();
};

export const getUserPlaylists = async (userId) => {
  const res = await fetch(`${API}/api/playlists/${userId}`);
  return res.json();
};

export const addTrackToPlaylist = async (playlist_id, track_id) => {
  await fetch(`${API}/api/playlists/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playlist_id, track_id }),
  });
};
