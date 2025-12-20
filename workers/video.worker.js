import { Worker } from "bullmq";
import { redisConfig } from "../config/redis.js";
import { convertToHLS } from "../services/hls.service.js";
import Video from "../models/video.model.js";
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
connectDB();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

new Worker(
  "videoQueue",
  async (job) => {
    console.log(job)
    const { videoId, inputPath, outputDir } = job.data;
    try {
      await convertToHLS(inputPath, outputDir);

      // Upload HLS files to Cloudinary
      const files = fs.readdirSync(outputDir);
      console.log("HLS files:", files);
      const segmentUrls = {};

      // Upload segments
      for (const file of files) {
        if (file.endsWith('.ts')) {
          const filePath = path.join(outputDir, file);
          const result = await cloudinary.uploader.upload(filePath, {
            folder: `hls/${videoId}`,
            resource_type: 'video',
          });
          segmentUrls[file] = result.secure_url;
        }
      }

      // Read and update master.m3u8
      const m3u8Path = path.join(outputDir, 'master.m3u8');
      let m3u8Content = fs.readFileSync(m3u8Path, 'utf8');

      // Replace relative paths with Cloudinary URLs
      for (const [segment, url] of Object.entries(segmentUrls)) {
        m3u8Content = m3u8Content.replace(segment, url);
      }

      // Upload modified master.m3u8
      const m3u8Result = await cloudinary.uploader.upload(
        `data:text/plain;base64,${Buffer.from(m3u8Content).toString('base64')}`,
        {
          folder: `hls/${videoId}`,
          public_id: 'master.m3u8',
          resource_type: 'raw',
        }
      );

      // Update DB
      await Video.findByIdAndUpdate(videoId, {
        hlsUrl: m3u8Result.secure_url,
      });

      console.log("Video processed and uploaded to Cloudinary successfully");
    } catch (error) {
      console.error("Video processing failed:", error);
      throw error;
    }
  },
  redisConfig,
);
