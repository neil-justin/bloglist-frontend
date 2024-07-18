import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = {}

const defineConfig = newToken => {
  config = {
    headers: { Authorization: newToken },
  }
}

const setToken = newToken => {
  token = `Bearer ${newToken}`

  defineConfig(token)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async blog => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  // take note: HTTP delete request do not return the deleted data
  // use status code instead to determine if deletion is successful
  return response.status
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export { setToken, create, put, remove, getAll }