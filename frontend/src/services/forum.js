import axios from "axios";
const baseUrl = "http://localhost:3000/api/forum";

const getForum = (id) => {
  const request = axios({
    method: 'get',
    url: `${baseUrl}/${id}`,
    headers: {
      "token": localStorage.getItem("token") 
    },
    withCredentials: true,
  });
  return request.then((response) => response.data);
};

const createSubForum = (newObject, forum_id) => {
  const request = axios({
    method: "post",
    url: `${baseUrl}?forum_id=${forum_id}`,
    headers: {
      'Content-Type': 'application/json', 
      "token": localStorage.getItem("token") 
    },
    withCredentials: true,
    data: newObject,
  });
  return request.then((response) => response.data);
};

const createMainForum = (newObject) => {
  const request = axios({
    method: "post",
    url: baseUrl,
    headers: {
      'Content-Type': 'application/json', 
      "token": localStorage.getItem("token") 
    },
    withCredentials: true,
    data: newObject,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

const toggleSubscribe = (forumID) => {
  const forumIDdata = {
    id: forumID,
  };

  const request = axios({
    method: "post",
    url: `${baseUrl}/${forumID}`,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    withCredentials: true,
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

export default {
  getForum,
  createMainForum,
  createSubForum,
  toggleSubscribe,
  update,
  deleteObj,
};
