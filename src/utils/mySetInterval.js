export default function mySetInterval(cb, interval) {
  setTimeout(() => {
    cb()
    mySetInterval(cb, interval)
  }, interval)
}
