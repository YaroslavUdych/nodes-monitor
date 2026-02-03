import { Router } from 'express'

import { getNodes } from '../controllers/nodes.controller.js'

export const nodesRouter = Router()

nodesRouter.get('/', getNodes)
