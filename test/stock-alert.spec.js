import expect from 'expect';
import { getFriendsListForUser, getTradeTransactionsForUser } from '../stock-alert.js';
import { uniq } from 'lodash';

describe('Stocks Your Friends Are Trading', () => {
  describe('getFriendsListForUser()', () => {
    xit('should return an array', () => {
      expect(Array.isArray(getFriendsListForUser('A1234'))).toEqual(true);
    });

    xit('should throw with invalid input', () => {
      expect(getFriendsListForUser).withArgs().toThrow(/Invalid input/);
    });

    xit('should not have duplicate user IDs', () => {
      let userIds = getFriendsListForUser('A1234');
      let uniqUserIds = uniq(userIds);
      expect(userIds.length).toEqual(uniqUserIds.length);
    });
  });

  describe('getTradeTransactionsForUser()', () => {
    xit('should return an array', () => {
      expect(Array.isArray(getTradeTransactionsForUser('A1234'))).toEqual(true);
    });

    xit('should throw with invalid input', () => {
      expect(getTradeTransactionsForUser).withArgs().toThrow(/Invalid input/);
    });

    xit('item should contain three elements', () => {
      expect(getTradeTransactionsForUser('A1234').split(',').length).toEqual(3);
    });
  });
});
