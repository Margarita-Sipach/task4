import express from 'express'
import PostController from '../User/controller'

const router = express.Router()

router.post('/', PostController.create)
router.get('/', PostController.getAll)
router.put('/', PostController.update)
router.delete('/:id', PostController.delete)

export default router
