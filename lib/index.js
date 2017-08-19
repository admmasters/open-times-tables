#!/usr/bin/env node
const fs = require('fs');
const { getRandomFromArray, getRandomFromRange } = require('./core/randomHelpers');
const {
  clearConsole,
  showPositiveMessage,
  showErrorMessage,
  showStandardMessage,
  showEmphasisedMessage
} = require('./core/messages');
const createReadableInterface = require('./core/lineReader');
const Player = require('./Players/BasePlayer');

const NUMBERS = [3, 4, 6, 8];
const BLACKLIST = [1, 10, 11];
let currentScore = 0;
let player = null;

function promptForPlayerName() {
  const playerNamePrompt = createReadableInterface();
  showStandardMessage('Whats your name?');
  playerNamePrompt.on('line', name => {
    player = new Player(name);
    playerNamePrompt.close();
    showWelcomeMessage();
  });
}

function run() {
  clearConsole();
  promptForPlayerName();
}

function showWelcomeMessage() {
  showPositiveMessage(`Welcome ${player.name}! I'm going to test you on your times tables`);
  const playerNamePrompt = createReadableInterface();
  playerNamePrompt.on('line', () => {
    playerNamePrompt.close();
    generateNextTurn();
  });
}

function generateNextTurn() {
  const { random1, random2 } = generatePairs();

  clearConsole();

  const expected = calculateAnswer(random1, random2);

  showStandardMessage(`What is ${random2} x ${random1}?`);

  const entry = createReadableInterface();
  entry.on('line', result => {
    if (parseInt(result, 10) === expected) {
      incrementScore();
      showPositiveMessage(`Well done, ${player.name}! +1`);
    } else {
      saveError(`${random2} x ${random1}`);
      showErrorMessage(`That was the wrong answer! The right answer was ${expected}`);
    }
    showScore();
    entry.close();
    waitForNextQuestion();
  });
}

function generatePairs() {
  const random1 = getRandomFromArray(NUMBERS);
  const random2 = getRandomFromRange(1, 12);

  let found = false;

  BLACKLIST.forEach(a => {
    if (random1 === a) {
      found = true;
    }

    if (random2 === a) {
      found = true;
    }
  });

  if (found) {
    return generatePairs();
  }

  return {
    random1,
    random2
  };
}

function calculateAnswer(random1, random2) {
  return random1 * random2;
}

function incrementScore() {
  currentScore += 1;
}

function waitForNextQuestion() {
  const entry = createReadableInterface();
  entry.on('line', () => {
    entry.close();
    generateNextTurn();
  });
}

function showScore() {
  showEmphasisedMessage('Current score: ', currentScore);
}

// TODO: Make this async
function saveError(error) {
  const score = fs.readFileSync('./scores/score.log').toString();

  fs.writeFile('./scores/score.log', score.concat(`\n${error}`), err => {
    if (err) {
      console.log(err);
    }
  });
}

run();
