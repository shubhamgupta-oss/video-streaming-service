import "./config/env.js";

import app from "./app.js";
import { connectDB } from "./config/db.js";
import "./workers/video.worker.js";

connectDB();
app.listen(process.env.PORT, () => console.log("🚀 Server running"));
