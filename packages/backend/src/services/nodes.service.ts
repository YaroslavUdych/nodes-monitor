import type { NodeDto, NodeStatus } from '@app/shared/dist/node.dto'

import { nodesStore } from '../data/nodes.store.js'
import { clamp, pickOne, randomFloat, randomInt } from '../utils/random.js'

const STATUSES: NodeStatus[] = ['online', 'offline', 'maintenance']

// Simulate changes in node status
const maybeChangeStatus = (currentStatus: NodeStatus): NodeStatus => {
	// 90% chance to keep the same status, 10% chance to change
	if (Math.random() > 0.1) return currentStatus
	return pickOne(STATUSES)
}

// Simulate changes in node metrics
const mutateNode = (node: NodeDto): NodeDto => {
	const now = new Date().toISOString()

	// change cpuUsage randomly by -15 to +15, clamped between 0 and 100
	const cpuDelta = randomInt(-15, 15)
	const nextCpuUsage = clamp(node.cpuUsage + cpuDelta, 0, 100)

	// change memoryUsage randomly by -1.5 to +1.5 GB, clamped between 0.1 and 64
	const memoryDelta = randomFloat(-1.5, 1.5, 1)
	const nextMemoryUsage = clamp(Number((node.memoryUsage + memoryDelta).toFixed(1)), 0.1, 64)

	return {
		...node,
		status: maybeChangeStatus(node.status),
		cpuUsage: nextCpuUsage,
		memoryUsage: nextMemoryUsage,
		timestamp: now,
	}
}

export function listNodes(): NodeDto[] {
	// Mutate each node in the store to simulate real-time changes
	for (let i = 0; i < nodesStore.length; i++) {
		nodesStore[i] = mutateNode(nodesStore[i])
	}

	return nodesStore
}
