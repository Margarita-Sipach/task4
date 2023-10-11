import { validationResult } from 'express-validator'
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
      await Promise.all(ids.map(async (id: string) => await UserService.update(id, isActive)))
      const users = await UserService.getAll()
      console.log(users)
      return res.json(users)
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ message: e.message })
      }
      return res.status(500).json({ message: 'Unexpected error' })
    }
  }

  async delete (req: Request, res: Response) {
    try {
      await Promise.all(req.body.map(async (id: string) => await UserService.delete(id)))
      return res.json(await UserService.getAll())
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ message: e.message })
      }
      return res.status(500).json({ message: 'Unexpected error' })
    }
  }

  async signIn (req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json(errors)
      const user = await UserService.signIn(req.body)
      return res.json(user)
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ message: e.message })
      }
      return res.status(500).json({ message: 'Unexpected error' })
    }
  }

  async signUp (req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json(errors)
      const user = await UserService.signUp({ ...req.body, isActive: true })
      return res.json(user)
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ message: e.message })
      }
      return res.status(500).json({ message: 'Unexpected error' })
    }
  }

  async getUserById (req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id)
      return res.json(user)
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ message: e.message })
      }
      return res.status(500).json({ message: 'Unexpected error' })
    }
  }
}

export default new UserController()
