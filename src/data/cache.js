import req from '../utils/ajax'

let cache = {}

function getWordData(word) {
  if (cache.hasOwnProperty(word)) {
    // 为了跟axios的api对应，返回了一个含data属性的对象
    return Promise.resolve({data: cache[word]})
  } else {
    return req.getData('/s', {wd: word})
  }
}

function setWordCache(key, value) {
  if (Object.keys[cache] > 199) {
    cache = {}
  }
  cache[key] = value
}

export {getWordData, setWordCache}