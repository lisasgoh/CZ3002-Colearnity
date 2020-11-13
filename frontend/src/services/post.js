import axios from "axios";
const baseUrl = "http://localhost:3000/api/posts";

/**
 * @param {string} id - id of the post to be retrieved
 * @return {object} The post object
 */
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

/**
 * @param {object} newPost - A new post
 * @param {string} forum_id - Forum id of the parent forum
 * @return {object} The new post object
 */
const create = (newPost, forum_id) => {
  const request = axios({
    method: "post",
    url: `${baseUrl}?forum_id=${forum_id}`,
    headers: {
      'Content-Type': 'application/json',
      "token": localStorage.getItem("token")  },
    data: newPost,
    withCredentials: true,
  });
  return request.then((response) => response.data);
};

/**
 * @param {string} id - id of the post to be updated
 * @param {object} newPost - The new post object
 * @return {object} The newly updated post object
 */
const update = (id, newPost) => {
  const request = axios({
    method: "put",
    url: `${baseUrl}/${id}`,
    headers: {
      "token": localStorage.getItem("token")  
    },
    withCredentials: true,
    data: newPost,
  });
  return request.then((response) => response.data);
};

/**
 * @param {string} id - id of the post to be deleted
 * @return {object} The deleted post object
 */
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
