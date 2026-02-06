import { useState } from 'react'

import { useNodes } from './hooks/useNodes'

import { NodesTable } from '@/components/nodes/NodesTable'
import { Field, FieldLabel } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Switch } from '@/components/ui/switch'

export const App = () => {
	const { nodes, loading, error } = useNodes()
	const [onlineOnly, setOnlineOnly] = useState(false)

	const nodesToRender = onlineOnly ? nodes.filter((n) => n.status === 'online') : nodes
	const nodesCount = nodesToRender.length

	return (
		<main className="w-full p-6 flex flex-col gap-4 bg-gray-50 min-h-screen">
			<h1 className="text-xl font-semibold">List of monitored nodes</h1>
			{loading && (
				<div className="fixed inset-0 flex items-center justify-center">
					<Spinner className="size-10 text-purple-500" />
				</div>
			)}

			{error && <div className="text-red-500">Error: {error}</div>}

			{nodesToRender.length === 0 && !loading && !error && (
				<div className="text-sm text-muted-foreground">{onlineOnly ? 'No online nodes at the moment.' : 'No nodes found.'}</div>
			)}

			{nodesToRender.length > 0 && (
				<>
					<Field orientation="horizontal" className="w-max self-end">
						<FieldLabel htmlFor="online-only-switch" className="text-purple-500">
							Show online nodes only
						</FieldLabel>
						<Switch id="online-only-switch" checked={onlineOnly} onCheckedChange={setOnlineOnly} />
					</Field>

					<Separator />

					<NodesTable nodes={nodesToRender} onlineOnly={onlineOnly} nodesCount={nodesCount} />
				</>
			)}
		</main>
	)
}
