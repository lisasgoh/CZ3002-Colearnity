import axios from "axios";
const baseUrl = "http://localhost:3000/api/search"; 

const searchPost = (keyword) => {
  const request = axios.get(`${baseUrl}?seachString=${keyword}`);
  return request.then((response) => response.data);
};


export default {
  searchPost,
};