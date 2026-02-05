import type { Request, Response } from 'express'

import { listNodes } from '../services/nodes.service.js'

export function getNodes(_req: Request, res: Response) {
	try {
		const nodes = listNodes()
		res.status(200).json(nodes)
	} catch (error) {
		console.log('Failed to get nodes', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}
