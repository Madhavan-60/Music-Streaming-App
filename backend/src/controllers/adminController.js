import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const insertTrack = async (req, res) => {
  const { title, artist, category, audio_url, cover_url } = req.body;

  const { error } = await supabase.from("tracks").insert([
    { title, artist, category, audio_url, cover_url }
  ]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ success: true });
};
