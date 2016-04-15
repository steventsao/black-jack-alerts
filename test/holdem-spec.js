import expect from 'expect';
import { HoldemPlayer } from '../poker/holdem.js';
import { deal } from '../poker/match.js';

describe('Texas Hold\'em', () => {
  describe('Player', () => {
    let player;
    beforeEach(() => {
      player = new HoldemPlayer();
      deal(player);
    });
    it('should expose 5 properties', () => {
      expect(Object.keys(player).length).toEqual(5);
    });
  });
});
