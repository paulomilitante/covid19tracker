import axios from 'axios'

const baseAPIInstance = axios.create({
  baseURL: 'https://api.covid19api.com/'
})

export default baseAPIInstance