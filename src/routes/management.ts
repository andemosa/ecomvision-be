import express from 'express'

import { getAdmins, getUserPerformance } from '../controllers/management'


const adminRouter = express.Router()

adminRouter.get("/admins", getAdmins)
adminRouter.get("/performance/:id", getUserPerformance)

export default adminRouter
