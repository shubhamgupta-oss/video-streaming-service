# Video-Streaming-Platform

A full-stack video streaming platform built using **Node.js**, **Express**, **Cloudinary**, **MongoDB**, and **React**.  
This project demonstrates an end-to-end pipeline for **video upload, conversion to HLS (.m3u8)** format, and **adaptive video playback** on the frontend.

---

## 🚀 Features

- Upload video files from client to backend
- Convert videos to **HLS (.m3u8)** format for adaptive streaming
- Store processed video URLs in **MongoDB**
- Stream videos using a **custom HTML5 video player** in React
- Cloud-based video storage and delivery using **Cloudinary**
- Scalable backend architecture suitable for OTT and media platforms

---

## 🗂️ Project Structure

├── config/
├── controllers/
├── hls/
├── middlewares/
├── models/
├── queues/
├── routes/
├── services/
├── workers/
├── app.js
├── server.js
├── package.json
└── README.md


---

## 🛠️ Tech Stack

- **Node.js & Express** – Backend API and video processing
- **Cloudinary** – Video storage, transcoding, and CDN delivery
- **MongoDB** – Storing video metadata and streaming URLs
- **React.js** – Frontend video playback UI
- **HTML5 Video Player**
- **HLS (HTTP Live Streaming)** – Adaptive bitrate streaming

---

## 🔄 How It Works

1. User uploads a video file
2. Backend converts video/audio (MP4/MP3) into **HLS (.m3u8)**
3. Processed video files are uploaded to **Cloudinary**
4. HLS URLs are saved in **MongoDB**
5. Frontend fetches the HLS URL and plays it using an HTML5 video player in React

---

## 🧪 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Cloudinary account

---

### Installation

```bash
git clone https://github.com/shubhamgupta-oss/video-streaming-platform.git
cd video-streaming-platform
npm install

```

Create a .env file in the root directory:


```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

Run the Application

```bash

npm start
```

### Use Case

- **OTT platforms
- **Media streaming applications
- **AI/ML video processing pipelines
- **SaaS video-based products


