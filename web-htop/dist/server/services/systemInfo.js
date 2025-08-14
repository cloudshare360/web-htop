"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemStats = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
function getSystemStats() {
    return __awaiter(this, void 0, void 0, function* () {
        const [cpuUsage, cpuCores, memoryUsage, processes, systemLoad] = yield Promise.all([
            getCpuUsage(),
            getCpuCoreUsage(),
            getMemoryUsage(),
            getProcesses(),
            getSystemLoad()
        ]);
        return {
            cpuUsage,
            cpuCores,
            memoryUsage,
            processes,
            systemLoad,
        };
    });
}
exports.getSystemStats = getSystemStats;
function getCpuUsage() {
    return __awaiter(this, void 0, void 0, function* () {
        const { stdout } = yield execPromise('top -bn1 | grep "Cpu(s)"');
        const cpuLine = stdout.split(',')[0];
        return cpuLine.split(':')[1].trim();
    });
}
function getMemoryUsage() {
    return __awaiter(this, void 0, void 0, function* () {
        const { stdout } = yield execPromise('free -b');
        const lines = stdout.trim().split('\n');
        const memoryLine = lines[1].split(/\s+/);
        const total = parseInt(memoryLine[1], 10);
        const used = parseInt(memoryLine[2], 10);
        const free = parseInt(memoryLine[3], 10);
        const available = parseInt(memoryLine[6], 10);
        const buffers = parseInt(memoryLine[5], 10);
        const cached = parseInt(memoryLine[6], 10);
        return {
            total: Math.round(total / 1024 / 1024),
            used: Math.round(used / 1024 / 1024),
            free: Math.round(free / 1024 / 1024),
            available: Math.round(available / 1024 / 1024),
            buffers: Math.round(buffers / 1024 / 1024),
            cached: Math.round(cached / 1024 / 1024),
            usagePercent: Math.round((used / total) * 100)
        };
    });
}
function getCpuCoreUsage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Try using mpstat first
            const { stdout } = yield execPromise('mpstat -P ALL 1 1 | grep -E "^[0-9]|CPU"');
            const lines = stdout.trim().split('\n').slice(1); // Skip header
            const cores = [];
            for (const line of lines) {
                if (line.includes('Average') || line.includes('CPU'))
                    continue;
                const parts = line.trim().split(/\s+/);
                if (parts.length >= 11) {
                    const core = parts[2] === 'all' ? -1 : parseInt(parts[2], 10);
                    if (core >= 0) { // Skip the 'all' average line
                        cores.push({
                            core,
                            user: parseFloat(parts[3]),
                            system: parseFloat(parts[5]),
                            iowait: parseFloat(parts[6]),
                            idle: parseFloat(parts[10]),
                            usage: Math.round(100 - parseFloat(parts[10])) // 100 - idle = usage
                        });
                    }
                }
            }
            return cores;
        }
        catch (error) {
            // Fallback: parse /proc/stat for per-CPU stats
            const { stdout } = yield execPromise('cat /proc/stat | grep "^cpu[0-9]"');
            const lines = stdout.trim().split('\n');
            const cores = [];
            let coreIndex = 0;
            for (const line of lines) {
                const parts = line.split(/\s+/);
                if (parts.length >= 8) {
                    const user = parseInt(parts[1], 10);
                    const nice = parseInt(parts[2], 10);
                    const system = parseInt(parts[3], 10);
                    const idle = parseInt(parts[4], 10);
                    const iowait = parseInt(parts[5], 10);
                    const irq = parseInt(parts[6], 10);
                    const softirq = parseInt(parts[7], 10);
                    const total = user + nice + system + idle + iowait + irq + softirq;
                    const activeTime = total - idle;
                    const usage = total > 0 ? Math.round((activeTime / total) * 100) : 0;
                    cores.push({
                        core: coreIndex,
                        user: total > 0 ? Math.round((user / total) * 100) : 0,
                        system: total > 0 ? Math.round((system / total) * 100) : 0,
                        iowait: total > 0 ? Math.round((iowait / total) * 100) : 0,
                        idle: total > 0 ? Math.round((idle / total) * 100) : 100,
                        usage
                    });
                    coreIndex++;
                }
            }
            return cores;
        }
    });
}
function getSystemLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        const { stdout: loadAvg } = yield execPromise('cat /proc/loadavg');
        const { stdout: procStat } = yield execPromise('cat /proc/stat | grep processes');
        const loadParts = loadAvg.trim().split(/\s+/);
        const procParts = procStat.trim().split(/\s+/);
        return {
            load1: parseFloat(loadParts[0]),
            load5: parseFloat(loadParts[1]),
            load15: parseFloat(loadParts[2]),
            runningProcesses: parseInt(loadParts[3].split('/')[0], 10),
            totalProcesses: parseInt(loadParts[3].split('/')[1], 10)
        };
    });
}
function getProcesses() {
    return __awaiter(this, void 0, void 0, function* () {
        const { stdout } = yield execPromise('ps axo pid,ppid,user,pcpu,pmem,vsz,rss,state,etime,comm --sort=-%mem --no-headers');
        const lines = stdout.trim().split('\n');
        const processes = lines.slice(0, 50).map(line => {
            const parts = line.trim().split(/\s+/);
            if (parts.length >= 10) {
                const vsz = parseInt(parts[5], 10) || 0;
                const rss = parseInt(parts[6], 10) || 0;
                return {
                    pid: parseInt(parts[0], 10),
                    ppid: parseInt(parts[1], 10),
                    user: parts[2],
                    cpu: parseFloat(parts[3]),
                    memory: parseFloat(parts[4]),
                    memoryMB: Math.round(rss / 1024),
                    virtualMemory: Math.round(vsz / 1024),
                    residentMemory: rss,
                    state: parts[7],
                    startTime: parts[8],
                    name: parts.slice(9).join(' ')
                };
            }
            return {
                pid: 0,
                ppid: 0,
                user: 'unknown',
                cpu: 0,
                memory: 0,
                memoryMB: 0,
                virtualMemory: 0,
                residentMemory: 0,
                state: 'unknown',
                startTime: '00:00',
                name: 'unknown'
            };
        }).filter(p => p.pid > 0);
        return processes;
    });
}
