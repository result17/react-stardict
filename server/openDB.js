// import sqlite from 'sqlite'
// import path from 'path'
const sqlite = require('sqlite')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'database', 'stardict.sqlite')

module.exports = sqlite.open(dbPath)
