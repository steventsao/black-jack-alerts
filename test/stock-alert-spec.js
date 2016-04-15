import expect from 'expect';
import {
  getFriendsListForUser,
  getTradeTransactionsForUser,
  rankTrendingStocks
} from '../stock/stock-alert.js';
import {
  uniq
} from 'lodash';
import nock from 'nock';
import {
  userData
} from '../db.js';

nock('http://localhost:3000')
  .get('/db')
  .reply(200, userData);

describe('Stocks Your Friends Are Trading', () => {
  describe('getFriendsListForUser()', () => {
    it('should return an array', (done) => {
      getFriendsListForUser(Math.floor(Math.random() * 99))
        .then(friendIds => {
          expect(Array.isArray(friendIds)).toEqual(true);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it('should find the correct user friend list', (done) => {
      getFriendsListForUser(30)
        .then(friendIds => {
          expect(friendIds.length).toEqual(5);
          expect(friendIds).toEqual([78, 89, 97, 100, 38]);
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

    // NOTE: Test doesn't always pass since json generator can have duplicate ids on randomization
    it('should not have duplicate user IDs', (done) => {
      let userIds;
      let uniqUserIds;
      getFriendsListForUser(Math.floor(Math.random() * 99))
        .then(ids => {
          userIds = ids;
          uniqUserIds = uniq(userIds);
          expect(userIds.length).toEqual(uniqUserIds.length);
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
      getTradeTransactionsForUser(Math.floor(Math.random() * 99))
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
  });

  describe('rankTrendingStocks()', () => {
    let testAlerts;
    beforeEach((done) => {
      rankTrendingStocks(Math.floor(Math.random() * 99))
        .then(alerts => {
          testAlerts = alerts;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it('should return an array', () => {
      expect(Array.isArray(testAlerts)).toEqual(true);
    });

    it('should be formatted correctly', () => {
      testAlerts.forEach(alert => {
        expect(alert.split(',').length).toEqual(3);
      });
    });

    it('should come sorted in descending order', () => {
      let numberList = testAlerts.map(alert => Number(alert.split(',')[0]));
      numberList.forEach((num, i) => {
        if (i > 0) {
          expect(num).toBeLessThanOrEqualTo(numberList[i - 1]);
        }
      });
    });
  });
});
