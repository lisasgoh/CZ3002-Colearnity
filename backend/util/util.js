/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const Vote = require('../models/Vote');

function getPostsVoteInfo(posts, userId, callback) {
  console.log('HEERERE');
  const promises = posts.map((post) => {
    const postObj = post.toObject();
    console.log(`Post obj${postObj._id}`);
    return Vote.findOne({ _post: postObj._id, _voter: userId })
      .then((vote) => {
        // console.log(vote);
        if (vote == null) {
          postObj.userVote = 0;
        } else {
          postObj.userVote = vote.dir;
        }
        return postObj;
      });
  });
  Promise.all(promises).then((postsWithVote) => {
    console.log(`votesss${JSON.stringify(postsWithVote, null, 1)}`);
    callback(postsWithVote);
  });
}

module.exports = { getPostsVoteInfo };
