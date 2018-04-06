import io from 'socket.io-client';

// Building inital sock connection
const socket = io.connect(process.env.SOCKET_CONNECTION || 'http://localhost:8008');

export default socket;
