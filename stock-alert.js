import axios from 'axios';

let getFriendsListForUser = function(targetId) {
  let targetUser;
  axios.get('http://localhost:3000')
  .then(res => {
    targetUser = res.filter(user => {
      return targetId === user.userId;
    });
    return targetUser.friendList;
  })
  .catch(err => {
    console.log(err);
  });
};

let getTradeTransactionsForUser = function(targetId) {
  let targetUser;
  axios.get('http://localhost:3000')
  .then(res => {
    targetUser = res.filter(user => {
      return targetId === user.userId;
    });
    return user.transactions;
  })
  .catch(err => {
    console.log(err);
  });
};

let rankTrendingStocks = function(listLength) {
  let userData = getDbData();

  let sortedData = userData.reduce((list, user) => {

  }, []);
};

let getDbData = function() {
  axios.get('http://localhost:3000')
  .then(res => res)
  .catch(err => {
    console.log(err);
  });
};

export { getFriendsListForUser, getTradeTransactionsForUser, rankTrendingStocks };
