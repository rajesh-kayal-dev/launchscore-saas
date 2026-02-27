import express from "express";
import * as scanCtrl from "../controllers/scan.controller.js";
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post("/run", scanCtrl.runScan);
router.get("/dashboard", scanCtrl.fetchDashboard);
router.get("/archive", scanCtrl.fetchArchive);
router.delete("/:id", scanCtrl.removeScan);
router.get("/single/:id", protect, scanCtrl.fetchSingleScan);

export default router;