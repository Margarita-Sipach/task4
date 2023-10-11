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
    if (!id) throw new Error('no user id')
    const updatedUser = await User.findByIdAndUpdate(id, { isActive }, { new: true })
    return updatedUser
  }

  async delete (id: string) {
    if (!id) throw new Error('no user id')
    const user = await User.findByIdAndDelete(id)
    return user
  }

  async signIn (userData: SignUpType) {
    const user = await User.findOne({ email: userData.email })
    console.log(user)
    if (!user) {
      throw new Error('user not exist')
    }
    const validPassword = bcrypt.compareSync(userData.password, user.password)
    if (!validPassword) {
      throw new Error('other password')
    }
    return user
  }

  async signUp (userData: SignUpType) {
    const isUserExist = await User.findOne({ email: userData.email })
    if (isUserExist) {
      throw new Error('user exist')
    }
    const hashPassword = bcrypt.hashSync(userData.password, 7)
    const user = User.create({ ...userData, password: hashPassword })
    return await user
  }

  async getUserById (id: string) {
    const user = await User.findOne({ _id: id, isActive: true })
    if (!user) {
      throw new Error('user not exist')
    }
    return user
  }
}

export default new UserService()