import {
  Deck
} from './cards.js';
import {
  Player
} from './player.js';
import {
  deal,
  Match
} from './match.js';

class HoldemPlayer extends Player {
  constructor(name, score, hand) {
    super(name, score, hand);
    this.isSmallBlind = false;
    this.isBigBlind = false;
  }
  toCall(match) {
    let amountNeeded = match.currentBid - this.currentBet;
    this.score -= amountNeeded;
    this.currentBet += amountNeeded;
  }
  toRaise(amountRaised, match) {
    this.currentBet += amountRaised;
    this.score -= amountRaised;
    match.currentBid += amountRaised;
  }
  toCheck() {
    this.isDone();
  }
}

class HoldemMatch extends Match {
  constructor(currentBid,
    pot,
    players,
    smallBlind,
    bigBlind
  ) {
    super(pot, players);
    smallBlind = this.players[0];
    bigBlind = this.players[1];
  }
}

export {
  HoldemPlayer
};
