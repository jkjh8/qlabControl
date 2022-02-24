import { BrowserWindow, ipcMain } from 'electron'
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
  cue
} from '../osc'
// import { createServer, distoryServer } from '../tcp'
import parcing from '../osc/parcing'

ipcMain.on('onRequest', async (e, args) => {
  console.log('ipcMain', args)
  await parcing(args)
  // const mainWindow = BrowserWindow.fromId(1)
  // switch (args.command) {
  //   case 'send':
  //     send(args.value)
  //     break
  //   case 'connect':
  //     connect()
  //     break
  //   case 'workspaces':
  //     workspaces()
  //     break
  //   case 'selWorkspace':
  //     connect(args.value)
  //     break
  //   case 'cueLists':
  //     cueLists()
  //     break
  //   case 'selectCue':
  //     selectCue(args.value)
  //     break
  //   case 'playDirect':
  //     playDirect(args.value)
  //     break
  //   case 'command':
  //     command(args.value)
  //     break
  //   case 'selected':
  //     selected()
  //     break
  //   case 'cue':
  //     cue(args.value)
  //     break
  //   case 'start':
  //     const server = await db.setup.findOne({ section: 'server' })
  //     if (server) {
  //       mainWindow.webContents.send('onResponse', {
  //         command: 'server',
  //         status: server.status,
  //         port: server.port
  //       })
  //       if (server.status) {
  //         createServer(server.port)
  //       }
  //     }
  //     workspaces()
  //     break
  //   case 'openServer':
  //     createServer(args.port)
  //     break
  //   case 'closeServer':
  //     distoryServer()
  //     break
  //   default:
  //     console.log('default', args)
  //     break
  // }
  selected()
  setTimeout(function () {
    running()
  }, 10)
})
