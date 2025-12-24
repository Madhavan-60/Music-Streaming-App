const API = import.meta.env.VITE_API_BASE_URL;

export const savePlayback = async (user_id, track_id, last_position) => {
  await fetch(`${API}/api/recent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, track_id, last_position }),
  });
};

export const getLastPlayed = async (userId) => {
  const res = await fetch(`${API}/api/recent/${userId}`);
  return res.json();
};
