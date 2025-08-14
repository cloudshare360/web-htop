# Web HTOP 🖥️

**Web HTOP** is a modern, web-based system monitoring application that provides real-time system performance metrics through an intuitive web interface. Inspired by the popular command-line tool `htop`, this application brings system monitoring to the browser with enhanced features and accessibility.

## 🌟 Features

### Real-time System Monitoring
- **CPU Core Monitoring**: Individual CPU core usage with detailed breakdown
  - Per-core usage percentages
  - User time, system time, I/O wait, and idle time metrics
  - Active/Inactive core status indicators
  - CPU summary with total, available, and active cores

- **Memory Management**: Comprehensive memory usage statistics
  - Total memory displayed in both MB and GB
  - Used, free, available, buffers, and cached memory
  - Memory usage percentage with visual indicators
  - Real-time memory breakdown

- **Process Management**: Detailed process information
  - Top 50 processes sorted by memory usage
  - Process ID, parent process ID, user, and command
  - CPU and memory usage per process
  - Process state and start time
  - Memory usage in MB for easy reading

- **System Load**: System performance indicators
  - Load averages (1, 5, 15 minutes)
  - Running vs total processes count
  - Real-time system health metrics

### User Interface
- **Dark Terminal Theme**: Professional dark interface resembling terminal applications
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Automatic data refresh every 5 seconds
- **Clean Layout**: Organized sections for easy data interpretation
- **Visual Indicators**: Color-coded status badges and progress bars

## 🏗️ Architecture & Technology Stack

### Backend (Node.js + TypeScript)
- **Express.js**: Web framework for API endpoints
- **TypeScript**: Type-safe development
- **System Integration**: Direct integration with Linux `/proc/stat` for accurate CPU metrics
- **Real-time Data**: Live system data collection using child processes

### Frontend (Vanilla JavaScript)
- **Pure JavaScript**: No framework dependencies for better performance
- **Fetch API**: RESTful communication with backend
- **DOM Manipulation**: Dynamic UI updates
- **CSS Grid/Flexbox**: Modern responsive layout

### System Integration
- **Linux Compatibility**: Optimized for Linux-based systems
- **Process Monitoring**: Direct `/proc` filesystem access
- **Memory Statistics**: Real-time memory usage from system APIs
- **CPU Metrics**: Per-core CPU utilization tracking

## 📁 Project Structure

```
web-htop/
├── 📂 src/
│   ├── 📂 server/                    # Backend application
│   │   ├── 📄 app.ts                 # Express server entry point
│   │   ├── 📂 routes/
│   │   │   └── 📄 api.ts             # REST API endpoints
│   │   ├── 📂 services/
│   │   │   └── 📄 systemInfo.ts      # System data collection logic
│   │   └── 📂 types/
│   │       └── 📄 index.ts           # TypeScript type definitions
│   ├── 📂 client/                    # Frontend application
│   │   ├── 📄 index.html             # Main HTML page
│   │   ├── 📂 styles/
│   │   │   └── 📄 main.css           # CSS styling (dark theme)
│   │   ├── 📂 scripts/
│   │   │   └── 📄 main.js            # Client-side JavaScript
│   │   └── 📂 components/
│   │       └── 📄 ProcessTable.js    # Process table component
│   └── 📂 shared/
│       └── 📄 types.ts               # Shared TypeScript interfaces
├── 📂 public/
│   └── 📄 favicon.ico                # Application favicon
├── 📄 package.json                   # npm package configuration
├── 📄 tsconfig.json                  # TypeScript compiler config
├── 📄 README.md                      # Project documentation
└── 📄 .gitignore                     # Git ignore rules
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher  
- **Operating System**: Linux-based system (Ubuntu, Debian, CentOS, etc.)
- **System Access**: Read permissions for `/proc` filesystem

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/cloudshare360/web-htop.git
cd web-htop
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Build the TypeScript Code
```bash
npm run build
```

#### 4. Start the Application
```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

#### 5. Access the Application
Open your web browser and navigate to:
```
http://localhost:3000
```

### Alternative Installation Methods

#### Using npx (if published to npm)
```bash
npx web-htop
```

#### Global Installation
```bash
npm install -g web-htop
web-htop
```

## 🖥️ Usage Guide

### Basic Usage
1. **Start the application** using one of the installation methods above
2. **Open your browser** and go to `http://localhost:3000`
3. **Monitor your system** in real-time with automatic updates every 5 seconds

### Interface Overview

#### CPU Section
- **Overall CPU Usage**: System-wide CPU utilization
- **Individual Cores**: Each CPU core with detailed metrics
  - Usage percentage with color-coded bars
  - User time, system time, I/O wait, and idle percentages
  - Active/Inactive status indicators
- **CPU Summary**: Total cores, active cores, and average usage

#### Memory Section
- **Total Memory**: Available system memory in MB and GB
- **Used Memory**: Currently allocated memory
- **Available Memory**: Free memory available for new processes
- **Usage Percentage**: Visual indicator of memory utilization

#### Process Section
- **Top Processes**: 50 most memory-intensive processes
- **Process Details**: PID, user, CPU%, memory%, command
- **Real-time Updates**: Process list refreshes automatically

#### System Load
- **Load Averages**: 1, 5, and 15-minute system load averages
- **Process Count**: Running vs total processes

### Configuration Options

#### Port Configuration
Change the default port by setting the `PORT` environment variable:
```bash
PORT=8080 npm start
```

#### Update Interval
The default update interval is 5 seconds. This can be modified in `src/client/scripts/main.js`:
```javascript
// Change the interval (in milliseconds)
setInterval(fetchSystemData, 5000); // 5 seconds
```

## 📦 Publishing as NPM Module

### Prerequisites for Publishing
- npm account (create at [npmjs.com](https://www.npmjs.com))
- npm CLI logged in (`npm login`)
- Unique package name on npm registry

### Step-by-Step Publishing Guide

#### 1. Prepare package.json
First, update your `package.json` with publishing-specific fields:

```json
{
  "name": "web-htop-monitor",
  "version": "1.0.0",
  "description": "Web-based system monitoring tool with real-time CPU, memory, and process tracking",
  "main": "dist/server/app.js",
  "bin": {
    "web-htop": "bin/web-htop.js"
  },
  "scripts": {
    "start": "node dist/server/app.js",
    "build": "tsc",
    "dev": "ts-node-dev src/server/app.ts",
    "prepare": "npm run build"
  },
  "keywords": [
    "system-monitor",
    "htop",
    "cpu-monitor",
    "memory-monitor",
    "process-monitor",
    "linux",
    "web-dashboard",
    "real-time",
    "performance"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/cloudshare360/web-htop.git"
  },
  "homepage": "https://github.com/cloudshare360/web-htop#readme",
  "bugs": {
    "url": "https://github.com/cloudshare360/web-htop/issues"
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "os": ["linux", "darwin"],
  "files": [
    "dist/",
    "src/client/",
    "public/",
    "bin/",
    "README.md",
    "LICENSE"
  ]
}
```

#### 2. Create CLI Binary
Create `bin/web-htop.js` for global CLI usage:

```javascript
#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');

// Start the web-htop server
const serverPath = path.join(__dirname, '..', 'dist', 'server', 'app.js');
const child = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: { ...process.env, PORT: process.env.PORT || 3000 }
});

child.on('error', (error) => {
  console.error('Failed to start web-htop:', error);
  process.exit(1);
});

process.on('SIGINT', () => {
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
});
```

#### 3. Update .npmignore
Create `.npmignore` to exclude development files:

```
# Development files
src/
*.ts
!*.d.ts
tsconfig.json
.git/
.gitignore
node_modules/
coverage/
.nyc_output/
.env
.env.*

# Documentation
docs/
*.md
!README.md

# Testing
test/
tests/
__tests__/
*.test.js
*.spec.js

# Build artifacts
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

#### 4. Build and Test Locally
```bash
# Build the project
npm run build

# Test the package locally
npm pack
npm install -g ./web-htop-monitor-1.0.0.tgz

# Test the CLI
web-htop
```

#### 5. Login to npm
```bash
npm login
```

#### 6. Check Package Name Availability
```bash
npm search web-htop-monitor
```

#### 7. Publish to npm
```bash
# For first-time publishing
npm publish

# For scoped packages (if you want to publish under your username)
npm publish --access public
```

#### 8. Verify Publication
```bash
# Check if published successfully
npm view web-htop-monitor

# Test installation from npm
npm install -g web-htop-monitor
```

### Updating the Package

#### Version Management
```bash
# Patch version (bug fixes)
npm version patch

# Minor version (new features)
npm version minor

# Major version (breaking changes)  
npm version major

# Publish the update
npm publish
```

#### Publishing Beta Versions
```bash
# Publish as beta
npm version prerelease --preid=beta
npm publish --tag beta

# Install beta version
npm install -g web-htop-monitor@beta
```

### Post-Publication Checklist
- [ ] Test installation on clean system
- [ ] Verify CLI command works globally
- [ ] Update documentation with npm installation instructions
- [ ] Add badges to README (version, downloads, license)
- [ ] Set up automated publishing with GitHub Actions (optional)

### npm Package Maintenance
- Monitor download stats on [npmjs.com](https://www.npmjs.com)
- Respond to issues and feature requests
- Keep dependencies updated
- Follow semantic versioning
- Maintain backward compatibility when possible

## 🛠️ Development

### Development Setup
```bash
# Clone repository
git clone https://github.com/cloudshare360/web-htop.git
cd web-htop

# Install dependencies
npm install

# Start development server with auto-reload
npm run dev
```

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm test` - Run tests (if configured)
- `npm run lint` - Lint code (if configured)

### Adding New Features
1. **Backend API**: Add new endpoints in `src/server/routes/api.ts`
2. **System Metrics**: Extend `src/server/services/systemInfo.ts`
3. **Frontend UI**: Update `src/client/scripts/main.js` and `src/client/styles/main.css`
4. **Types**: Define interfaces in `src/shared/types.ts`

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=8080 npm start
```

#### Permission Denied (Linux)
```bash
# Ensure read access to /proc filesystem
ls -la /proc/stat
ls -la /proc/meminfo

# Run with appropriate permissions if needed
sudo npm start
```

#### TypeScript Compilation Errors
```bash
# Clean build
rm -rf dist/
npm run build
```

#### Missing Dependencies
```bash
# Reinstall all dependencies
rm -rf node_modules/
npm install
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues
- Use GitHub Issues to report bugs
- Include system information (OS, Node.js version)
- Provide steps to reproduce the issue

### Feature Requests
- Describe the feature and its benefits
- Explain the use case
- Consider implementation complexity

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📊 Performance Considerations

### System Impact
- **Low CPU Usage**: Minimal system overhead
- **Memory Efficient**: Small memory footprint
- **Network Optimized**: Efficient data transfer
- **Scalable**: Handles multiple concurrent users

### Optimization Tips
- Adjust update intervals based on needs
- Use reverse proxy (nginx) for production
- Enable gzip compression
- Implement caching for static assets

## 🔒 Security Considerations

### Production Deployment
- Run behind reverse proxy
- Use HTTPS in production
- Implement rate limiting
- Restrict access to trusted networks
- Regular security updates

### Permissions
- Requires read access to `/proc` filesystem
- No write permissions needed
- Runs with minimal privileges

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 🙏 Acknowledgments

- Inspired by the original [htop](https://htop.dev/) command-line tool
- Built with modern web technologies
- Community contributions and feedback
- Open source libraries and tools

## 📞 Support

- **Documentation**: This README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/cloudshare360/web-htop/issues)
- **Discussions**: [GitHub Discussions](https://github.com/cloudshare360/web-htop/discussions)
- **Email**: [your.email@example.com](mailto:your.email@example.com)

---

**Happy Monitoring!** 🎉

Made with ❤️ by the Web HTOP team