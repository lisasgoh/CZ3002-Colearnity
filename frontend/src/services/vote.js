import axios from "axios";
const baseUrl = "http://localhost:3000/api/votes";

const voteComment = (newObject, comment_id) => {
  const request = axios({
    method: "post",
    url: `${baseUrl}?comment_id=${comment_id}`,
    headers: {
      'Content-Type': 'application/json', 
      "token": localStorage.getItem("token") 
    },
    data: newObject,
    withCredentials: true,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

const votePost = (voteDiff, post_id) => {
  const voteData = {
    vote_dir: voteDiff,
  };

  const request = axios({
    method: "post",
    url: `${baseUrl}?post_id=${post_id}`,
    headers: {
      'Content-Type': 'application/json', 
      "token": localStorage.getItem("token") 
    },
    data: voteData,
    withCredentials: true,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

export default { voteComment, votePost };
