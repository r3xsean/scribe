import { ChildProcess, spawn } from 'child_process'
import path from 'path'
import { app } from 'electron'
import http from 'http'
import readline from 'readline'

let backendProcess: ChildProcess | null = null
let backendUrl: string | null = null

function isDev(): boolean {
  return !app.isPackaged
}

function pollHealth(url: string, timeoutMs: number): Promise<void> {
  const startTime = Date.now()
  return new Promise((resolve, reject) => {
    const check = () => {
      if (Date.now() - startTime > timeoutMs) {
        reject(new Error(`Backend health check timed out after ${timeoutMs}ms`))
        return
      }

      const req = http.get(`${url}/health`, (res) => {
        if (res.statusCode === 200) {
          resolve()
        } else {
          setTimeout(check, 500)
        }
      })

      req.on('error', () => {
        setTimeout(check, 500)
      })

      req.setTimeout(2000, () => {
        req.destroy()
        setTimeout(check, 500)
      })
    }

    check()
  })
}

export async function startBackend(): Promise<string> {
  if (backendUrl) {
    return backendUrl
  }

  return new Promise((resolve, reject) => {
    let command: string
    let args: string[]

    if (isDev()) {
      command = 'python'
      args = [path.join(app.getAppPath(), 'backend', 'server.py')]
    } else {
      const serverPath = path.join(process.resourcesPath, 'backend', 'server.exe')
      command = serverPath
      args = []
    }

    console.log(`Starting backend: ${command} ${args.join(' ')}`)

    backendProcess = spawn(command, args, {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env }
    })

    let portFound = false

    const rl = readline.createInterface({
      input: backendProcess.stdout!,
      crlfDelay: Infinity
    })

    rl.on('line', (line: string) => {
      console.log(`[backend] ${line}`)

      const portMatch = line.match(/PORT:(\d+)/)
      if (portMatch && !portFound) {
        portFound = true
        const port = parseInt(portMatch[1], 10)
        const url = `http://127.0.0.1:${port}`

        pollHealth(url, 30000)
          .then(() => {
            backendUrl = url
            console.log(`Backend ready at ${url}`)
            resolve(url)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })

    backendProcess.stderr?.on('data', (data: Buffer) => {
      console.error(`[backend stderr] ${data.toString()}`)
    })

    backendProcess.on('error', (err) => {
      console.error('Failed to start backend:', err)
      if (!portFound) {
        reject(new Error(`Failed to start backend: ${err.message}`))
      }
    })

    backendProcess.on('exit', (code, signal) => {
      console.log(`Backend exited with code ${code}, signal ${signal}`)
      backendProcess = null
      backendUrl = null
      if (!portFound) {
        reject(new Error(`Backend exited before reporting port (code ${code})`))
      }
    })

    // Timeout if port is never reported
    setTimeout(() => {
      if (!portFound) {
        reject(new Error('Backend did not report PORT within 30 seconds'))
        stopBackend()
      }
    }, 30000)
  })
}

export function stopBackend(): void {
  if (!backendProcess) {
    return
  }

  console.log('Stopping backend...')

  try {
    if (process.platform === 'win32') {
      // On Windows, use taskkill to kill the process tree
      spawn('taskkill', ['/pid', String(backendProcess.pid), '/f', '/t'], {
        stdio: 'ignore'
      })
    } else {
      backendProcess.kill('SIGTERM')

      // Force kill after 5 seconds if still running
      const pid = backendProcess.pid
      setTimeout(() => {
        try {
          if (pid) {
            process.kill(pid, 'SIGKILL')
          }
        } catch {
          // Process already exited
        }
      }, 5000)
    }
  } catch {
    // Process may already be dead
  }

  backendProcess = null
  backendUrl = null
}
