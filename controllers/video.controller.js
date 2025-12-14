import { videoQueue } from "../queues/video.queue.js";
import Video from "../models/video.model.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }
    const video = new Video({
      title,
      url: req.file.path, 
      uploadedBy: req.user.userId,
    });
    await video.save();

    await videoQueue.add("hls-convert", {
      videoId: video._id,
      inputPath: req.file.path,
      outputDir: `hls/${Date.now()}`,
    });

    res.json({
      message: "Video uploaded. Processing started.",
      videoId: video._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ uploadedBy: req.user.userId }).populate(
      "uploadedBy",
      "email",
    );
    res.json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch videos", error: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "uploadedBy",
      "email",
    );
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch video", error: error.message });
  }
};
