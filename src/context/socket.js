import React from 'react';
// eslint-disable-next-line import/extensions
import config from '../../config.json';

const url = `http://${config.ip}:${config.port}`;
const io = require('socket.io-client/dist/socket.io');

export const socket = io.connect(url);
export const SocketContext = React.createContext();
