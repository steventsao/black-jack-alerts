import expect from 'expect';
import {
  BlackJackPlayer
} from '../poker/blackjack.js';
import {
  deal
} from '../poker/match.js';
import {
  Player
} from '../poker/player.js';
import {
  Card
} from '../poker/cards.js';
describe('Blackjack', () => {
  let playerOne;
  let playerTwo;
  beforeEach(() => {
    playerOne = new BlackJackPlayer('Emily');
    playerTwo = new BlackJackPlayer('John');
  });

  describe('deal()', () => {
    it('should deal a covered card and a flipped card', () => {
      deal(playerOne);
      expect(playerOne.hand.length).toEqual(2);
      expect(playerOne.hand[0].flipped).toEqual(!playerOne.hand[1].flipped);
    });

    it('should deal numerous players', () => {
      let playerThree = new BlackJackPlayer('David');
      deal(playerOne, playerTwo, playerThree);
      [playerOne, playerTwo, playerThree].forEach(player => {
        expect(player.hand.length).toEqual(2);
      });
    });
  });

  describe('Player', () => {
    describe('hit()', () => {
      it('should add a card to player\'s hand', () => {
        deal(playerOne);
        playerOne.hit();
        expect(playerOne.hand.length).toEqual(3);
      });
    });

    xdescribe('stand()', () => {

    });

    describe('checkBust()', () => {
      it('should default to false', () => {
        deal(playerOne);
        expect(playerOne.isBusted).toEqual(false);
      });

      it('should update isBusted when player is over 21', () => {
        let testHand = [new Card(10, 'Spade'), new Card(9, 'Heart'), new Card(2, 'Diamond')];
        playerOne.hand = testHand;
        expect(playerOne.isBusted).toEqual(false);
        playerOne.hit();
        expect(playerOne.isBusted).toEqual(true);
      });
    });
  });
});
