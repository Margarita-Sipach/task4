import User from './model'
import { type UserType } from './type'

class UserService {
  async create (user: UserType) {
    const createdUser = await User.create(user)
    return createdUser
  }

  async getAll () {
    const users = await User.find()
    return users
  }

  async update (user: UserType) {
    const id = user._id
    if (!id) throw new Error('no user id')
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
    return updatedUser
  }

  async delete (id: string) {
    if (!id) throw new Error('no user id')
    const user = await User.findByIdAndDelete(id)
    return user
  }
}

export default new UserService()
