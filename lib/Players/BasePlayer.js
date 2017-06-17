class BasePlayer {
  constructor(name) {
    this.name = name
    this.points = 0
  }
  addPoints(points) {
    this.points += 1
  }
}

module.exports = BasePlayer
