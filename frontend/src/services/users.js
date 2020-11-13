import axios from "axios";
const baseUrl = "http://localhost:3000/api/users";

/**
 * Get the current user profile data
 * @return the user profile data
 */
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

/**
 * Get the current user home page
 * @return the user home page data
 */
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

/**
 * @param {object} newUser
 * @return {object} authentication info of the newly created user
 */
const create = (newUser) => {
  const request = axios.post(baseUrl, newUser);
  return request.then((response) => response.data);
};

/**
 * @param {string} email 
 * @param {string} password
 * @return {object} authentication info of the user
 */
const login = (email, password) => {
  const user = {
    user: {
      email: email,
      password: password,
    },
  };
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

/**
 * Logout user
 */
const logout = async () => {
  const response = await axios({
    method: "post",
    url: `${baseUrl}/logout`
  });
  if (response.OK){ 
    return;
  }
}

export default { getUser, getUserHomePage, create, login, logout };
