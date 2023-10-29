  console.log('js loaded')
  /*----- constants -----*/
const INIT_STATE = {
    red: 'red',
    blue: 'blue',
    green: 'green',
    yellow: 'yellow'
};


  /*----- state variables -----*/
let state;

let pattern; //array
let userPattern; //array

let level; //integer
let highScore;  // integer

let turn; //string

  /*----- cached elements  -----*/
  //Buttons
const gameBtnEls = document.querySelectorAll('#game-buttons button');
const gameStateBtnEls = document.querySelectorAll('.start-container button');
//Highscore tracker
const highScoreEl = document.querySelector('#highScore-stat');
//Display messages
const gameMessageEl = document.querySelector('#game-messsage');
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

    level = 0;
    highScore = 0;
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
  }

  function resetGame(){
    console.log('Game got reset');
  }
