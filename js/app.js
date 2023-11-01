/*----- constants -----*/
const INIT_STATE = {
  level: 1,
  highScore: 0,
};
const colorsArr = ["green", "blue", "red", "yellow"];
const maxLevel = 15;

/*----- state variables -----*/
let state;

let currentPattern; //array of current pattern
let patterns; //array of all patterns from current game
let userPattern; //array of user input

let turn; //string
let increaseLvl;
/*----- cached elements  -----*/

//Buttons
const gameBtnEls = document.querySelectorAll(".simon-button");
const gameStateBtnEl = document.querySelector("#start-button");
const soundBtnEl = document.querySelector(".toggle");
const hideBtnEl = document.querySelector("#hide-rules");

//Audio
const audioEls = document.querySelectorAll("audio");

//Highscore tracker
const highScoreEl = document.querySelector("#highScore-stat");

//Display messages
const gameMessageEl = document.querySelector("#game-messsage");
const gameLevelEl = document.querySelector("#game-level");
const gameRulesEl = document.querySelector("#game-rules");
const toggle = document.querySelector("#toggle");

/*----- event listeners -----*/
gameStateBtnEl.addEventListener("click", startGame);
soundBtnEl.addEventListener("click", toggleSound);
hideBtnEl.addEventListener("click", hideRules);

/*----- functions -----*/
audioEls.forEach(function (audio) {
  audio.muted = true;
});

/*----- function declarations -----*/

function init() {
  state = { ...INIT_STATE };

  patterns = [];
  currentPattern = [];
  userPattern = [];
  turn = "simon";
  increaseLvl = true;
  render();
}

function render() {
  renderStats();
}

function renderStats() {
  gameLevelEl.innerText = state.level;
  highScoreEl.innerText = state.highScore;
  gameMessageEl.innerText =
    "Is your memory on par with a computer's hard drive, or does it often run out of storage?";
}

function updateStats() {
  state.highScore += state.level * 5;
  if (increaseLvl) state.level++;
}

function startGame(e) {
    animateBtn(e);
  init();
  changeButton(e);
  setTimeout(runGame, 1000);
}

function runGame() {
  if (turn === "simon") {
    simonSays();
  }
  if (turn === "player") {
    playerSays();
  }
  render();
}

function simonSays() {
  currentPattern = colorSequence(colorsArr, state.level);
  patterns.push(currentPattern);
  for (let i = 0; i < currentPattern.length; i++) {
    gameBtnEls.forEach(function (btn) {
      blinkColor(currentPattern[i], btn, i);
    });
  }
  turn = "player";
}

function playerSays() {
  gameBtnEls.forEach(function (btn) {
    btn.addEventListener("click", handleBtnClick);
  });
}

function handleBtnClick(e) {
  const colorID = e.target.id;
  userPattern.push(colorID);
  blinkColor(colorID, e.target);
  checkUserPattern(userPattern);
}

function checkUserPattern(userCurrentPattern) {
  if (userCurrentPattern.length === currentPattern.length) {
    let isMatch = true;

    for (let i = 0; i < state.level; i++) {
      if (userCurrentPattern[i] !== currentPattern[i]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch && isWinner()) {
      increaseLvl = false;
      congrats();
    } else if (isMatch) {
      continueGame();
    } else {
      increaseLvl = false;
      gameOver();
    }
  }
}

function isWinner() {
  if (state.level === maxLevel) return true;
}

function congrats() {
  updateStats();
  render();
  removeBtnListeners();
  displayMessage("CONGRATS! Exceptional memory.");
  setTimeout(function () {
    addAudio("winner");
  }, 1000);
}
function removeBtnListeners() {
  gameBtnEls.forEach(function (btn) {
    btn.removeEventListener("click", handleBtnClick);
  });
}

function continueGame() {
  updateStats();
  turn = "simon";
  userPattern = [];
  setTimeout(runGame, 1500);
}

function gameOver() {
  removeBtnListeners();
  displayMessage("GAMEOVER");
  setTimeout(function () {
    addAudio("gameover");
  }, 1000);
}

function displayMessage(message) {
  gameMessageEl.innerText = message;
}

function randomColorGenerator(colors) {
  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
}

function colorSequence(colors, lvl) {
  let sequence = [];
  for (let i = 1; i <= lvl; i++) {
    sequence.push(randomColorGenerator(colors));
  }
  return sequence;
}

function blinkColor(color, btn, idx) {
  setTimeout(function () {
    if (color === btn.id) {
      addAudio(color);
      btn.classList.remove("no-highlight");
      btn.classList.add("highlight");
      setTimeout(function () {
        resetBlink(btn);
      }, 750);
    }
  }, 1000 * idx);
}

function resetBlink(btn) {
  btn.classList.remove("highlight");
  btn.classList.add("no-highlight");
}

function changeButton(e) {
  if (e.target.innerText === "START") e.target.innerText = "RESTART";
}

function addAudio(color) {
  audioEls.forEach(function (audio) {
    if (!audio.muted) {
      if (color === audio.className) {
        playAudio(audio);
      }
    }
  });
}

function playAudio(audio) {
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

function toggleSound(e) {
    animateBtn(e);
  audioEls.forEach(function (audio) {
    if (audio.muted) {
      audio.muted = false;
      toggle.innerText = "ON";
    } else {
      audio.muted = true;
      toggle.innerText = "OFF";
    }
  });
}

function hideRules(e) {
    animateBtn(e);
  const rulesCntr = document.querySelector(".rules-container ");
  const rulesEl = document.querySelector("#rule-content");
  const hideMess = document.querySelector("#hide");
  if (rulesEl.style.display === "none") {
    rulesEl.style.display = "block";
    rulesCntr.style.width = "300px";
    hideMess.innerText = "HIDE RULES";
  } else {
    rulesEl.style.display = "none";
    rulesCntr.style.width = "auto";
    hideMess.innerText = "SHOW RULES";
  }
}

function animateBtn(e){
    e.target.classList.add("animated");
      setTimeout(() => {
        e.target.classList.remove("animated");
      }, 300);
}
