import axios from "axios";
const baseUrl = "http://localhost:3000/api/votes";

/**
 * @param {string} votedir direction of vote (1 = upvote, -1 = downvote)
 * @param {string} comment_id id of the comment to be voted on
 * @return {object} the new comment object with vote count updated
 */
const voteComment = (votedir, comment_id) => {
  const voteData = {
    vote_dir: votedir,
  };

  const request = axios({
    method: "post",
    url: `${baseUrl}?comment_id=${comment_id}`,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    data: voteData,
    withCredentials: true,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

/**
 * @param {string} votedir direction of vote (1 = upvote, -1 = downvote)
 * @param {string} post_id id of the post to be voted on
 * @return {object} the new post object with vote count updated
 */
const votePost = (votedir, post_id) => {
  const voteData = {
    vote_dir: votedir,
  };

  const request = axios({
    method: "post",
    url: `${baseUrl}?post_id=${post_id}`,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    data: voteData,
    withCredentials: true,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

export default { voteComment, votePost };
