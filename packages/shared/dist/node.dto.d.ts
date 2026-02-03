export type NodeStatus = 'online' | 'offline' | 'maintenance';
export interface NodeDto {
    id: string;
    name: string;
    status: NodeStatus;
    cpuUsage: number;
    memoryUsage: number;
    timestamp: string;
}
