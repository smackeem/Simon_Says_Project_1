
/*----- constants -----*/
const INIT_STATE = {
  red: "red",
  blue: "blue",
  green: "green",
  yellow: "yellow",
  level: 0,
  highScore: 0,
};

/*----- state variables -----*/
let state;
let colorsArr;

let currentPattern; //array of current pattern
let patterns; //array of all patterns from current game
let userPattern; //array of user input

let turn; //string

/*----- cached elements  -----*/

//Buttons
const gameBtnEls = document.querySelectorAll("#game-buttons button");
const gameStateBtnEls = document.querySelectorAll(".start-container button");

//Highscore tracker
const highScoreEl = document.querySelector("#highScore-stat");

//Display messages
const gameMessageEl = document.querySelector("#game-messsage");
const gameLevelEl = document.querySelector("#game-level");
const gameRulesEl = document.querySelector("#game-rules");

/*----- event listeners -----*/

gameStateBtnEls.forEach(function (btn) {
  if (btn.value === "start") {
    btn.addEventListener("click", startGame);
  }
  if (btn.value === "reset") {
    btn.addEventListener("click", resetGame);
  }
});

/*----- functions -----*/

init();

/*----- function declarations -----*/

function init() {
  state = { ...INIT_STATE };

  patterns = [];
  currentPattern = [];
  userPattern = [];
  turn = "simon";
  colorsArr = Object.values(INIT_STATE);

  render();
}

function render() {
    renderStats();
}

function renderStats(){
    gameLevelEl.innerText = state.level;
    highScoreEl.innerText = state.highScore;
}

function updateStats(stat, value){
    state[stat] += value;
}

function startGame() {
  console.log("Game About to begin");
  state.level = 1;
  renderStats();
  runGame();
}

function runGame(){
    if(turn === 'simon') 
    {
        simonSays();
    }
    if(turn === 'player') {
        playerSays(); 
    } 
}

function simonSays(){
    currentPattern = colorSequence(colorsArr, state.level);
    patterns.push(currentPattern);
    console.log(state.level)
    for (let i = 0; i < currentPattern.length; i++) {
        gameBtnEls.forEach(function (btn) {
            blinkColor(colorsArr[i], btn, i);
        });
    }
    turn = 'player';
    /* playerSays(); */
}

function playerSays() {
    gameBtnEls.forEach(function(btn) {
        btn.addEventListener('click', handleBtnClick)
    })
    checkUserPattern(userPattern);
}

function handleBtnClick(e){
    const colorID = e.target.id;
    userPattern.push(colorID);
}

function checkUserPattern(userCurrentPattern){
    if(userCurrentPattern.length !== currentPattern.length){
        gameOver();
    }else{
        for(let i=0; i < level; i++){
            if(userCurrentPattern[i] !== currentPattern[i]){
                gameOver();
            }
        }
        continueGame();
    }
    
}

function continueGame() {
    state.level++;
    turn = 'simon';
    runGame();
}

function gameOver() {
    console.log('Gameover');
}
function resetGame() {
  console.log("Game got reset");
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
      btn.classList.remove("no-highlight");
      btn.classList.add("highlight");
      setTimeout(function () {
        resetBlink(btn);
      }, 750);
    }
  }, 2000 * idx);
}

function resetBlink(btn) {
  btn.classList.remove("highlight");
  btn.classList.add("no-highlight");
}


