import { Router } from 'express'
import { tripsController } from 'src/controllers'

// Trips-route
const tripsRouter = Router()
tripsRouter.get('/', tripsController)

// Export the base-router
const baseRouter = Router()
baseRouter.use('/trips', tripsRouter)
export default baseRouter
