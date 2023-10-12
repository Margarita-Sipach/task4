import express from 'express'
import { check } from 'express-validator'
import UserController from '../User/controller'
import { ERROR_MESSAGES } from '../const/errorMessages'

const router = express.Router()

const enum Routes {
	signIn = '/sign_in',
	signUp = '/sign_up',
	users = '/users'
}

const checkIsEmpty = (key: string) => check(key, `${ERROR_MESSAGES.empty} ${key}`).notEmpty()

const checkEmail = (key: string = 'email') => [
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
	UserController.signIn
)
router.post(
	Routes.signUp,
	[
		...checkEmail(),
		checkPassword(),
		checkIsEmpty('username')
	],
	UserController.signUp
)
router.get(Routes.users, UserController.getAll)
router.get(`${Routes.users}/:id`, UserController.getUserById)
router.post(Routes.users, UserController.delete)
router.put(Routes.users, UserController.update)

export default router
