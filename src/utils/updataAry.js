// 前提：ary是一个只有基本类型却不重复的数组, 此函数不修改原数组
function updataAry(ary, val) {
  if (val === ary[ary.length - 1]) return ary.slice()
  let idx
  for (let i = ary.length; i; i--) {
    if (val === ary[i - 1]) {
      idx = i - 1
      break
    }
  }
  if (idx !== undefined) {
    let res = []
    for (let i = 0; i < idx; i++) {
      res.push(ary[i])
    }
    for (let i = idx + 1, len = ary.length; i < len; i++) {
      res.push(ary[i])
    }
    return (res.push(val), res)
  } else {
    let res = ary.slice()
    return (res.push(val), res)
  }
}

export default updataAry