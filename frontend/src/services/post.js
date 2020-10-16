import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/posts'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getForumPosts = () => {
    const request = axios.get(baseUrl, { params: {
        forum_id: forum_id,
      }})
  return request.then(response => response.data)
}
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  console.log(request.then(response => response.data))
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteObj = id => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, getForumPosts, create, update, deleteObj }