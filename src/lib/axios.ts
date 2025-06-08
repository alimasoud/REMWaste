import axios from 'axios'

const api = axios.create({
  baseURL: 'https://app.wewantwaste.co.uk/api',
})

export default api
