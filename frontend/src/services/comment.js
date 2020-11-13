import axios from "axios";
const baseUrl = "http://localhost:3000/api/comments";

/**
 * @param {object} newComment - A new comment
 * @param {string} post_id - Post id of the parent post
 * @return {object} The new comment object
 */
const create = (newComment, post_id) => {
  const request = axios({
    method: "post",
    url: `${baseUrl}?post_id=${post_id}`,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    withCredentials: true,
    data: newComment,
  });
  return request.then((response) => response.data);
};

/**
 * @param {object} newComment - The new comment object
 * @param {string} id - Comment id
 * @return {object} The newly updated comment object
 */
const update = (id, newComment) => {
  const request = axios({
    method: "put",
    url: `${baseUrl}/${id}`,
    headers: {
      "token": localStorage.getItem("token")  
    },
    withCredentials: true,
    data: newComment,
  });
  return request.then((response) => response.data);
};

/**
 * @param {string} id - id of the comment to be deleted
 * @return {object} The deleted comment object
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

export default { create, update, deleteObj };
