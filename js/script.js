const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");
const shuffleBtn = document.getElementById("shuffle");
const loopBtn = document.getElementById("loop");
const volumeSlider = document.getElementById("volume");
const songListContainer = document.getElementById("song-list");
let isShuffle = false;
let isLoop = false;

// Music
const songs = [
    {
    path:
      "media/billi(5).mp3",
    displayName: "Everything I Wanted",
    artist: "Billi Eilish",
    cover:
      "images/billi5.webp",
  },
    {
    path: "media/billi(2).mp3",
    displayName: "NDA",
    artist: "Billi Eilish",
    cover: "images/billi2.webp",
  },
  {
    path:
      "media/billi(1).mp3",
    displayName: "My Future",
    artist: "Billi Eilish",
    cover:
      "images/1.webp",
  },

  {
    path:
      "media/billi(3).mp3",
    displayName: "TV",
    artist: "Billi Eilish",
    cover:
      "images/billi3.webp",
  },
  {
    path:
      "media/billi(4).mp3",
    displayName: "Bury a Friend",
    artist: "Billi Eilish",
    cover:
      "images/billi4.webp",
  },

  {
    path:
      "media/billi(6).mp3",
    displayName: "Therefore I Am",
    artist: "Billi Eilish",
    cover:
      "images/billi6.webp",
  },
  {
    path:
      "media/dorcci.mp3",
    displayName: "Ghatle Amd",
    artist: "Dorcci",
    cover:
      "images/dorcci.webp",
  },
  {
    path:
      "media/dorcci2.mp3",
    displayName: "Before you Gone",
    artist: "Dorcci",
    cover:
      "images/dorcci2.webp",
  },
  {
    path:
      "media/massari.mp3",
    displayName: "Real Love",
    artist: "Massari",
    cover:
      "images/msri.webp",
  },
  {
    path:
      "media/pakzad.mp3",
    displayName: "Bombe",
    artist: "Sohrab Pakzad",
    cover:
      "images/pkzd.webp",
  },
  {
    path:
      "media/poobon1.mp3",
    displayName: "12:34",
    artist: "Poobon",
    cover:
      "images/poobon.webp",
  },
  {
    path:
      "media/poobon2.mp3",
    displayName: "Niloofar Abi",
    artist: "Poobon",
    cover:
      "images/poobon2.webp",
  },
  {
    path: "media/lady.mp3",
    displayName: "Die With A Smile",
    artist: "Lady Gaga",
    cover: "images/lady.webp",
  }
,
  {
    path: "media/beth.mp3",
    displayName: "Let Me Down Slowly",
    artist: "Beth",
    cover: "images/beth.webp",
  }
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

const playHandler = () => {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
}

// Play or Pause Event Listener
playBtn.onclick = playHandler

// Update DOM
function loadSong(song) {
  console.log(song);
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  if (isShuffle) {
    let randomIndex = Math.floor(Math.random() * songs.length);
    while (randomIndex === songIndex) {
      randomIndex = Math.floor(Math.random() * songs.length);
    }
    songIndex = randomIndex;
  } else {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  }

  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}

let isDragging = false;

progressContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  setProgress(e);
});

progressContainer.addEventListener("mousemove", (e) => {
  if (isDragging) {
    setProgress(e);
  }
});

progressContainer.addEventListener("mouseup", (e) => {
  if (isDragging) {
    setProgress(e);
    isDragging = false;
  }
});

progressContainer.addEventListener("mouseleave", () => {
  isDragging = false;
});

function setProgress(e) {
  const rect = progressContainer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const width = rect.width;
  const duration = music.duration;
  if (duration) {
    music.currentTime = (offsetX / width) * duration;
  }
}

function renderSongList() {
  songListContainer.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${song.displayName} - ${song.artist}</span>`;
    if (index === songIndex) li.classList.add("active-song");

    li.onclick = () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
      updateActiveSong();
    }

    songListContainer.appendChild(li);
  });
}

function updateActiveSong() {
  const lis = songListContainer.querySelectorAll("li");
  lis.forEach((li, index) => {
    li.classList.toggle("active-song", index === songIndex);
  });
}

renderSongList();

music.addEventListener("ended", () => {
  if (!isLoop) updateActiveSong();
});
// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", () => {
  if (isLoop) {
    music.currentTime = 0;
    playSong();
  } else {
    nextSong();
  }
});
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgress);
window.onkeyup = (event) => {
  console.log(event);
  event.code == 'Space' ? playHandler() : event.code == "ArrowRight" ? nextSong() : event.code == "ArrowLeft" ? prevSong() : ""
}
shuffleBtn.onclick = () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active");
};
loopBtn.onclick = () => {
  isLoop = !isLoop;
  loopBtn.classList.toggle("active");
};
volumeSlider.value = 0.7;
music.volume = 0.7;

volumeSlider.oninput = (e) => {
  music.volume = e.target.value;
};