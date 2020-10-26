import axios from "axios";
const baseUrl = "http://localhost:3000/api/posts";

const getIndivPost = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
const getForumPosts = (forum_id) => {
  const request = axios.get(baseUrl, {
    params: {
      forum_id: forum_id,
    },
  });
  return request.then((response) => response.data);
};
const create = (newObject, forum_id) => {
  const auth_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2EzNjQwNUBnbWFpbC5jb20iLCJpZCI6IjVmN2Y1MjVkNTZiOTgzNWIyNDVlOGFhZiIsImV4cCI6MTYwNzYxNzQ4NywiaWF0IjoxNjAyNDMzNDg3fQ.xniUrdSGgfPDBXX6AJ-NmRKWkQHk5sPA4HZbTZ16C0A";
  const request = axios({
    method: "post",
    url: `${baseUrl}?forum_id=${forum_id}`,
    headers: { token: auth_token },
    data: newObject,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteObj = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getIndivPost, getForumPosts, create, update, deleteObj };
