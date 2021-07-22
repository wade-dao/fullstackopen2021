import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

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

const createNew = async (newUser) => {
  const options = {
    method: 'POST',
    headers: headers,
    data: newUser,
    url: baseUrl
  }
  const response = await axios(options)
  return response.data
}

const updateInformation = async(updatedUser) => {
  const options = {
    method: 'PUT',
    data: updatedUser,
    url: baseUrl + '/' + updatedUser.id
  }

  const response = await axios(options)
  return response.data
}

const deleteUser = async (toBeDeleted) => {
  const options = {
    method: 'DELETE',
    headers: headers,
    url: baseUrl + '/' + toBeDeleted
  }

  const response = await axios(options)
  return response.data
}

const exportedObject = {
  getAll,
  setToken,
  createNew,
  updateInformation,
  deleteUser
}
export default exportedObject