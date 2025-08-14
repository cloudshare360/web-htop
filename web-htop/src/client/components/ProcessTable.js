import React from 'react';

const ProcessTable = ({ processes }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>PID</th>
                    <th>USER</th>
                    <th>COMMAND</th>
                    <th>CPU %</th>
                    <th>MEM %</th>
                </tr>
            </thead>
            <tbody>
                {processes.map(process => (
                    <tr key={process.pid}>
                        <td>{process.pid}</td>
                        <td>{process.user}</td>
                        <td>{process.command}</td>
                        <td>{process.cpu}</td>
                        <td>{process.mem}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProcessTable;