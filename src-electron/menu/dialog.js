import { dialog, BrowserWindow } from 'electron'

function errorDialog(message) {
  dialog.showMessageBox(BrowserWindow.fromId(1), {
    message: String(message),
    type: 'error',
    title: 'UI Control Error'
  })
}

export { errorDialog }
