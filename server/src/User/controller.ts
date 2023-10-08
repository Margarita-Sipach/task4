import UserService from './service'
import { type Request, type Response } from 'express'

class UserController {
  async create (req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body)
      return res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAll (_: Request, res: Response) {
    try {
      const users = await UserService.getAll()
      return res.json(users)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update (req: Request, res: Response) {
    try {
      const updatedUser = UserService.update(req.body)
      return res.json(updatedUser)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await UserService.delete(id)
      return res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new UserController()
