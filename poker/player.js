class Player {
  constructor(name = 'Guest', score = 0, hand = [], hasTurn = false) {
    this.name = name;
    this.score = score;
    this.hand = hand;
    this.hasTurn = hasTurn;
    this.currentBet = 0;
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
  isDone(next) {
    next();
  }
  toBet(amount) {
      this.currentBet += amount;
  }
}

export { Player };
