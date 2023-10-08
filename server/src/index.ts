import express, { type NextFunction, type Request, type Response } from 'express'
import mongoose from 'mongoose'

import router from './router/router'

const PORT = 5000
const DB_URL = 'mongodb+srv://user:user@cluster0.p4kyw8m.mongodb.net/?retryWrites=true&w=majority'

const allowCrossDomain = (_: Request, res: Response, next: NextFunction) => {
  const group = 'Access-Control-Allow-'
  const headers = [
    [`${group}Origin`, '*'],
    [`${group}Methods`, 'GET,PUT,POST,DELETE'],
    [`${group}Headers`, 'Content-Type']
  ]
  headers.forEach((item: string[]) => res.header(item))
  next()
}

const app = express()
app.use(allowCrossDomain)
app.use(express.json())
app.use('/users', router)

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => { console.log('server start') })
  } catch (e) {
    console.log(e)
  }
}

startApp()
