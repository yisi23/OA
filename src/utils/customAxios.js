import axios from 'axios'

export default axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
})
