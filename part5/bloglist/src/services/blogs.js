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

const getAll = () => {
  const request = axios.get(baseUrl, headers)
  return request.then(response => response.data)
}

const createNew = (newBlog) => {
  console.log(headers)
  const options = {
    method: 'POST',
    headers: headers,
    data: newBlog,
    url: baseUrl
  }
  const request = axios(options)
  return request.then(response => response.data)
}



const exportedObject = {
  getAll,
  setToken,
  createNew
}
export default exportedObject