class Player {
  constructor(name = 'Guest', score = 0, hand = []) {
    this.name = name;
    this.score = score;
    this.hand = hand;
  }
  setHand(hand){
    this.hand = hand;
  }
  updateScore(points) {
    this.score += points;
  }
  toggleTurn() {
    this.hasTurn = !this.hasTurn;
  }
  isDone(cb) {
    cb();
  }
}

export { Player };
