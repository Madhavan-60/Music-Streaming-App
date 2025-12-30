import express from "express";
import { insertTrack } from "../controllers/adminController.js";

const router = express.Router();

router.post("/track", insertTrack);

export default router;
