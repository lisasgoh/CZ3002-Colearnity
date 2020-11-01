import axios from "axios";
const baseUrl = "http://localhost:3000/api/quiz"; //NOT SURE THE BASEURL

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
  const auth_token =
    "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2EzNjQwNUBnbWFpbC5jb20iLCJpZCI6IjVmN2Y1MjVkNTZiOTgzNWIyNDVlOGFhZiIsImV4cCI6MTYwNzYxNzQ4NywiaWF0IjoxNjAyNDMzNDg3fQ.xniUrdSGgfPDBXX6AJ-NmRKWkQHk5sPA4HZbTZ16C0A";

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
