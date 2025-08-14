export interface ProcessInfo {
    pid: number;
    user: string;
    command: string;
    cpu: number;
    memory: number;
}

export interface SystemStats {
    uptime: number;
    loadAverage: number[];
    totalMemory: number;
    freeMemory: number;
    usedMemory: number;
    processes: ProcessInfo[];
}