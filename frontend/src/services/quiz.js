import axios from "axios";
const baseUrl = "http://localhost:3000/api/quiz";

const getQuiz = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const doQuiz = (answerArray, id) => {
  const newObject = {
    attempt: answerArray,
  }
  console.log(JSON.stringify(newObject))
  const request = axios({
    method: "post",
    url: `${baseUrl}/${id}`,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    data: JSON.stringify(newObject),
    withCredentials: true,
  });
  console.log(request);
  return request.then((response) => response.data);
};

const postQuiz = (quizTitle, questions, forum_id) => {
  console.log("DID IT ENTER?");
  const postQuizData = {
    title: quizTitle,
    questions: questions,
  };
  console.log(forum_id);
  const request = axios({
    method: "post",
    url: `${baseUrl}?forum_id=${forum_id}`,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    data: postQuizData,
    withCredentials: true,
  });
  console.log(request.then((response) => response.data));
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

export default {
  getQuiz,
  doQuiz,
  postQuiz,
  deleteObj,
};
