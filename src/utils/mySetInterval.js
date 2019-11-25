export default function mySetInterval(cb, interval) {
  return setTimeout(() => {
    cb()
    mySetInterval(cb, interval)
  }, interval)
}
