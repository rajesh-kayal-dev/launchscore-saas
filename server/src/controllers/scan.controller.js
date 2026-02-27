import * as scanService from "../services/scan.service.js";
import prisma from "../config/prisma.js";

export const runScan = async (req, res) => {
  try {
    const { url } = req.body;
    const scan = await scanService.createScan(req.user.id, url);
    res.status(201).json({ success: true, data: scan });
  } catch (error) {
    res.status(500).json({ success: false, message: "Scan failed" });
  }
};

export const fetchDashboard = async (req, res) => {
  try {
    const scans = await scanService.getDashboardScans(req.user.id);
    const stats = {
      total: scans.length,
      avg: scans.length > 0 ? Math.round(scans.reduce((acc, s) => acc + s.score, 0) / scans.length) : 0,
      latest: scans[0] || null
    };
    res.status(200).json({ success: true, data: scans, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Dashboard error" });
  }
};

export const fetchArchive = async (req, res) => {
  try {
    const { search } = req.query;
    const scans = await scanService.getAllScans(req.user.id, search);
    res.status(200).json({ success: true, data: scans });
  } catch (error) {
    res.status(500).json({ success: false, message: "Archive error" });
  }
};

export const removeScan = async (req, res) => {
  try {
    await scanService.deleteScanRecord(req.user.id, req.params.id);
    res.status(200).json({ success: true, message: "Scan record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete operation failed" });
  }
};

export const fetchSingleScan = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const scan = await prisma.scan.findUnique({
      where: { 
        id: id,
        userId: userId 
      }
    });

    if (!scan) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    return res.status(200).json({ success: true, data: scan });
  } catch (error) {
    console.error("Fetch Single Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};