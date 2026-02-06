import type { NodeDto } from '@app/shared/dist/node.dto'
import { AlertTriangle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface NodesTableProps {
	nodes: NodeDto[]
	onlineOnly: boolean
	nodesCount: number
}

export const NodesTable = ({ nodes, onlineOnly, nodesCount }: NodesTableProps) => {
	return (
		<Table className="rounded-md overflow-hidden">
			<TableHeader className="bg-neutral-300">
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>CPU Usage (%)</TableHead>
					<TableHead>Memory Usage (GB)</TableHead>
					<TableHead>Last Updated</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{nodes.map((node) => (
					<TableRow key={node.id} className={cn(node.status === 'offline' && 'bg-gray-200')}>
						<TableCell>{node.id}</TableCell>
						<TableCell>{node.name}</TableCell>
						<TableCell>
							<Badge
								variant={node.status === 'offline' ? 'destructive' : 'secondary'}
								className={cn(
									'font-normal text-xs px-2 py-1 capitalize',
									node.status === 'online' && 'bg-emerald-600 text-white',
									node.status === 'maintenance' && 'bg-amber-500 text-white',
								)}
							>
								{node.status}
							</Badge>
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-2">
								<span>{node.cpuUsage}</span>
								{node.cpuUsage >= 80 && <AlertTriangle className="h-5 w-5 text-red-600" />}
							</div>
						</TableCell>
						<TableCell>{node.memoryUsage}</TableCell>
						<TableCell>{new Date(node.timestamp).toLocaleTimeString()}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter className="bg-neutral-300">
				<TableRow>
					<TableCell colSpan={6}>{onlineOnly ? `Total online nodes: ${nodesCount}` : `Total nodes: ${nodesCount}`}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}
