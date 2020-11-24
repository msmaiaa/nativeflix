import config from '../../../config.json';
const url = `http://${config.ip}:${config.port}`;
const io = require("socket.io-client/dist/socket.io")
const socket = io(url , {transports: ['websocket'], jsonp: false ,query: { type: 'app'}});

export default socket