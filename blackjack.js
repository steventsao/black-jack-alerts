import { Deck } from './cards.js';
import { Player } from './player.js';

let gameDeck = new Deck();

function deal(...players) {
  let hand;
  players.forEach(player => {
    hand = [gameDeck.deck.pop(), gameDeck.deck.pop()];
    hand[0].flip();
    player.setHand(hand);
  });
}

class BlackJackPlayer extends Player {
  constructor(points, name, score, hand){
    super(name, score, hand);
    this.points = points;
    this.isBusted = false;
  }
  hit() {
    this.hand.push(gameDeck.deck.pop());
    this.checkBust();
  }
  stand() {

  }
  split() {

  }
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
export { deal, BlackJackPlayer };
