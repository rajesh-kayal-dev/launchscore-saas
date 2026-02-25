import {
  createWebsite,
  getUserWebsites,
  deleteWebsite,
} from "../services/website.service.js";

export const addWebsite = async (req, res) => {
  try {
    const { url, name } = req.body;

    const website = await createWebsite(req.user.id, url, name);

    res.status(201).json({
      success: true,
      website,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWebsites = async (req, res) => {
  try {
    const websites = await getUserWebsites(req.user.id);

    res.json({
      success: true,
      websites,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeWebsite = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteWebsite(id, req.user.id);

    res.json({
      success: true,
      message: "Website deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};