const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayButton');
const volumeBtn = document.getElementById('jsVolumeButton');
const fullScreenBtn = document.getElementById('jsFullScreenButton');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
    // firefox
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
    // Chrome, Safari and Opera
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
    // IE/Edge
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener('click', goFullScreen);
  fullScreenBtn.addEventListener('click', exitFullScreen);
}

function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener('click', goFullScreen);
  if (document.exitFullScreen) {
    document.exitFullScreen();
    // firefox
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
    // Chrome, Safari and Opera
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
    // IE/Edge
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

const formatDate = (seconds) => {
  // 파라미터로 받은 초를 10진수로 변환해 저장
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
  // duration: 미디어의 길이를 초로 나타냄
  console.log('videoPlayer ---> ', videoPlayer);
  console.log('videoPlayer.duration ---> ', videoPlayer.duration);
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function init() {
  playBtn.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  fullScreenBtn.addEventListener('click', goFullScreen);
  videoPlayer.addEventListener('loadedmetadata', setTotalTime());
  videoPlayer.addEventListener('ended', handleEnded);
}

if (videoContainer) {
  init();
}
