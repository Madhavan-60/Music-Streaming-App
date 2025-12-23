import { supabase } from "../config/supabaseClient.js";

export const createPlaylist = async (req, res) => {
  const { user_id, name } = req.body;
  const { data, error } = await supabase
    .from("playlists")
    .insert([{ user_id, name }])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const getUserPlaylists = async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const addTrackToPlaylist = async (req, res) => {
  const { playlist_id, track_id } = req.body;
  const { data, error } = await supabase
    .from("playlist_tracks")
    .insert([{ playlist_id, track_id }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
};

export const removeTrackFromPlaylist = async (req, res) => {
  const { playlist_id, track_id } = req.body;
  const { error } = await supabase
    .from("playlist_tracks")
    .delete()
    .eq("playlist_id", playlist_id)
    .eq("track_id", track_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
};
