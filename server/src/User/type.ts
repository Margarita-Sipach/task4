export interface SignInType {
  email: string
  password: string
}

export interface SignUpType extends SignInType {
  username: string
}

export interface UserType extends SignUpType {
  _id: string
  signInDate: Date
  signUpDate: Date
  isActive: boolean
}
