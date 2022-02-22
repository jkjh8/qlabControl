import { Server, Client } from 'node-osc'

const oscServer = new Server(53001, '0,0,0,0', () => {
  console.log('osc server start')
})

oscServer.on('message', (msg) => {
  console.log(msg)
})

function send(addr) {
  const client = new Client('127.0.0.1', 53000)
  client.send(addr, 1)
  console.log('send')
}

export { send }
