import cors from 'cors'
import express from 'express'

import { nodesRouter } from './routes/nodes.route.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/nodes', nodesRouter)
