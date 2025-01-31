var playingNow;
var userWants;
var j = 1;
playingNow = new Audio("songs/sunflower.mp3"); //default song
playingNow.addEventListener("ended", () => {
  if (queue.length === 0) {
    document.getElementById("nextSong").innerHTML = songsDatabase[j + 1];
    songPlayer(songsDatabase[j++]);
  } else {
    songPlayer(queue[0]);
    if (queue.length == 1)
      document.getElementById("nextSong").innerHTML = songsDatabase[j];
    else document.getElementById("nextSong").innerHTML = queue[1];

    const list = document.getElementById("Qhead");
    if (list.hasChildNodes()) {
      list.removeChild(list.children[0]);
    }
    queue.shift();
  }
});

function songPlayer(currentSong) {
  if (!playingNow.paused) {
    playingNow.pause();
    playingNow.currentTime = 0;
  }
  if (dataBaseSearcher(currentSong)) {
    playingNow = new Audio("songs/" + currentSong + ".mp3");
    playingNow.play();
    playingNow.addEventListener("ended", () => {
      if (queue.length === 0) {
        if (j === songsDatabase.length) j = 0;
        if (j == 5)
          document.getElementById("nextSong").innerHTML = songsDatabase[0];
        else {
          document.getElementById("nextSong").innerHTML = songsDatabase[j + 1];
        }
        songPlayer(songsDatabase[j++]);
      } else {
        songPlayer(queue[0]);

        if (queue.length == 1)
          document.getElementById("nextSong").innerHTML = songsDatabase[j];
        else document.getElementById("nextSong").innerHTML = queue[1];

        const list = document.getElementById("Qhead");
        if (list.hasChildNodes()) {
          list.removeChild(list.children[0]);
        }
        queue.shift();
      }
    });
  } else return 1;
}

var songsDatabase = [
  "sunflower",
  "blindingLights",
  "industryBaby",
  "OneKiss",
  "LoveMeLikeYouDo",
  "Dandelions",
];

function dataBaseSearcher(Song) {
  for (var i = 0; i < songsDatabase.length; i++) {
    if (Song.toLowerCase() == songsDatabase[i].toLowerCase()) {
      document.getElementById("songName").innerHTML = Song;
      return 1;
    }
  }
  return 0;
}

for (var i = 0; i < songsDatabase.length; i++) {
  document.getElementById(i).addEventListener("click", (event) => {
    var currentSong = event.target.innerHTML;
    songPlayer(currentSong);
    document.getElementById("songName").innerHTML = currentSong;
    if(!playingNow.paused)
    document.getElementById("Icon").className = "fa-regular fa-circle-pause";
  });
}

document.getElementById("play").addEventListener("click", () => {
  if (playingNow.paused) {
    playingNow.play();
  } else playingNow.pause();
});

function iconChange() {
  if (document.getElementById("Icon").className == "fa-regular fa-circle-play")
    document.getElementById("Icon").className = "fa-regular fa-circle-pause";
  else document.getElementById("Icon").className = "fa-regular fa-circle-play";
}

document.getElementById("next").addEventListener("click", () => {
  playingNow.currentTime = playingNow.duration;
});

document.getElementById("prev").addEventListener("click", () => {
  playingNow.currentTime = 0;
});

function search() {
  var userSearch = document.getElementById("search");
  userWants = userSearch.value;
  var P = songPlayer(userWants);
  if (P)
    document.getElementById("songName").innerHTML =
      "Sorry, couldn't find the song";
  else {
  document.getElementById("songName").innerHTML = userWants;
  if(!playingNow.paused)
  document.getElementById("Icon").className = "fa-regular fa-circle-pause";
    
}
}

var queue = [];

function queueLister(id) {
  queue.push(document.getElementById(id).innerHTML);
  document.getElementById("nextSong").innerHTML = queue[0];
  var li = document.createElement("li");
  li.innerHTML = document.getElementById(id).innerHTML;
  document.getElementById("Qhead").appendChild(li);
}
