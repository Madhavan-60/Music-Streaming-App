import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";

const AdminUpload = () => {
  const { user } = useAuth();

  // 🔒 Simple admin check (email-based)
  if (!user || user.email !== "admin@gmail.com") {
    return (
      <div className="p-10 text-red-400 text-lg">
        ❌ Access Denied — Admin Only
      </div>
    );
  }

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [category, setCategory] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !artist || !audioFile) {
      alert("Title, Artist and Audio file are required");
      return;
    }

    try {
      setLoading(true);

      /* ============================
         1️⃣ Upload AUDIO to Supabase Storage
         ============================ */
      const audioPath = `audio/${Date.now()}_${audioFile.name}`;

      const { error: audioError } = await supabase.storage
        .from("audio")
        .upload(audioPath, audioFile);

      if (audioError) throw audioError;

      const audioUrl = supabase.storage
        .from("audio")
        .getPublicUrl(audioPath).data.publicUrl;

      /* ============================
         2️⃣ Upload COVER (optional)
         ============================ */
      let coverUrl = null;

      if (coverFile) {
        const coverPath = `covers/${Date.now()}_${coverFile.name}`;

        const { error: coverError } = await supabase.storage
          .from("covers")
          .upload(coverPath, coverFile);

        if (coverError) throw coverError;

        coverUrl = supabase.storage
          .from("covers")
          .getPublicUrl(coverPath).data.publicUrl;
      }

      /* ============================
         3️⃣ SEND DATA TO BACKEND (NO RLS ISSUE)
         ============================ */
      const res = await fetch("http://localhost:5000/api/admin/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          artist,
          category,
          audio_url: audioUrl,
          cover_url: coverUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to insert track");
      }

      alert("✅ Track uploaded successfully");

      // Reset form
      setTitle("");
      setArtist("");
      setCategory("");
      setAudioFile(null);
      setCoverFile(null);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pb-24 max-w-xl text-white">
      <h2 className="text-2xl font-bold mb-4">Admin Upload</h2>

      <input
        className="w-full mb-3 bg-gray-800 border border-gray-600 p-2 rounded"
        placeholder="Song Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full mb-3 bg-gray-800 border border-gray-600 p-2 rounded"
        placeholder="Artist Name"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <input
        className="w-full mb-3 bg-gray-800 border border-gray-600 p-2 rounded"
        placeholder="Category (Pop, Rock, Melody...)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="file"
        accept="audio/*"
        className="mb-3 block"
        onChange={(e) => setAudioFile(e.target.files[0])}
      />

      <input
        type="file"
        accept="image/*"
        className="mb-4 block"
        onChange={(e) => setCoverFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded font-semibold"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default AdminUpload;
