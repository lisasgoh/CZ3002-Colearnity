import axios from "axios";
const baseUrl = "http://localhost:3000/api/users";

const getUser = () => {
  const request = axios.get(`${baseUrl}/current`);
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

const login = (userData) => {
  // const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpc2EzNjQwNUBnbWFpbC5jb20iLCJpZCI6IjVmN2Y1MjVkNTZiOTgzNWIyNDVlOGFhZiIsImV4cCI6MTYwNzYxNzQ4NywiaWF0IjoxNjAyNDMzNDg3fQ.xniUrdSGgfPDBXX6AJ-NmRKWkQHk5sPA4HZbTZ16C0A';
  console.log(userData);
  const request = axios({
    method: "post",
    url: `${baseUrl}/login`,
    data: userData,
  });
  return request.then((response) => response.data);
};

/*const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteObj = id => {
    return axios.delete(`${baseUrl}/${id}`);
}*/

export default { getUser, getUserById, create, login };
