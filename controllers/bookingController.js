import Booking from '../models/bookingModel.js'

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user._id
    })
    res.status(201).json(booking)
  } catch (error) {
    res.status(400)
    throw new Error('Invalid booking data')
  }
}

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('destination')
    res.json(bookings)
  } catch (error) {
    res.status(500)
    throw new Error('Error fetching bookings')
  }
}

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name email')
      .populate('destination')
    res.json(bookings)
  } catch (error) {
    res.status(500)
    throw new Error('Error fetching bookings')
  }
}

export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (booking) {
      booking.status = req.body.status || booking.status
      const updatedBooking = await booking.save()
      res.json(updatedBooking)
    } else {
      res.status(404)
      throw new Error('Booking not found')
    }
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
}

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (booking) {
      await booking.deleteOne()
      res.json({ message: 'Booking removed' })
    } else {
      res.status(404)
      throw new Error('Booking not found')
    }
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
}

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    
    if (!booking) {
      res.status(404)
      throw new Error('Booking not found')
    }
    
    if (booking.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to cancel this booking')
    }

    if (booking.status !== 'pending') {
      res.status(400)
      throw new Error('Cannot cancel a booking that is not pending')
    }

    booking.status = 'cancelled'
    const updatedBooking = await booking.save()

    res.json(updatedBooking)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
} 