import { BrowserWindow, ipcMain } from 'electron'
import { send } from '../osc'

ipcMain.on('onRequest', async (e, args) => {
  console.log('ipcMain', args)
  switch (args.command) {
    case 'send':
      send()
      break
    default:
      console.log('default', args)
      break
  }
})
