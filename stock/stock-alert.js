import axios from 'axios';

let userData = new Promise((resolve, reject) => {
  axios.get('http://localhost:3000/db')
  .then(data => {
    resolve(data);
  })
  .catch(err => {
    console.log(err);
  });
});

let findUser = function(targetId) {
  return new Promise((resolve, reject) => {
    userData
    .then(data => {
      let targetUser = data.data.filter(user => user.userId === targetId);
      if (targetUser.length !== 1) {
        throw new Error(/Invalid User ID/);
      } else {
        targetUser = targetUser[0];
      }
      resolve(targetUser);
    });
  });
};

let getFriendsListForUser = function(targetId) {
  if (!targetId) {
    throw new Error('Invalid input.');
  }
  return new Promise((resolve, reject) => {
    findUser(targetId)
    .then(user => {
      resolve(user.friends);
    });
  });
};

let getTradeTransactionsForUser = function(targetId) {
  if (!targetId) {
    throw new Error('Invalid input.');
  }
  return new Promise((resolve, reject) => {
    findUser(targetId)
    .then(user => {
      let output = user.transactions.map(transaction => {
        let dateArr = transaction.date.split(' ');
        return `${dateArr[3]}-${dateArr[1]}-${dateArr[2]},` +
        `${transaction.orderType},` +
        `${transaction.stockSymbol}`;
      });
      resolve(output);
    });
  });
};

let rankTrendingStocks = function(targetId) {
  let promises;
  if(!targetId) {
    throw new Error('Invalid input.');
  }
  return new Promise((returnResolve, returnReject) => {
    findUser(targetId)
    .then(user => {
      promises = user.friends.map(friend => {
        return new Promise((resolve, reject) => {
          findUser(friend)
          .then(foundFriend => {
            resolve(foundFriend);
          })
          .catch(err => {
            reject(err);
          });
        });
      });
      Promise.all(promises)
      .then(users => {
        let trendingStocks = users.reduce((obj, user) => {
          user.transactions.forEach(transaction => {
            if (obj[transaction.stockSymbol] === undefined) {
              obj[transaction.stockSymbol] = 0;
            }
            if (transaction.orderType === 'BUY') {
              obj[transaction.stockSymbol] = obj[transaction.stockSymbol] + 1;
            } else {
              obj[transaction.stockSymbol] = obj[transaction.stockSymbol] - 1;
            }
          });
          console.log(obj);
          return obj;
        }, {});

        returnResolve(trendingStocks);
      });
    });
  });
};

export { getFriendsListForUser, getTradeTransactionsForUser, rankTrendingStocks };
