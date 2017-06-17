const chalk = require('chalk')

console.reset = function() {
  return process.stdout.write('\033c')
}

function clearConsole() {
  console.reset()
}

function showNeutralMessage(message) {
  console.log(message)
}

function showStandardMessage(message) {
  console.log(chalk.yellow(message))  
}

function showPositiveMessage(message) {
  console.log(chalk.green(message))  
}

function showErrorMessage(message) {
  console.log(chalk.red(message))  
}

function showEmphasisedMessage(firstPart, secondPart) {
  console.log(chalk.white(firstPart), ' ', chalk.green(secondPart))  
}

module.exports = {
  clearConsole,
  showNeutralMessage,
  showStandardMessage,
  showPositiveMessage,
  showErrorMessage,
  showEmphasisedMessage
}