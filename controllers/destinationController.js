import Destination from '../models/destinationModel.js'

export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({})
    res.json(destinations)
  } catch (error) {
    res.status(500)
    throw new Error('Error fetching destinations')
  }
}

export const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body)
    res.status(201).json(destination)
  } catch (error) {
    res.status(400)
    throw new Error('Invalid destination data')
  }
}

export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
    if (destination) {
      destination.name = req.body.name || destination.name
      destination.country = req.body.country || destination.country
      destination.description = req.body.description || destination.description
      destination.price = req.body.price || destination.price
      destination.image = req.body.image || destination.image

      const updatedDestination = await destination.save()
      res.json(updatedDestination)
    } else {
      res.status(404)
      throw new Error('Destination not found')
    }
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
}

export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
    if (destination) {
      await destination.deleteOne()
      res.json({ message: 'Destination removed' })
    } else {
      res.status(404)
      throw new Error('Destination not found')
    }
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
}

export const getRecentDestinations = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3
    const destinations = await Destination.find()
      .sort({ createdAt: -1 })
      .limit(limit)
    res.json(destinations)
  } catch (error) {
    res.status(500)
    throw new Error('Error fetching recent destinations')
  }
} 