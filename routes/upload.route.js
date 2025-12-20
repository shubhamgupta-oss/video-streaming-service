const formats = JSON.parse(req.body.formats);

if (formats.hls) {
  queue.add('hls', { videoId });
}

if (formats.dash) {
  queue.add('dash', { videoId });
}
