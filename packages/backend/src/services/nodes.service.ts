import type { NodeDto } from '@app/shared/dist/node.dto'

import { nodesStore } from '../data/nodes.store.js'

export function listNodes(): NodeDto[] {
	// Here logic what to do with data
	return nodesStore
}
