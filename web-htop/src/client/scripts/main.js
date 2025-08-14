const fetchSystemData = async () => {
    try {
        const response = await fetch('/api/system-stats');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error fetching system data:', error);
        document.getElementById('error-message').textContent = 'Failed to fetch system data';
    }
};

const updateUI = (data) => {
    // Update system stats
    document.getElementById('cpu-usage').textContent = `Overall CPU: ${data.cpuUsage}`;
    document.getElementById('memory-usage').innerHTML = `
        Memory: ${data.memoryUsage.used}MB (${data.memoryUsage.usedGB}GB) / ${data.memoryUsage.total}MB (${data.memoryUsage.totalGB}GB)
        <br><small style="color: #a0aec0;">${data.memoryUsage.usagePercent}% used</small>
    `;
    document.getElementById('load-average').textContent = `Load: ${data.systemLoad.load1} ${data.systemLoad.load5} ${data.systemLoad.load15}`;

    // Update CPU summary and cores
    updateCpuSummary(data.cpuSummary);
    updateCpuCores(data.cpuCores);
    
    // Update memory breakdown
    updateMemoryBreakdown(data.memoryUsage);

    // Update process table
    updateProcessTable(data.processes);
};

const updateCpuSummary = (summary) => {
    const container = document.getElementById('cpu-summary');
    container.innerHTML = `
        <div class="cpu-summary-grid">
            <div class="summary-item">
                <div class="summary-label">Total Cores</div>
                <div class="summary-value">${summary.totalCores}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Active Cores</div>
                <div class="summary-value">${summary.activeCores}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Available Cores</div>
                <div class="summary-value">${summary.availableCores}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Average Usage</div>
                <div class="summary-value">${summary.averageUsage}%</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">User Time</div>
                <div class="summary-value">${summary.totalUserTime}%</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">System Time</div>
                <div class="summary-value">${summary.totalSystemTime}%</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Idle Time</div>
                <div class="summary-value">${summary.totalIdleTime}%</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">IO Wait</div>
                <div class="summary-value">${summary.totalIoWaitTime}%</div>
            </div>
        </div>
    `;
};

const updateCpuCores = (cores) => {
    const container = document.getElementById('cores-container');
    container.innerHTML = '<h3 style="color: #63b3ed; margin: 0 0 15px 0;">Individual CPU Cores</h3>';
    
    cores.forEach(core => {
        const coreDiv = document.createElement('div');
        coreDiv.className = `cpu-core ${core.isActive ? 'active' : 'inactive'}`;
        coreDiv.innerHTML = `
            <div class="core-header">
                Core ${core.core} 
                <span class="core-status ${core.isActive ? 'active' : 'inactive'}">${core.isActive ? 'ACTIVE' : 'IDLE'}</span>
            </div>
            <div class="core-details">
                <div class="core-bar">
                    <div class="core-bar-fill" style="width: ${core.usage}%"></div>
                </div>
                <div class="core-breakdown">
                    ${core.usage}% | User: ${core.user}% | Sys: ${core.system}% | IO: ${core.iowait}% | Idle: ${core.idle}%
                </div>
            </div>
        `;
        container.appendChild(coreDiv);
    });
};

const updateMemoryBreakdown = (memory) => {
    const container = document.getElementById('memory-breakdown');
    container.innerHTML = `
        <div class="memory-item">
            <div class="memory-bar">
                <div class="memory-bar-used" style="width: ${memory.usagePercent}%"></div>
            </div>
            <div class="memory-details">
                <div>Total: ${memory.total}MB <small class="gb-text">(${memory.totalGB}GB)</small></div>
                <div>Used: ${memory.used}MB <small class="gb-text">(${memory.usedGB}GB)</small> - ${memory.usagePercent}%</div>
                <div>Free: ${memory.free}MB <small class="gb-text">(${memory.freeGB}GB)</small></div>
                <div>Available: ${memory.available}MB <small class="gb-text">(${memory.availableGB}GB)</small></div>
                <div>Buffers: ${memory.buffers}MB <small class="gb-text">(${memory.buffersGB}GB)</small></div>
                <div>Cached: ${memory.cached}MB <small class="gb-text">(${memory.cachedGB}GB)</small></div>
            </div>
        </div>
    `;
};

const updateProcessTable = (processes) => {
    const tableContainer = document.getElementById('table-container');
    
    // Create table if it doesn't exist
    let table = document.getElementById('process-table');
    if (!table) {
        table = document.createElement('table');
        table.id = 'process-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>PID</th>
                    <th>PPID</th>
                    <th>User</th>
                    <th>Process Name</th>
                    <th>CPU %</th>
                    <th>Memory %</th>
                    <th>Memory MB</th>
                    <th>Virtual MB</th>
                    <th>State</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        tableContainer.appendChild(table);
    }

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Add process rows
    processes.slice(0, 30).forEach(process => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${process.pid}</td>
            <td>${process.ppid}</td>
            <td>${process.user}</td>
            <td class="process-name">${process.name}</td>
            <td>${process.cpu.toFixed(1)}%</td>
            <td>${process.memory.toFixed(1)}%</td>
            <td>${process.memoryMB}</td>
            <td>${process.virtualMemory}</td>
            <td>${process.state}</td>
            <td>${process.startTime}</td>
        `;
        tbody.appendChild(row);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    fetchSystemData();
    setInterval(fetchSystemData, 5000); // Refresh data every 5 seconds
});
