import path from 'path'

import express from 'express'
import httpProxy from 'http-proxy'

import { host, port, apiHost, apiPort } from './config'

const url = `http://${host}:${port}`
const apiUrl = `http://${apiHost}:${apiPort}`

const app = new express()
const proxy = httpProxy.createProxyServer({
  target: url,
})
const publicPath = path.join(__dirname, '..', 'public')
// const bulidPath = paht.join(__dirname, '..', 'bulid')

app.use('/', express.static(publicPath))
// app.use('/', Express.static(bulidPath))

app.use('/api', (req, res) => {
  proxy.web(req, res, {
    target: apiUrl,
  })
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`===> open ${url} in browser to view the app`)
  }
})