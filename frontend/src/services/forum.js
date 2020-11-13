import axios from "axios";
const baseUrl = "http://localhost:3000/api/forum";

/**
 * @param {string} id - id of the forum to be retrieved
 * @return {object} The forum object
 */
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

/**
 * @param {object} newSubforum - A new subforum
 * @param {string} forum_id - Forum id of the parent forum
 * @return {object} The new subforum object
 */
const createSubForum = (newSubforum, forum_id) => {
  const request = axios({
    method: "post",
    url: `${baseUrl}?forum_id=${forum_id}`,
    headers: {
      'Content-Type': 'application/json', 
      "token": localStorage.getItem("token") 
    },
    withCredentials: true,
    data: newSubforum,
  });
  return request.then((response) => response.data);
};

/**
 * @param {object} newMainforum - A new main forum
 * @return {object} The new main forum object
 */
const createMainForum = (newMainforum) => {
  const request = axios({
    method: "post",
    url: baseUrl,
    headers: {
      'Content-Type': 'application/json', 
      "token": localStorage.getItem("token") 
    },
    withCredentials: true,
    data: newMainforum,
  });
  return request.then((response) => response.data);
};

/**
 * @param {string} forumID - The forum to subscribe/unsubscribe to
 * @return {object} Success/failure message
 */
const toggleSubscribe = (forumID) => {
  const request = axios({
    method: "post",
    url: `${baseUrl}/${forumID}`,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    withCredentials: true,
  });
  return request.then((response) => response.data);
};

export default {
  getForum,
  createMainForum,
  createSubForum,
  toggleSubscribe,
};
