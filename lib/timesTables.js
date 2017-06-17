const {getRandomFromArray, getRandomFromRange} = require('./randomHelpers')
const {
  clearConsole,
  showNeutralMessage,
  showPositiveMessage,
  showErrorMessage,
  showStandardMessage,
  showEmphasisedMessage,
} = require('./messages')
const createReadableInterface = require('./lineReader')
const Player = require('./Players/BasePlayer')
const OLD_LEVI_SCORE = 0

const NUMBERS = [1]
let currentScore = OLD_LEVI_SCORE
let playerName = null
let player = null

function run() {
  clearConsole()
  promptForPlayerName()
}

// Prompt for player name
// Show welcome message
// Generate Problem
// Ask player for solution
// Mark Answer
// Show user success or failure message
// Show score
// Generate Problem ...

function promptForPlayerName() {
  const playerNamePrompt = createReadableInterface()
  showStandardMessage('Whats your name?')
  playerNamePrompt.on('line', name => {
    player = new Player(name)
    playerNamePrompt.close()
    showWelcomeMessage()
  })
}

function showWelcomeMessage() {
  showPositiveMessage(
    `Welcome ${player.name}! I'm going to test you on your times tables`
  )
  const playerNamePrompt = createReadableInterface()
  playerNamePrompt.on('line', () => {
    playerNamePrompt.close()
    generateNextTurn()
  })
}

function generateNextTurn() {
  const {random1, random2} = generatePairs()

  clearConsole()

  const expected = calculateAnswer(random1, random2)

  showStandardMessage(`What is ${random2} x ${random1}?`)

  const entry = createReadableInterface()
  entry.on('line', result => {
    if (parseInt(result) == expected) {
      incrementScore()
      showPositiveMessage(`Well done, ${player.name}! +1`)
    } else {
      showErrorMessage(
        `That was the wrong answer! The right answer was ${expected}`
      )
    }
    showScore()
    entry.close()
    waitForNextQuestion()
  })
}

function generatePairs() {
  const random1 = getRandomFromArray(NUMBERS)
  const random2 = getRandomFromRange(1, 12)
  return {
    random1,
    random2,
  }
}

function calculateAnswer(random1, random2) {
  return random1 * random2
}

function incrementScore() {
  currentScore++
}

function processInput(expected) {
  return function(actual) {}
}

function waitForNextQuestion() {
  const entry = createReadableInterface()
  entry.on('line', () => {
    entry.close()
    generateNextTurn()
  })
}

function showScore() {
  showEmphasisedMessage('Current score: ', currentScore)
}

module.exports = {
  run,
}
