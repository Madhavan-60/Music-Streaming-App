import express from "express";
import {
  savePlayback,
  getLastPlayed,
} from "../controllers/recentlyPlayedController.js";

const router = express.Router();

router.post("/", savePlayback);
router.get("/:userId", getLastPlayed);

export default router;
