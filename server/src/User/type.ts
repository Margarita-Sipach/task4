export enum STATUS {
  active = 'active',
  blocked = 'blocked'
}

export interface UserType {
  _id: string
  username: string
  email: string
  password: string
  signInDate: Date
  signUpDate: Date
}
