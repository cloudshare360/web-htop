#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

console.log('🖥️  Starting Web HTOP...');
console.log('📊 System monitoring dashboard will be available at http://localhost:3000');
console.log('⏹️  Press Ctrl+C to stop the server\n');

// Determine the server path
const serverPath = path.join(__dirname, '..', 'dist', 'server', 'app.js');

// Set default port if not specified
const port = process.env.PORT || 3000;

// Start the web-htop server
const child = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: { ...process.env, PORT: port }
});

child.on('error', (error) => {
  console.error('❌ Failed to start web-htop:', error.message);
  console.error('💡 Make sure the application is built. Run: npm run build');
  process.exit(1);
});

child.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Web HTOP exited with code ${code}`);
  } else {
    console.log('👋 Web HTOP stopped');
  }
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down Web HTOP...');
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down Web HTOP...');
  child.kill('SIGTERM');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  child.kill('SIGTERM');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  child.kill('SIGTERM');
  process.exit(1);
});
