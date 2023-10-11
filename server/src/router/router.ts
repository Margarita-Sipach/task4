import express from 'express'
import { check } from 'express-validator'
import PostController from '../User/controller'

const router = express.Router()

router.post('/sign_in', PostController.signIn)
router.post('/sign_up', PostController.signUp)
router.get('/users', PostController.getAll)
router.get('/users/:id', PostController.getUserById)
router.post('/users', PostController.delete)
router.put('/users', PostController.update)

export default router
