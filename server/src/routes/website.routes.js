import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  addWebsite,
  getWebsites,
  removeWebsite,
} from "../controllers/website.controller.js";

const router = express.Router();

router.post("/", protect, addWebsite);
router.get("/", protect, getWebsites);
router.delete("/:id", protect, removeWebsite);

export default router;