const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const stopBtn = document.querySelector(".stopBtn");
const songSelect = document.getElementById("songSelect");
const audioPlayer = document.getElementById("audioPlayer");
const currentSongTitle = document.querySelector(".currentSong h3");
const volumeRange = document.getElementById("volumeRange");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress");
const canvas = document.getElementById("visualizationCanvas");
const canvasCtx = canvas.getContext("2d");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audioPlayer);

source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 256;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const loadSong = (song) => {
  audioPlayer.src = `assets/${song}`;
  currentSongTitle.textContent =
    songSelect.options[songSelect.selectedIndex].text;
};

loadSong(songSelect.value);

songSelect.addEventListener("change", () => {
  loadSong(songSelect.value);
});

playBtn.addEventListener("click", () => {
  audioPlayer.play();
  audioCtx.resume();
});

pauseBtn.addEventListener("click", () => {
  audioPlayer.pause();
});

stopBtn.addEventListener("click", () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
});

volumeRange.addEventListener("input", () => {
  audioPlayer.volume = volumeRange.value;
});

audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const totalWidth = rect.width;
  const seekTime = (offsetX / totalWidth) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

const visualize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  analyser.getByteFrequencyData(dataArray);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 50;

  dataArray.forEach((value, index) => {
    const angle = (index / bufferLength) * 2 * Math.PI;
    const barHeight = (value / 255) * 200;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    canvasCtx.beginPath();
    canvasCtx.arc(x, y, barHeight / 10, 0, 2 * Math.PI);
    canvasCtx.fillStyle = `rgb(${value + 100}, 50, 50)`;
    canvasCtx.fill();
  });

  requestAnimationFrame(visualize);
};

visualize();
