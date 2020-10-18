import axios from "axios";
const baseUrl = "http://localhost:3000/api/quiz"; //NOT SURE THE BASEURL

const getQuiz = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getQuiz,
};
