import expect from 'expect';
import { Deck, Card } from '../poker/cards.js';

describe('Card', () => {
  let testCard;
  beforeEach(() => {
    testCard = new Card('Ace', 'Spade');
  });

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
  let testDeck;
  beforeEach(() => {
    testDeck = new Deck();
  });
  it('should have 52 cards', () => {
    expect(testDeck.deck.length).toEqual(52);
  });

  it('should create a random deck everytime', () => {
    let secondDeck = new Deck();
    expect(secondDeck.deck).toNotEqual(testDeck.deck);
  });

  it('should pop a card from the same deck', () => {
    let firstCard = testDeck.deck.pop();
    expect(testDeck.deck.length).toEqual(51);
    let secondCard = testDeck.deck.pop();
    expect(testDeck.deck.length).toEqual(50);
    expect(firstCard).toBeA(Card);
  });
});
