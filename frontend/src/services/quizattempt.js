import axios from "axios";
const baseUrl = "http://localhost:3000/api/quizattempt";

/**
 * @param {id} id quiz attempt id 
 * @return {object} quiz attempt object
 */
const getAttempt = (id) => {
    const request = axios({
      method: "get",
      url: `${baseUrl}/${id}`,
      headers: {
        token: localStorage.getItem("token"),
      },
      withCredentials: true,
    });
    return request.then((response) => response.data);
};

export default { getAttempt };