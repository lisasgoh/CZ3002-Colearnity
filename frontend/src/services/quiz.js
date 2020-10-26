import axios from "axios";
const baseUrl = "http://localhost:3000/api/quiz"; //NOT SURE THE BASEURL

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

const postQuiz = (quizTitle, questions, forum_id) => {
  console.log("DID IT ENTER?");
  const auth_token =
    "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2EzNjQwNUBnbWFpbC5jb20iLCJpZCI6IjVmN2Y1MjVkNTZiOTgzNWIyNDVlOGFhZiIsImV4cCI6MTYwNzYxNzQ4NywiaWF0IjoxNjAyNDMzNDg3fQ.xniUrdSGgfPDBXX6AJ-NmRKWkQHk5sPA4HZbTZ16C0A";
  
  const postQuizData ={
    "title": quizTitle,
    "questions": questions
  }
  console.log(postQuizData);
  console.log(forum_id);
    const request = axios({
    method: "post",
    url: `${baseUrl}?forum_id=${forum_id}`,
    headers: { token: auth_token },
    data: postQuizData,
  });
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
}

const deleteObj = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getQuiz,doQuiz,postQuiz,deleteObj
};