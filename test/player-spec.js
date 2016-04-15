import {
  Player
} from '../poker/player.js';
import {
  Deck
} from '../poker/cards.js';
import expect from 'expect';

describe('Player', () => {
  it('should expose 5 properties', () => {
    let player = new Player('Bob');
    expect(Object.keys(player).length).toEqual(5);
  });

  describe('setHand()', () => {
    let testDeck = new Deck();
    it('should update hand', () => {
      let player = new Player();
      let cards = [testDeck.deck.pop(), testDeck.deck.pop()];
      player.setHand(cards);
      expect(player.hand.length).toEqual(2);
    });
  });

  describe('updateScore()', () => {
    it('should update score', () => {
      let player = new Player('Bob');
      player.updateScore(10);
      expect(player.score).toEqual(10);
      player.updateScore(-100);
      expect(player.score).toEqual(-90);
    });
  });
});
