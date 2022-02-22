import { BrowserWindow } from 'electron'
import { Server, Client } from 'node-osc'
let workspcae_id

const ipaddress = '192.168.1.36'
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

function connect() {
  client.send('/connect')
}

function workspaces() {
  client.send('/workspaces')
}

function parcing(args) {
  console.log(args)
  switch (args.address) {
    case '/workspaces':
      console.log(args.data)
      BrowserWindow.fromId(1).webContents.send('onResponse', {
        section: 'workspaces',
        data: args.data
      })
      break
    default:
      console.error('unknown command')
      break
  }
}

export { send, connect, workspaces }
