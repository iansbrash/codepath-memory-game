/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

console.log("Hello, world!");

//Global Variables
var progress = 0;
var gamePlaying = false;

var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;

var clueHoldTime = 1000; //how long to hold each clue's light/sound

// Controls how much faster it gets per turn
var clueHoldMultiplier = 0.8;
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];

var patternMaxLength = 8;
const numberOfButtons = 6;

// 3 mistakes and you're out
const maxMistakes = 3;
var numberOfMistakes = 0;

function initializeVariables() {
  progress = 0;
  clueHoldTime = 1000;
  gamePlaying = true;
  numberOfMistakes = 0;
  
  document.getElementById("roundCounter").innerHTML = pattern.length - progress + ' rounds left till victory!'
  document.getElementById("mistakeCounter").innerHTML = maxMistakes - 1 + ' mistakes left...'
  

  pattern = [];

  // Choose random pattern
  for (let i = 0; i < patternMaxLength; i++) {
    pattern.push(Math.floor(Math.random() * numberOfButtons + 1));
  }

  console.log("Secret pattern: ", pattern);
}

function startGame() {
  //initialize game variables
  initializeVariables();

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("info").classList.remove("hidden");
  document.getElementById("info").classList.add("flex");
  
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("info").classList.remove("flex");
  document.getElementById("info").classList.add("hidden");
}

// global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 510.2,
  6: 564,
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  context.resume();

  guessCounter = 0;

  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("Game Over. You win!");
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }

  console.log(`pattern[guessCounter]: ${pattern[guessCounter]}`);

  // If we got it wrong
  if (pattern[guessCounter] !== parseInt(btn)) {
    if (numberOfMistakes < maxMistakes - 1) {
      numberOfMistakes++;
      document.getElementById("mistakeCounter").innerHTML = maxMistakes - numberOfMistakes - 1 + ' mistakes left...'
      
    } else {
      // Notice we return, so we don't have to worry about exiting the if statement and continuing
      return loseGame();
    }
  }

  // If turn isn't over
  if (guessCounter < progress) {
    guessCounter++;
  }
  // If this isn't the last turn
  else if (progress < pattern.length - 1) {
    progress++;

    // Speed it up
    clueHoldTime *= clueHoldMultiplier;
    
    document.getElementById("roundCounter").innerHTML = pattern.length - progress + ' rounds left till victory!'

    playClueSequence();
  } else {
    winGame();
  }

  // add game logic here
}
