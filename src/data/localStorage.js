function getLocalStorage(item, defalutValue = '') {
  if (!window.localStorage.getItem(item)) {
    window.localStorage.setItem(item, defalutValue)
  }
  return window.localStorage.getItem(item)
}

function setLocalStorage(item, value) {
  window.localStorage.setItem(item, value)
}
function clearAll() {
  window.localStorage.clear()
}
export {getLocalStorage, setLocalStorage, clearAll}