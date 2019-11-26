// 因为原生JS会修改原数组，不符合React原则，不能原地修改，因为也会修改原数组
export default function myReverse(ary) {
  if (ary.length < 2) return ary.slice()
  let res = []
  for (let i = ary.length; i; i--) {
    res.push(ary[i - 1])
  }
  return res
}