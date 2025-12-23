import express from "express";
import {
  createPlaylist,
  getUserPlaylists,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
} from "../controllers/playlistController.js";

const router = express.Router();

router.post("/", createPlaylist);
router.get("/:userId", getUserPlaylists);
router.post("/add", addTrackToPlaylist);
router.post("/remove", removeTrackFromPlaylist);

export default router;
