# Video-Streaming-Platform

A full-stack video streaming platform built using **Node.js**, **Express**, **Cloudinary**, **MongoDB**, **React**, and a **queue-based background processing system**.  
This project demonstrates an end-to-end pipeline for **video upload, asynchronous video conversion to HLS (.m3u8)**, and **adaptive video playback** on the frontend.

---

## 🚀 Features

- Upload video/audio files from client to backend
- **Queue-based video processing** for heavy tasks (non-blocking)
- Convert videos/audio (MP4 / MP3) to **HLS (.m3u8)** format
- Background workers for media processing
- Store processed video URLs in **MongoDB**
- Stream videos using a **custom HTML5 video player** in React
- Cloud-based video storage and delivery using **Cloudinary**
- Scalable architecture suitable for OTT & media platforms

---

## 🗂️ Project Structure

```bash
├── config/
├── controllers/
├── hls/
├── middlewares/
├── models/
├── queues/ # Queue definitions (BullMQ / jobs)
├── workers/ # Background workers for video processing
├── routes/
├── services/
├── app.js
├── server.js
├── package.json
└── README.md
```


---

## 🛠️ Tech Stack

- **Node.js & Express** – Backend APIs
- **BullMQ (Queue System)** – Background job processing for video conversion
- **Cloudinary** – Media storage, transcoding, and CDN delivery
- **MongoDB** – Store video metadata and HLS URLs
- **React.js** – Frontend UI and playback
- **HTML5 Video Player**
- **HLS (HTTP Live Streaming)** – Adaptive bitrate streaming

---

## ⚙️ Why Queue System?

Video processing is a **CPU-intensive and time-consuming task**.  
To avoid blocking API requests, this project uses a **queue system**:

- Upload request responds quickly
- Video conversion runs **asynchronously**
- Workers handle HLS generation in the background
- Improves scalability and reliability

---

## 🔄 How It Works

1. User uploads a video/audio file
2. Backend pushes a **job to the queue**
3. Worker picks the job and converts media into **HLS (.m3u8)**
4. Converted files are uploaded to **Cloudinary**
5. HLS URLs are saved in **MongoDB**
6. Frontend fetches the HLS URL and streams it via HTML5 player

---

## 🧪 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Cloudinary account
- Redis (for queue management)

---

### Installation

```bash
git clone https://github.com/shubhamgupta-oss/video-streaming-platform.git
cd video-streaming-platform
npm install
```

### Create a .env file:


```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

REDIS_HOST=localhost
REDIS_PORT=6379

```


### Use Cases

- OTT video platforms
- Media streaming applications
- AI/ML video processing pipelines
- SaaS video-based products
- Large file processing systems using queues
