import expect from 'expect';
import { Deck, Card } from '../blackjack.js';
describe('Blackjack', () => {
  let testCard;
  let testDeck;
  beforeEach(( )=> {
    testCard = new Card('Ace', 'Spade');
    testDeck = new Deck();
  });

  describe('Card', () => {

    it('should create a card', () => {
      let expectedCard = { rank: 'Ace', suit: 'Spade', flipped: true };
      expect(JSON.stringify(testCard)).toEqual(JSON.stringify(expectedCard));
    });

    it('should flip', () => {
      expect(testCard.flipped).toEqual(true);
      testCard.flip();
      expect(testCard.flipped).toEqual(false);
    });
  });
  describe('Deck', () => {
    it('should have 52 cards', () => {
      expect(testDeck.deck.length).toEqual(52);
    });

    it('should create a random deck everytime', () => {
      let secondDeck = new Deck();
      expect(secondDeck.deck).toNotEqual(testDeck.deck);
    });
  });
});
