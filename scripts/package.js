/**
 * Package the full Electron app with electron-builder.
 * Run `node scripts/package.js` after building both frontend and backend.
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const ROOT = path.resolve(__dirname, '..')
const BACKEND_DIST = path.join(ROOT, 'backend', 'dist', 'server')

// Verify backend was built
if (!fs.existsSync(BACKEND_DIST)) {
  console.error('Backend not built. Run `python scripts/build-backend.py` first.')
  process.exit(1)
}

// Build the Electron app
console.log('Building Electron app...')
execSync('npm run build', { cwd: ROOT, stdio: 'inherit' })

// Package with electron-builder
console.log('Packaging with electron-builder...')
execSync('npx electron-builder --win', { cwd: ROOT, stdio: 'inherit' })

console.log('\nPackaging complete! Check the release/ directory.')
