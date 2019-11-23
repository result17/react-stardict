import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:6060',
  timeout: 1000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
})

const req = {
  getData: (url, para) => {
    return instance.get(url, {
      params: para
    })
  },
  postData: (url, para) => {
    return instance.post(url, {
      params: qs.stringify(para)
    })
  }
}

export default req