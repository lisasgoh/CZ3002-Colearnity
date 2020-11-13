import axios from "axios";
const baseUrl = "http://localhost:3000/api/quiz";

/**
 * @param {string} id quiz id of quiz to be retrieved
 * @return {object} quiz object
 */
const getQuiz = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

/**
 * @param {array} answerArray llist of answers by the user
 * @param {string} id quiz id 
 * @return {object} quiz attempt object
 */
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

/**
 * @param {string} quizTitle title of the quiz
 * @param {array} questions list of questions in the quiz
 * @param {string} forum_id id of the parent forum
 * @return {object} newly created quiz object
 */
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

/**
 * @param {string} id quiz id to be deleted 
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

export default {
  getQuiz,
  doQuiz,
  postQuiz,
  deleteObj,
};
