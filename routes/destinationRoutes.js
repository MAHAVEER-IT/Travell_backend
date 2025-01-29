import express from 'express'
import { 
  getDestinations, 
  createDestination, 
  updateDestination, 
  deleteDestination,
  getRecentDestinations
} from '../controllers/destinationController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(getDestinations)
  .post(protect, admin, createDestination)

router.route('/:id')
  .put(protect, admin, updateDestination)
  .delete(protect, admin, deleteDestination)

router.get('/recent', getRecentDestinations)

export default router 