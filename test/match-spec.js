import { Match } from '../poker/match.js';
import { Player } from '../poker/player.js';
import expect from 'expect';

describe('Match', () => {
  describe('startTurn()', () => {
    let match;
    let playerOne;
    let playerTwo;

    beforeEach(() => {
      playerOne = new Player();
      playerTwo = new Player();
      match = new Match();

    });

    it('calls each player once', () => {
      let spyTwo = expect.spyOn(playerTwo, 'isDone');
      match.startTurn([playerOne, playerTwo]);
      expect(spyTwo.calls.length).toEqual(1);
    });

    it('waits for player one before proceeding to two', () => {
      // placing a spy nullifies isDone, which match() depends on to iterate through players.
      let spyOne = expect.spyOn(playerOne, 'isDone');
      let spyTwo = expect.spyOn(playerTwo, 'isDone');
      match.startTurn([playerOne, playerTwo]);
      expect(spyTwo.calls.length).toEqual(0);
    });
  });
});
