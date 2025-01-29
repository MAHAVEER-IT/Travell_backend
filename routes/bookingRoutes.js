import express from 'express'
import { 
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  cancelBooking
} from '../controllers/bookingController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// User routes
router.route('/')
  .post(protect, createBooking)
  .get(protect, getMyBookings)

// Admin routes
router.get('/all', protect, admin, getAllBookings)

router.route('/:id')
  .put(protect, admin, updateBookingStatus)
  .delete(protect, admin, deleteBooking)

// Add this route
router.put('/:id/cancel', protect, cancelBooking)

export default router 