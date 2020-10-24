import axios from "axios";
const baseUrl = "http://localhost:3000/api/result";

const doQuiz = (newObject, quiz_id) => {
    const request = axios({
        method: "post",
        url: `${baseUrl}/takequiz/?quiz_id=${quiz_id}`,
        data: newObject,
    });
  return request.then((response) => response.data);
};

const getResults = (quiz_id) => {
  const request = axios.get(`${baseUrl}/?quiz_id=${quiz_id}`);
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
}

export default { doQuiz, getResults };
