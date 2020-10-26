import axios from "axios";
const baseUrl = "http://localhost:3000/api/votes";

const voteComment = (newObject, comment_id) => {
  const auth_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2EzNjQwNUBnbWFpbC5jb20iLCJpZCI6IjVmN2Y1MjVkNTZiOTgzNWIyNDVlOGFhZiIsImV4cCI6MTYwNzYxNzQ4NywiaWF0IjoxNjAyNDMzNDg3fQ.xniUrdSGgfPDBXX6AJ-NmRKWkQHk5sPA4HZbTZ16C0A";
  const request = axios({
    method: "post",
    url: `${baseUrl}?comment_id=${comment_id}`,
    headers: { token: auth_token },
    data: newObject,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

const votePost = (newObject, post_id) => {
  const auth_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2EzNjQwNUBnbWFpbC5jb20iLCJpZCI6IjVmN2Y1MjVkNTZiOTgzNWIyNDVlOGFhZiIsImV4cCI6MTYwNzYxNzQ4NywiaWF0IjoxNjAyNDMzNDg3fQ.xniUrdSGgfPDBXX6AJ-NmRKWkQHk5sPA4HZbTZ16C0A";
  const request = axios({
    method: "post",
    url: `${baseUrl}?post_id=${post_id}`,
    headers: { token: auth_token },
    data: newObject,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

export default { voteComment, votePost };
