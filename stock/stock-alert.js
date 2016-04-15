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
      let friendsList = Object.keys(user.friends).map(id => {
        return user.friends[id];
      });
      resolve(friendsList);
    })
    .catch(err => {
      consolelog(err);
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
      let output = Object.keys(user.transactions).map(key => {
        let dateArr = user.transactions[key].date.split(' ');
        return `${dateArr[3]}-${dateArr[1]}-${dateArr[2]},` +
        `${user.transactions[key].orderType},` +
        `${user.transactions[key].stockSymbol}`;
      });
      resolve(output);
    });
  });
};

let rankTrendingStocks = function(targetId) {
  if(!targetId) {
    throw new Error('Invalid input.');
  }
  return new Promise((returnResolve, returnReject) => {
    // findUser takes O(n) in time and O(1) in space complexity
    findUser(targetId)
    .then(user => {
      // promisifying all users by iterating through the array in O(n) pushes the current algorithm to O(n^2) in time and O(n) in space.
      let promises = Object.keys(user.friends).map(key => {
        return new Promise((resolve, reject) => {
          findUser(user.friends[key])
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
        let stockCounts = users.reduce((obj, user) => {
          Object.keys(user.transactions).forEach(key => {
            let currentComp = user.transactions[key].stockSymbol;
            if (obj[currentComp] === undefined) {
              obj[currentComp] = 0;
            }
            obj[currentComp] = user.transactions[key].orderType === 'BUY' ?
              obj[currentComp] + 1
            : obj[currentComp] - 1;
          });
          return obj;
        }, {});
        // Since sortedStock is an object created after the resolved promises, the time complexity stays at quadratic but is now 2 O(n^2) and space complexity is 2 O(n).
        let sortedStock = Object.keys(stockCounts).sort((a, b) => stockCounts[b] - stockCounts[a]);
        let alerts = sortedStock.map(stock => `${stockCounts[stock]},${stockCounts[stock] < 0 ? 'SELL' : 'BUY'},${stock}`);
        returnResolve(alerts);
      });
    });
  });
};

export { getFriendsListForUser, getTradeTransactionsForUser, rankTrendingStocks };
