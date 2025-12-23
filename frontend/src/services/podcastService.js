const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getPodcasts = async () => {
  const res = await fetch(`${API_BASE}/api/podcasts`);
  if (!res.ok) throw new Error("Failed to fetch podcasts");
  return res.json();
};
