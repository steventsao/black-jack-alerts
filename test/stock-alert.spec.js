import expect from 'expect';
import { getFriendsListForUser, getTradeTransactionsForUser, rankTrendingStocks } from '../stock/stock-alert.js';
import { uniq } from 'lodash';
import nock from 'nock';
import { userData } from '../db.js';

nock('http://localhost:3000')
  .get('/db')
  .reply(200, userData);

describe('Stocks Your Friends Are Trading', () => {
  describe('getFriendsListForUser()', () => {
    it('should return an array', () => {
      getFriendsListForUser(Math.floor(Math.random()*100))
      .then(friendIds => {
        expect(Array.isArray(friendIds)).toEqual(true);
      });
    });

    it('should throw with invalid input', () => {
      expect(getFriendsListForUser).withArgs().toThrow(/Invalid input/);
    });

    it('should not have duplicate user IDs', () => {
      let userIds;
      let uniqUserIds;
      getFriendsListForUser(Math.floor(Math.random()*100))
      .then(ids => {
        userIds = ids;
        uniqUserIds = uniq(userIds);
        expect(userIds.length).toEqual(uniqUserIds.length);
      });
    });
  });

  describe('getTradeTransactionsForUser()', () => {
    it('should return an array', () => {
      getTradeTransactionsForUser(Math.floor(Math.random()*100))
      .then(transactions => {
        expect(Array.isArray(transactions).toEqual(true));
      });
    });

    it('should throw with invalid input', () => {
      expect(getTradeTransactionsForUser).withArgs().toThrow(/Invalid input/);
    });

    it('item should contain three elements', () => {
      getTradeTransactionsForUser(Math.floor(Math.random()*100))
      .then(transactions => {
        expect(transactions.split(',').length).toEqual(3);
      });
    });
  });

  describe('rankTrendingStocks()', () => {
    it('should get all friends', () => {
      rankTrendingStocks(Math.floor(Math.random()*100))
      .then(alerts => {
        expect(Array.isArray(alerts)).toEqual(true);
      });
    });
  });
});
