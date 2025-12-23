const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getTracks = async () => {
  const res = await fetch(`${API_BASE}/api/tracks`);
  if (!res.ok) throw new Error("Failed to fetch tracks");
  return res.json();
};
