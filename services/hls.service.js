import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath);

export const convertToHLS = (input, outputDir) => {
  return new Promise((resolve, reject) => {
    const fullOutputDir = path.resolve(outputDir);
    if (!fs.existsSync(fullOutputDir)) {
      fs.mkdirSync(fullOutputDir, { recursive: true });
    }
    ffmpeg(input)
      .addOptions([
        "-profile:v main",
        "-start_number 0",
        "-hls_time 6",
        "-hls_list_size 0",
        "-f hls",
      ])
      .output(`${fullOutputDir}/master.m3u8`)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
};
