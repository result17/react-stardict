import express from 'express'
import dbPromise from 'connectDB'

let db, app

async function main() {
  db = await dbPromise
  app = new express()
  
}