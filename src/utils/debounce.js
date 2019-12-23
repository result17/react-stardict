export function debounce(fn, deplay, immediate) {
  let timerID, result
  return function(...args) {
    // 是否需要立即执行
    let context = this
    if (timerID) clearTimeout(timerID)
    if (immediate) {
      let callNow = !timerID
      // 停止触发事件deplay毫秒后，才能重新触发 (callNow === true)
      timerID = setTimeout(() => {
        timerID = null
      }, deplay)
      if (callNow) result = fn.apply(context, args)
    } else {
      timerID = setTimeout(() => {
        result = fn.apply(context, args)
      }, deplay)
    }
    return result
  }
}