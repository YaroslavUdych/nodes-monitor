import type { NodeDto, NodeStatus } from '@app/shared/dist/node.dto'

import { pickOne, randomFloat, randomInt } from '../utils/random.js'

const STATUSES: NodeStatus[] = ['online', 'offline', 'maintenance']

function pad2(n: number) {
	return String(n).padStart(2, '0')
}

function makeId(i: number) {
	return `node-${pad2(i)}`
}

function makeName(i: number) {
	return `Worker Node ${pad2(i)}`
}

export function createInitialNodes(count = 50): NodeDto[] {
	const now = new Date().toISOString()

	return Array.from({ length: count }, (_, idx) => {
		const i = idx + 1

		return {
			id: makeId(i),
			name: makeName(i),
			status: pickOne(STATUSES),
			cpuUsage: randomInt(0, 100),
			memoryUsage: randomFloat(1, 32, 1),
			timestamp: now,
		}
	})
}

// In-memory store
export const nodesStore: NodeDto[] = createInitialNodes(50)
