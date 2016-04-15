import {
  Deck
} from './cards.js';
import {
  Player
} from './player.js';

let gameDeck = new Deck();

class BlackJackPlayer extends Player {
  constructor(points, name, score, hand) {
    super(name, score, hand);
    this.points = points;
    this.isBusted = false;
  }
  hit() {
      this.hand.push(gameDeck.deck.pop());
      this.checkBust();
    }
    // TODO
  stand() {}
    // TODO
  split() {}
  checkBust() {
    this.isBusted = this.hand.reduce((sum, card) => {
      if (['Jack', 'Queen', 'King'].indexOf(card.rank) !== -1) {
        return sum + 10;
      } else if (card.rank === 'Ace') {
        if (sum + 10 > 21) {
          return sum + 1;
        } else {
          return sum + 10;
        }
      } else {
        return sum + Number(card.rank);
      }
    }, 0) > 21;
  }
}
export {
  BlackJackPlayer
};
