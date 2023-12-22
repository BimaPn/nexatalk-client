
export const getVideoThumbnail = (videoUrl:string, callback:(thumbnail:string)=>void) => {
  const video = document.createElement('video');
  video.crossOrigin = 'anonymous';
  video.addEventListener('loadeddata', function() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);

    const thumbnailDataUrl = canvas.toDataURL('image/jpeg');
    callback(thumbnailDataUrl);

    video.remove();
    canvas.remove();
  });
  video.src = videoUrl;
}
