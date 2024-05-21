document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.querySelector(".playBtn");
  const pauseBtn = document.querySelector(".pauseBtn");
  const stopBtn = document.querySelector(".stopBtn");
  const songSelect = document.getElementById("songSelect");
  const audioPlayer = document.getElementById("audioPlayer");
  const currentSongTitle = document.querySelector(".currentSong h3");

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

  audioPlayer.addEventListener("timeupdate", () => {
    const progressBar = document.querySelector(".progress-bar");
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });
});
