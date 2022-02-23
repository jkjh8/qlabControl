import { BrowserWindow, ipcMain } from 'electron'
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
    default:
      console.log('default', args)
      break
  }
  selected()
  setTimeout(function () {
    running()
  }, 10)
})
