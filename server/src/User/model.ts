import mongoose from 'mongoose'

const commonParams = <T>(type: T) => ({
  type,
  required: true
})

const stringParams = commonParams(String)

const booleanParams = commonParams(Boolean)

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
  isActive: {
    ...booleanParams,
    default: true
  }
})

export default mongoose.model('User', User)
