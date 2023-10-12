import { ERROR_MESSAGES } from '../const/errorMessages'
import User from './model'
import { type SignUpType, type UserType } from './type'
import bcrypt from 'bcryptjs'

class UserService {
  async create (user: UserType) {
    const createdUser = await User.create(user)
    return createdUser
  }

  async getAll () {
    const users = await User.find()
    return users
  }

  async update (id: string, isActive: boolean) {
    if (!id) throw new Error(ERROR_MESSAGES.noId)
    const updatedUser = await User.findByIdAndUpdate(id, { isActive }, { new: true })
    if (!updatedUser) throw new Error(ERROR_MESSAGES.noUser)
    return updatedUser
  }

  async delete (id: string) {
    if (!id) throw new Error(ERROR_MESSAGES.noId)
    const user = await User.findByIdAndDelete(id)
    if (!user) throw new Error(ERROR_MESSAGES.noUser)
    return user
  }

  async signIn (userData: SignUpType) {
    const user = await User.findOneAndUpdate({ email: userData.email }, { signInDate: Date.now() })
    if (!user) throw new Error(ERROR_MESSAGES.noUser)
    const validPassword = bcrypt.compareSync(userData.password, user.password)
    if (!validPassword) throw new Error(ERROR_MESSAGES.wrongPassword)
    if (!user.isActive) throw new Error(ERROR_MESSAGES.blocked)
    return user
  }

  async signUp (userData: SignUpType) {
    const hashPassword = bcrypt.hashSync(userData.password, 7)
    const user = User.create({ ...userData, password: hashPassword })
    return await user
  }

  async getUserById (id: string) {
    if (!id) throw new Error(ERROR_MESSAGES.noId)
    const user = await User.findById(id)
    if (!user) throw new Error(ERROR_MESSAGES.noUser)
    if (!user.isActive) throw new Error(ERROR_MESSAGES.blocked)
    return user
  }
}

export default new UserService()
