
export class TimeoutSlider {
  private callback: () => void;
  private remaining: number;
  private startTime: number | null = null;
  private timerId: NodeJS.Timeout | null = null;

  constructor(callback: () => void, duration: number) {
    this.callback = callback;
    this.remaining = duration;
  }

  public start() {
    if(this.timerId) return;
    this.clear();
    this.startTime = Date.now();
    this.timerId = setTimeout(this.callback, this.remaining);
  }

  public pause() {
    if (!this.startTime) {
      return;
    }
    this.clear();
    this.remaining -= (Date.now() - this.startTime);
  }

  public clear() {
    if(this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

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
  video.addEventListener('error', function() {
    console.error("Failed to load video");
    video.remove();
  });

  video.src = videoUrl;
}

export const getLocalVideoThumbnail = (videoFile:File, callback:(thumbnail:string)=>void) => {
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

  video.addEventListener('error', function() {
    console.error("Failed to load video");
    video.remove();
  });
  const videoUrl = URL.createObjectURL(videoFile);
  video.src = videoUrl;
}
