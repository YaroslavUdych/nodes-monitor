import type { Request, Response } from 'express'

import { listNodes } from '../services/nodes.service.js'

export function getNodes(_req: Request, res: Response) {
	// Here recieves request and responds
	const nodes = listNodes()
	res.json(nodes)
}
