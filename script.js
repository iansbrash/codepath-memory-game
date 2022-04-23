/** GLOBAL VARIABLES (not constant) */

// Number of turns the player has gone through
var progress = 0;

// Whether the game is active
var gamePlaying = false;

// Whether a tone is being played from a pressed button
var tonePlaying = false;

// Volume -- must be between 0 and 1
var volume = 0.5;

// The guess number the player is on
// Used to check if the guess is correct based on pattern[guessCounter]
var guessCounter = 0;

// How long to hold each clue's light/sound, in milliseconds
var clueHoldTime = 1000;

// Controls how much faster it gets per turn
// clueHoldTime *= clueHoldMultiplier
var clueHoldMultiplier = 0.8;

// The pattern of buttons the player must press
// This gets randomized on game start
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];

// The max number of buttons a user will have to press in a row
var patternMaxLength = 8;

// The number of unique buttons on the screen
const numberOfButtons = 6;

// 3 mistakes and you're out
// Max number of mistakes a player can make
const maxMistakes = 3;

// Counts the number of mistakes a user has made -- is initialized to 0 on game start
var numberOfMistakes = 0;


// Bundle of all the variables we need to reset and initialize
function initializeVariables() {
  progress = 0;
  clueHoldTime = 1000;
  gamePlaying = true;
  numberOfMistakes = 0;

  // Updates the number of rounds counter
  document.getElementById("roundCounter").innerHTML =
    pattern.length - progress + " rounds left till victory!";
  
  // Updates the number of mistakes counter
  document.getElementById("mistakeCounter").innerHTML =
    maxMistakes - 1 + " mistakes left...";

  // Resets the pattern to an empty array so we can fill it
  pattern = [];

  // Choose random pattern
  for (let i = 0; i < patternMaxLength; i++) {
    pattern.push(Math.floor(Math.random() * numberOfButtons + 1));
  }
  
  console.log("Secret pattern: ", pattern);
}

// Starts the game
// Changes the buttons and initializes variables
function startGame() {
  //initialize game variables
  initializeVariables();

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("info").classList.remove("hidden");
  document.getElementById("info").classList.add("flex");

  // Start the actual button pressing
  playClueSequence();
}

// Stops the game
function stopGame() {
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("info").classList.remove("flex");
  document.getElementById("info").classList.add("hidden");
}

/** GLOBAL VARIABLES (CONSTANT) */
// How long to pause in between clues (in ms)
const cluePauseTime = 333; 

// How long to wait before starting playback of the clue sequence (in ms)
const nextClueWaitTime = 1000; 

/** START SOUND FUNCTIONS */
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
/** END SOUND FUNCTIONS */


// Changes a class in the button so the color changes with it
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
// Removes the lit class to change color back to default
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

// Used in playClueSequence to light up a single button and make its sound
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

// Given progress (essentially the round number we're on) it uses the array {pattern} to play the clues
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

// Stops game and alerts user
function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

// Stops game and alerts user
function winGame() {
  stopGame();
  alert("Game Over. You win!");
}

// Called when a user presses a button
// Checks whether their guess is right, if the round is over, and if they won
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
      document.getElementById("mistakeCounter").innerHTML =
        maxMistakes - numberOfMistakes - 1 + " mistakes left...";
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

    document.getElementById("roundCounter").innerHTML =
      pattern.length - progress + " rounds left till victory!";

    playClueSequence();
  } else {
    winGame();
  }
}
