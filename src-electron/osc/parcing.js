import { BrowserWindow } from 'electron'
import db from '../db'

import {
  connect,
  send,
  workspaces,
  cueLists,
  selectCue,
  playDirect,
  command,
  selected,
  running,
  runningOrPaused,
  cue,
  qlabStatus
} from './index'
import { createServer, distoryServer } from '../tcp'

let cueNames = []

async function parcing(args) {
  let rt = null
  const mainWindow = BrowserWindow.fromId(1)
  switch (args.command) {
    case 'send':
      send(args.value)
      break
    case 'connect':
      connect()
      break
    case 'workspaces':
      workspaces()
      break
    case 'selWorkspace':
      connect(args.value)
      break
    case 'cueLists':
      cueLists()
      break
    case 'selectCue':
      selectCue(args.value)
      break
    case 'playDirect':
      playDirect(args.value)
      break
    case 'command':
      command(args.value)
      break
    case 'selected':
      selected()
      break
    case 'cue':
      cue(args.value)
      break
    case 'start':
      const server = await db.setup.findOne({ section: 'server' })
      if (server) {
        mainWindow.webContents.send('onResponse', {
          command: 'server',
          status: server.status,
          port: server.port
        })
        if (server.status) {
          createServer(server.port)
        }
      }
      workspaces()
      break
    case 'openServer':
      createServer(args.port)
      break
    case 'closeServer':
      distoryServer()
      break
    case 'status':
      rt = JSON.stringify({ command: 'status', status: qlabStatus })
      break
    case 'getCueNames':
      rt = JSON.stringify({ command: 'cueNames', value: cueNames })
      break
    case 'cueNames':
      cueNames = args.value
      break
    default:
      console.log('default', args)
      break
  }
  if (rt) {
    return rt
  }
}

export default parcing
