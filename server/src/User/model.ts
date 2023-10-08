import mongoose from 'mongoose'
import { STATUS } from './type'

const commonParams = (type: typeof String | typeof Date) => ({
  type,
  required: true
})

const stringParams = commonParams(String)

const dateParams = {
  ...commonParams(Date),
  default: Date.now()
}

const User = new mongoose.Schema({
  username: stringParams,
  email: {
    ...stringParams,
    unique: true
  },
  password: stringParams,
  signInDate: dateParams,
  signUpDate: dateParams,
  status: {
    ...stringParams,
    enum: Object.values(STATUS),
    default: STATUS.active
  }
})

export default mongoose.model('User', User)
