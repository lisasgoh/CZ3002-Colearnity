import axios from "axios";
const baseUrl = "http://localhost:3000/api/search"; 

/**
 * @param {string} keyword 
 * @return {object} posts that match the keyword
 */
const searchPost = (keyword) => {
  const request = axios({
    method: "get",
    url: `${baseUrl}/post?postKeyword=${keyword}`,
    headers: {
      token: localStorage.getItem("token"),
    },
    withCredentials: true,
  });
  return request.then((response) => response.data);
};

/**
 * @param {string} keyword 
 * @return {object} forums that match the keyword
 */
const searchForum = (keyword) => {
  const request = axios({
    method: "get",
    url: `${baseUrl}/forum?forumKeyword=${keyword}`,
    headers: {
      token: localStorage.getItem("token"),
    },
    withCredentials: true,
  });
  return request.then((response) => response.data);
};


export default {
  searchPost, searchForum,
};
