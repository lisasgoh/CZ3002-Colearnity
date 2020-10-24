import axios from "axios";
const baseUrl = "http://localhost:3000/api/quiz";

const getQuiz = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const doQuiz = (newObject, id) => {
  const request = axios({
      method: "post",
      url: `${baseUrl}/${id}`,
      data: newObject,
  });
  return request.then((response) => response.data);
};

const postQuiz = (newObject, forum_id) => {
  const request = axios({
    method: "post",
    url: `${baseUrl}?forum_id=${forum_id}`,
    data: newObject,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
}

const deleteObj = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getQuiz, doQuiz, postQuiz,  deleteObj
};
