const fs = require('fs')

function readFileFromSystem(path) {
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      if (err) {
        return resolve(null)
      }
      return resolve(data)
    })
  })
}

function createFile(path) {
  return new Promise(resolve => {
    fs.writeFile(path, '{"score: 0"}', err => {
      if (err) {
        throw Error('Could not create file: ', err)
      }
      resolve()
    })
  })
}

function createFileIfEmpty(path) {
  readFileFromSystem(path).then(data => {})
}

function isEmpty(data) {
  if (typeof data === null) {
    return Promise.resolve(true)
  }
  return Promise.resolve(false)
}

function readAndCreateIfEmpty(path) {
  readFileFromSystem(path).then(isEmpty).then
}

async function saveScore() {
  return new Promise((resolve, reject) => {})
}

async function readScore() {
  return new Promise(resolve => {
    fs.readFile('./data/score.json', err => {})
  })
}

module.exports = {
  saveScore,
  readScore,
}
