const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const stopBtn = document.querySelector(".stopBtn");
const songSelect = document.getElementById("songSelect");
const audioPlayer = document.getElementById("audioPlayer");
const currentSongTitle = document.querySelector(".currentSong h3");
const volumeRange = document.getElementById("volumeRange");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress");

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
