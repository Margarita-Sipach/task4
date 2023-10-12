import express from 'express'
import { check } from 'express-validator'
import PostController from '../User/controller'
import { ERROR_MESSAGES } from '../const/errorMessages'

const router = express.Router()

const enum Routes {
  signIn = '/sign_in',
  signUp = '/sign_up',
  users = '/users'
}

const checkIsEmpty = (key: string) => check(key, `${ERROR_MESSAGES.empty} ${key}`).notEmpty()

const checkEmail = (key: string = "email") => [
  check(key, `${ERROR_MESSAGES.invalid} ${key}`).isEmail(),
  checkIsEmpty(key)
]

const checkPassword = () => checkIsEmpty('password')

router.post(
  Routes.signIn,
  [
    ...checkEmail(),
    checkPassword()
  ],
  PostController.signIn
)
router.post(
  Routes.signUp,
  [
    ...checkEmail(),
    checkPassword(),
    checkIsEmpty('username')
  ],
  PostController.signUp
)
router.get(Routes.users, PostController.getAll)
router.get(`${Routes.users}/:id`, PostController.getUserById)
router.post(Routes.users, PostController.delete)
router.put(Routes.users, PostController.update)

export default router
