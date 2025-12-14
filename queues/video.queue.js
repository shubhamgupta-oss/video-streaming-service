import { Queue } from "bullmq";
import { redisConfig } from "../config/redis.js";

export const videoQueue = new Queue("videoQueue", redisConfig);
