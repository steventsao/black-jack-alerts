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
    it('should return an array', (done) => {
      getFriendsListForUser(Math.floor(Math.random()*99))
      .then(friendIds => {
        expect(Array.isArray(friendIds)).toEqual(true);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });

    it('should throw with invalid input', () => {
      expect(getFriendsListForUser).withArgs().toThrow(/Invalid input/);
    });

    it('should not have duplicate user IDs', (done) => {
      let userIds;
      let uniqUserIds;
      getFriendsListForUser(Math.floor(Math.random()*99))
      .then(ids => {
        userIds = ids;
        uniqUserIds = uniq(userIds);
        expect(userIds.length).toEqual(uniqUserIds.length);
        expect(userIds.length).toEqual(9);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });
  });

  describe('getTradeTransactionsForUser()', () => {
    it('should return an array', (done) => {
      getTradeTransactionsForUser(Math.floor(Math.random()*99))
      .then(transactions => {
        expect(Array.isArray(transactions)).toEqual(true);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });

    it('should throw with invalid input', () => {
      expect(getTradeTransactionsForUser).withArgs().toThrow(/Invalid input/);
    });

    it('item should contain three elements', (done) => {
      getTradeTransactionsForUser(Math.floor(Math.random()*99))
      .then(transactions => {
        expect(transactions[Math.floor(Math.random()*transactions.length - 1)].split(',').length).toEqual(3);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });
  });

  describe('rankTrendingStocks()', () => {
    it('should return an array', (done) => {
      rankTrendingStocks(Math.floor(Math.random()*99))
      .then(alerts => {
        expect(Array.isArray(alerts)).toEqual(true);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });
  });
});
