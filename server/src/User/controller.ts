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
      const { ids, isActive } = req.body
      await ids.forEach(async (id: string) => {
        await UserService.update(id, isActive)
      })
      return res.json(await UserService.getAll())
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async delete (req: Request, res: Response) {
    try {
      await req.body.forEach(async (id: string) => {
        await UserService.delete(id)
      })
      return res.json(await UserService.getAll())
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async signIn (req: Request, res: Response) {
    try {
      const user = await UserService.signIn(req.body)
      return res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async signUp (req: Request, res: Response) {
    try {
      const user = await UserService.signUp({ ...req.body, isActive: true })
      return res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getUserById (req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id)
      return res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new UserController()
