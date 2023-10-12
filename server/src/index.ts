import express, { type NextFunction, type Request, type Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import router from './router/router'

const PORT = process.env.PORT || 5000
const DB_URL = 'mongodb+srv://user:user@cluster0.p4kyw8m.mongodb.net/?retryWrites=true&w=majority'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', router)

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => { console.log('server start') })
  } catch (e) {
    console.log(e)
  }
}

startApp()
