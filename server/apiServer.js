const express = require('express')
const dbPromise = require('./openDB')
const { apiHost, apiPort } = require('./config')

const apiUrl = `http://${apiHost}:${apiPort}`
let db
const app = new express()
app.get('/s', async(req, res, next) => {
  // 判断请求url来设置Access-Control-Allow-Origin
  if (!req.query.wd) {
    res.set({
      'Access-Control-Allow-Origin': '*'
    })
    res.json({
      code: 2,
      reason: '输入参数无效',
    })
    next()
    return
  }
  let searchRes = await db.get('SELECT * FROM stardict WHERE word = ?', req.query.wd)
  if (!searchRes) {
    res.set({
      'Access-Control-Allow-Origin': '*'
    })
    res.json({
      code: 1,
      reason: '抱歉，此词条不存在',
    })
    next()
    return
  }
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  res.json({
    code: 0,
    ...searchRes,
  })
  next()
  res.end()
})
async function main() {
  db = await dbPromise
  app.listen(apiPort, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`===> open ${apiUrl} in browser to view the app`)
    }
  })
}
main()
