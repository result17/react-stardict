import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = '127.0.0.1:3060'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// export const request = {
//   get(url, params) {
//     return axios.get(url, params)
//   },
//   post(url, params) {
//     return axios.post(url, qs.stringify(params))
//   }
// }
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