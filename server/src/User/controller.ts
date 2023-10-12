import { validationResult } from 'express-validator'
import UserService from './service'
import { type Request, type Response } from 'express'
import { clientErrorHandler, errorHandler, serverErrorHandler } from '../lib/errorHandlers'
import { ERROR_MESSAGES } from '../const/errorMessages'
import { Error, MongooseError } from 'mongoose'
import { MongoServerError } from 'mongodb'

class UserController {
  async create (req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body)
      return res.json(user)
    } catch (e) {
      return serverErrorHandler(res, e)
    }
  }

  async getAll (_: Request, res: Response) {
    try {
      const users = await UserService.getAll()
      return res.json(users)
    } catch (e) {
      return serverErrorHandler(res, e)
    }
  }

  async update (req: Request, res: Response) {
    try {
      const { ids, isActive } = req.body
      await Promise.all(ids.map(async (id: string) => await UserService.update(id, isActive)))
      const users = await UserService.getAll()
      return res.json(users)
    } catch (e) {
      return serverErrorHandler(res, e)
    }
  }

  async delete (req: Request, res: Response) {
    try {
      await Promise.all(req.body.map(async (id: string) => await UserService.delete(id)))
      return res.json(await UserService.getAll())
    } catch (e) {
      return serverErrorHandler(res, e)
    }
  }

  async signIn (req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return clientErrorHandler(res, errors)
      const user = await UserService.signIn(req.body)
      return res.json(user)
    } catch (e) {
      return serverErrorHandler(res, e)
    }
  }

  async signUp (req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return clientErrorHandler(res, errors)
      const user = await UserService.signUp({ ...req.body, isActive: true })
      return res.json(user)
    } catch (e) {
	  if(e instanceof MongoServerError && e.code === 11000) return errorHandler(res, 400, ERROR_MESSAGES.userExist)
      return serverErrorHandler(res, e)
    }
  }

  async getUserById (req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id)
      return res.json(user)
    } catch (e) {
      return serverErrorHandler(res, e)
    }
  }
}

export default new UserController()
