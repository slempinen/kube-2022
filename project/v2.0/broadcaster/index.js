const NATS = require('nats')
const sc = NATS.StringCodec()
const axios = require('axios').default

const FORWARD_URL = process.env.FORWARD_URL || 'https://httpbin.org/post'
let nc

const run = async () => {
    const url = process.env.NATS_URL || 'nats://localhost:4222'
    nc = await NATS.connect({ servers: url })
    console.log(`Connected to NATS at ${url} succesfully`)
    
    const sub = nc.subscribe('new_todo', { queue: process.env.NATS_QUEUE || 'dwk-cluster' })

    for await (const msg of sub) {
	const todo = sc.decode(msg.data)
	try {
	    await axios.post(FORWARD_URL, { user: 'bot', message: todo })
	    console.log(`Forwarded todo "${todo}" to ${FORWARD_URL}`)
	} catch (e) {
	    console.log(e)
	}
    }
}

run()

