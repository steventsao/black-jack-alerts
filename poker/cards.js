import {
  shuffle
} from 'lodash';

class Card {
  constructor(rank, suit, flipped = true) {
    this.rank = rank;
    this.suit = suit;
    this.flipped = flipped;
  }
  flip() {
    this.flipped = !this.flipped;
  }
}

class Deck {
  constructor() {
    this.suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    this.ranks = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    this.deck = shuffle(this.createDeck());
  }
  createDeck() {
    return this.suits.reduce((deck, suit) => deck
      .concat(this.ranks.map(rank => new Card(rank, suit))), []);
  }
}

export {
  Deck,
  Card
};
