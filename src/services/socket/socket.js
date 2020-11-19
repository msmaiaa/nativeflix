const url = 'http://192.168.0.10:1337'
const io = require("socket.io-client/dist/socket.io")
const socket = io(url , {transports: ['websocket'], jsonp: false ,query: { type: 'app'}});

export default socket