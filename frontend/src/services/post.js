import axios from "axios";
const baseUrl = "http://localhost:3000/api/posts";

const getIndivPost = (id) => {
  const request = axios({
    method: "get",
    url: `${baseUrl}/${id}`,
    headers: {
      "token": localStorage.getItem("token")  
    },
    withCredentials: true,
  });
  return request.then((response) => response.data);
};

const create = (newObject, forum_id) => {
  const request = axios({
    method: "post",
    url: `${baseUrl}?forum_id=${forum_id}`,
    headers: {
      'Content-Type': 'application/json',
      "token": localStorage.getItem("token")  },
    data: newObject,
    withCredentials: true,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios({
    method: "put",
    url: `${baseUrl}/${id}`,
    headers: {
      "token": localStorage.getItem("token")  
    },
    withCredentials: true,
    data: newObject,
  });
  return request.then((response) => response.data);
};

const deleteObj = (id) => {
  const request = axios({
    method: "delete",
    url: `${baseUrl}/${id}`,
    headers: {
      "token": localStorage.getItem("token")  
    },
    withCredentials: true,
  });
  return request.then((response) => response.data);
};

export default { getIndivPost, create, update, deleteObj };
