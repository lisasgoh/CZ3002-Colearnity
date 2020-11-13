/* eslint-disable no-underscore-dangle */
const Vote = require('../models/Vote');

/** To check if user has voted on the posts */
function getPostsVoteInfo(posts, userId, callback) {
  const promises = posts.map((post) => {
    const postObj = post.toObject();
    return Vote.findOne({ _post: postObj._id, _voter: userId })
      .then((vote) => {
        if (vote == null) {
          postObj.userVote = 0;
        } else {
          postObj.userVote = vote.dir;
        }
        return postObj;
      });
  });
  Promise.all(promises).then((postsWithVote) => {
    callback(postsWithVote);
  });
}

module.exports = { getPostsVoteInfo };
