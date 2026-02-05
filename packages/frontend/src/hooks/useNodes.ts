import type { NodeDto } from '@app/shared/dist/node.dto'
import { useEffect, useState } from 'react'

// This hook fetches the list of nodes from the backend API and polls for updates

const POLL_INTERVAL = 3000 // 3 seconds

export function useNodes() {
	const [nodes, setNodes] = useState<NodeDto[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	async function fetchNodes() {
		try {
			const res = await fetch('/api/nodes', { cache: 'no-store' })

			if (!res.ok) {
				setError(`Failed to fetch nodes: ${res.status} ${res.statusText}`)
				return
			}

			const data: NodeDto[] = await res.json()
			setNodes(data)
			setError(null)
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Unknown error')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchNodes()
		const id = setInterval(fetchNodes, POLL_INTERVAL)

		return () => clearInterval(id)
	}, [])

	return { nodes, loading, error }
}
