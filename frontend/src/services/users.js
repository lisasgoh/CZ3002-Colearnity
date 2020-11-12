import axios from "axios";
const baseUrl = "http://localhost:3000/api/users";

const getUser = () => {
  const request = axios({
    method: "get",
    url: `${baseUrl}/current`,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    withCredentials: true,
  });
  return request.then((response) => response.data);
};

const getUserHomePage = () => {
  const request = axios({
    method: "get",
    url: `${baseUrl}/home`,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    withCredentials: true,
  });
  return request.then((response) => response.data);
};

const getUserById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

const login = (email, password) => {
  const user = {
    user: {
      email: email,
      password: password,
    },
  };
  console.log(user);
  const request = axios({
    method: "post",
    url: `${baseUrl}/login`,
    data: user,
    withCredentials: true,
  });
  return request.then((response) => {
    const token = response.data.user.token;
    localStorage.setItem("token", token);
    const userID = response.data.user._id;
    localStorage.setItem("userID", userID);
  });
};

const logout = () => {
  const request = axios.post(`${baseUrl}/logout`);
  // return request.then((response) => response.data);
};

/*const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteObj = id => {
    return axios.delete(`${baseUrl}/${id}`);
}*/

export default { getUser, getUserById, getUserHomePage, create, login, logout };
