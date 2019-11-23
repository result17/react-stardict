// import express from 'express'
// import dbPromise from './openDB'
// import { apiHost, apiPort } from './config'
const express = require('express')
const dbPromise = require('./openDB')
const { apiHost, apiPort } = require('./config')

const apiUrl = `http://${apiHost}:${apiPort}`
let db
const app = new express()
app.get('/s', async(req, res, next) => {
  if (!req.query.wd) {
    res.json({
      code: 0,
      reason: '输入参数无效',
    })
    next()
    return
  }
  let searchRes = await db.get('SELECT * FROM stardict WHERE word = ?', req.query.wd)
  if (!searchRes) {
    res.json({
      code: 1,
      reason: '抱歉，此词条不存在',
    })
    next()
    return
  }
  res.json(searchRes)
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
