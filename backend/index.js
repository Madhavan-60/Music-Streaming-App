import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import trackRoutes from "./src/routes/trackRoutes.js";
import podcastRoutes from "./src/routes/podcastRoutes.js";
import playlistRoutes from "./src/routes/playlistRoutes.js";
import recentlyPlayedRoutes from "./src/routes/recentlyPlayedRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tracks", trackRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/playlists", playlistRoutes);  
app.use("/api/recent", recentlyPlayedRoutes);


app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
