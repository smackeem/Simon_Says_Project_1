  console.log('js loaded')
  /*----- constants -----*/
const INIT_STATE = {
    red: 'red',
    blue: 'blue',
    green: 'green',
    yellow: 'yellow',
    level: 0,
    highScore: 0
};


  /*----- state variables -----*/
let state;

let pattern =[]; //array
let userPattern; //array

let turn; //string

  /*----- cached elements  -----*/
  //Buttons
const gameBtnEls = document.querySelectorAll('#game-buttons button');
const gameStateBtnEls = document.querySelectorAll('.start-container button');
//Highscore tracker
const highScoreEl = document.querySelector('#highScore-stat');
//Display messages
const gameMessageEl = document.querySelector('#game-messsage');
const gameLevelEl = document.querySelector('#game-level');
const gameRulesEl = document.querySelector('#game-rules');

  /*----- event listeners -----*/
gameStateBtnEls.forEach(function(btn){
    console.log(btn)
    if(btn.value === "start"){
        btn.addEventListener('click', startGame);
    }
    if(btn.value === "reset"){
        btn.addEventListener('click', resetGame);
    }
});

  /*----- functions -----*/

  init();

  /*----- function declarations -----*/

  function init() {
    state = {...INIT_STATE};

    pattern = [];
    userPattern = [];
    turn = 'simon';

    render();
  }

  function render() {
    console.log('rendering');
  }

  function startGame(){
    console.log('Game About to begin')
    let colors = Object.values(INIT_STATE);
    level = 1;
    gameMessageEl.innerText = level;
    highScoreEl.innerText = highScore;
    pattern.push(colorSequence(colors, level));
    for(let i = 0; i < colors.length; i++){
            btns.forEach(function(btn){
                blinkColor(colors[i], btn, i)
        })
    }

  }

  function resetGame(){
    console.log('Game got reset');
  }

  function randomColorGenerator(colors) {
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  }

  function colorSequence(colors, lvl) {
    let sequence = []
    for(let i =1; i <= lvl; i++){
        sequence.push(randomColorGenerator(colors));
    }
    return sequence;
  }

  function blinkColor(color, btn, idx) {
            setTimeout(function(){
                if(color === btn.id){
                    btn.classList.remove('no-highlight');
                    btn.classList.add('highlight');
                    setTimeout(function(){ resetBlink(btn);}, 750)
                }
            }, 2000 * idx)
        }


  function resetBlink(btn) {
    btn.classList.remove('highlight');
    btn.classList.add('no-highlight');
  }