import { BrowserWindow } from 'electron'
import { Server, Client } from 'node-osc'

let now = new Date()
let qlabStatus = false

let workspace_id

const ipaddress = '192.168.0.119'
const port = 53000

const client = new Client(ipaddress, port)
const oscServer = new Server(53001, '0,0,0,0', () => {
  console.log('osc server start')
})

oscServer.on('message', (msg) => {
  try {
    const comm = JSON.parse(msg[1])
    if (comm.status === 'ok') {
      parcing(comm)
    }
  } catch (e) {
    console.error(e)
  }
})

function send(addr) {
  client.send(addr)
  console.log('send')
}

function connect(workspace) {
  workspace_id = workspace
  client.send(`/workspace/${workspace}/connect`)
}

function workspaces() {
  client.send('/workspaces')
}

function cueLists() {
  client.send(`/workspace/${workspace_id}/cueLists`)
}

function selectCue(id) {
  client.send(`/workspace/${workspace_id}/select_id/${id}`)
}

function playDirect(id) {
  client.send(`/workspace/${workspace_id}/select_id/${id}`)
  client.send(`/workspace/${workspace_id}/go`)
}

function selected() {
  client.send(`/workspace/${workspace_id}/selectedCues`)
}

function running() {
  client.send(`/workspace/${workspace_id}/runningCues`)
}

function runningOrPaused() {
  client.send(`/workspace/${workspace_id}/runningOrPausedCues`)
}

function command(str) {
  client.send(`/workspace/${workspace_id}/${str}`)
  selected()
}

function cue(str) {
  client.send(`/cue/${str}`)
}

function parcing(args) {
  if (args.status === 'ok') {
    now = new Date()
  }
  const mainWindow = BrowserWindow.fromId(1)
  const address = args.address.split('/')
  switch (address[address.length - 1]) {
    case 'workspaces':
      mainWindow.webContents.send('onResponse', {
        section: 'workspaces',
        data: args.data
      })
      break
    case 'connect':
      client.send(`/workspace/${workspace_id}/cueLists`)
      break
    case 'cueLists':
      mainWindow.webContents.send('onResponse', {
        section: 'cueLists',
        data: args.data
      })
    case 'selectedCues':
      mainWindow.webContents.send('onResponse', {
        section: 'selectedCues',
        data: args.data
      })
      break
    case 'runningCues':
      mainWindow.webContents.send('onResponse', {
        section: 'runningCues',
        data: args.data
      })
      break
    default:
      console.error('unknown command', args)
      break
  }
}

const hartbite = setInterval(() => {
  const currTime = new Date()
  if (currTime - now > 5000) {
    qlabStatus = false
  } else {
    qlabStatus = true
  }
  selected()
  running()
}, 1000)

export {
  send,
  connect,
  workspaces,
  cueLists,
  selectCue,
  playDirect,
  selected,
  running,
  runningOrPaused,
  command,
  cue,
  qlabStatus
}
