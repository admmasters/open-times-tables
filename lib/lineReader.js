const readline = require('readline')

function createReadableInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  })
}

module.exports = createReadableInterface
