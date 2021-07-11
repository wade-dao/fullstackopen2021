import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let headers = null

const setToken = (token) => {
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'bearer ' + token
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, headers)
  return response.data
}

const createNew = async (newBlog) => {
  const options = {
    method: 'POST',
    headers: headers,
    data: newBlog,
    url: baseUrl
  }
  const response = await axios(options)
  return response.data
}

const updateInformation = async(updatedBlog) => {
  const options = {
    method: 'PUT',
    data: updatedBlog,
    url: baseUrl + '/' + updatedBlog.id
  }

  const response = await axios(options)
  return response.data
}

const deleteBlog = async (toBeDeleted) => {
  const options = {
    method: 'DELETE',
    headers: headers,
    url: baseUrl + '/' + toBeDeleted
  }

  const response = await axios(options)
  console.log(response.data)
  return response.data
}

const exportedObject = {
  getAll,
  setToken,
  createNew,
  updateInformation,
  deleteBlog
}
export default exportedObject