import { Deck } from './cards.js';

function deal(...players) {
  let gameDeck = new Deck();
  let hand;
  players.forEach(player => {
    hand = [gameDeck.deck.pop(), gameDeck.deck.pop()];
    hand[0].flip();
    player.setHand(hand);
  });
}

class Match {
  constructor(pot = 0, players = []) {
    this.pot = pot;
    this.players = [];
  }

  startMatch(...players) {
    this.players = players;
  }

  startTurn(players, i = 0) {
    players[i].isDone(() => {
      i++;
      if(i < players.length) startTurn(players, i);
    });
  }
}

function makeIterator(array) {
  var nextInd = 0;
  return {
    next(){
      return nextInd < array.length ?
        { done: false }
      : { done: true };
    }
  };
}

export { deal, Match };
