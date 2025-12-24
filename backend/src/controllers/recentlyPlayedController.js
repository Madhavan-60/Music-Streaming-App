import { supabase } from "../config/supabaseClient.js";

// Save or update playback position
export const savePlayback = async (req, res) => {
  const { user_id, track_id, last_position } = req.body;

  const { error } = await supabase
    .from("recently_played")
    .upsert(
      { user_id, track_id, last_position },
      { onConflict: ["user_id", "track_id"] }
    );

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
};

// Get last played track
export const getLastPlayed = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("recently_played")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  if (error) return res.json(null);
  res.json(data);
};
