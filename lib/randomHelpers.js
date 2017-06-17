function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function getRandomFromArray(numbers) {
  const randomNumber = getRandomArbitrary(0, numbers.length)
  const arrayIndex = Math.floor(randomNumber)
  const result = numbers[arrayIndex]
  return result
}

function getRandomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

module.exports = {
  getRandomFromArray,
  getRandomFromRange
}
