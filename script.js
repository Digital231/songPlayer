document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.querySelector(".playBtn");
  const pauseBtn = document.querySelector(".pauseBtn");
  const stopBtn = document.querySelector(".stopBtn");
  const songSelect = document.getElementById("songSelect");
  const audioPlayer = document.getElementById("audioPlayer");
  const currentSongTitle = document.querySelector(".currentSong h3");

  songSelect.addEventListener("change", () => {
    const selectedSong = songSelect.value;
    audioPlayer.src = `assets/${selectedSong}`;
    currentSongTitle.textContent =
      songSelect.options[songSelect.selectedIndex].text;
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
