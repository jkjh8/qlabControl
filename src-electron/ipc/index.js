import { BrowserWindow, ipcMain } from 'electron'
import { connect, send, workspaces } from '../osc'

ipcMain.on('onRequest', async (e, args) => {
  console.log('ipcMain', args)
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
    default:
      console.log('default', args)
      break
  }
})
