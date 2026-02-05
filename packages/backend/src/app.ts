import cors from 'cors'
import express from 'express'

import { nodesRouter } from './routes/nodes.route.js'

export const app = express()

app.use(cors())
app.use(express.json())
// Disable caching for all responses
app.use((_req, res, next) => {
	res.setHeader('Cache-Control', 'no-store')
	next()
})

app.use('/api/nodes', nodesRouter)
