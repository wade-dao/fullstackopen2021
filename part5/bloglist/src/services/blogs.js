import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let headers = null

const setToken = (token) => {
  const auth = 'bearer ' + token
  console.log(auth)
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
  console.log(headers)
  const options = {
    method: 'POST',
    headers: headers,
    data: newBlog,
    url: baseUrl
  }
  const response = await axios(options)
  return response.data
}



const exportedObject = {
  getAll,
  setToken,
  createNew
}
export default exportedObject