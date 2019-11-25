export function  getLocalStorage(item, defalutValue = '') {
  if (!window.localStorage.getItem(item)) {
    window.localStorage.setItem(item, defalutValue)
  }
  return window.localStorage.getItem(item)
}