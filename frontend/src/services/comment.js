import axios from "axios";
const baseUrl = "http://localhost:3000/api/comments";

const create = (newObject, post_id) => {
  console.log(" Jdfhjskfjasdfkjasdljadsjldasfjla");
  const request = axios({
    method: "post",
    url: `${baseUrl}?post_id=${post_id}`,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    withCredentials: true,
    data: newObject,
  });
  console.log(request.then((response) => response.data));
  console.log('t est');
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

export default { create, update, deleteObj };
