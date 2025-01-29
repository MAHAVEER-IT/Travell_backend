import express from 'express'
import { getUsers, updateUser, deleteUser, authUser, getUserProfile } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, admin, getUsers)
router.route('/:id')
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)

router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)

export default router 