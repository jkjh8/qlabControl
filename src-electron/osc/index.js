import { Server, Client } from 'node-osc'

const oscServer = new Server(53001, '0,0,0,0', () => {
  console.log('osc server start')
})

oscServer.on('message', (msg) => {
  console.log(msg)
})

function send() {
  const client = new Client('192.168.1.36', 53000)
  client.send('/go', 1)
  console.log('send')
}

export { send }
