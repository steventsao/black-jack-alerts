import { Deck } from './cards.js';
import { Player } from './player.js';
import { deal } from './match.js';

class HoldemPlayer extends Player {
  constructor(name, score, hand) {
    super(name, score, hand);
    this.isSmallBlind = false;
    this.isBigBlind = false;
  }
  calling() {

  }
  raising() {

  }
  checking() {

  }
}

export { HoldemPlayer };
