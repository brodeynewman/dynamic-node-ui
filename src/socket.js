import io from 'socket.io-client';

// Building inital sock connection
const socket = io.connect(process.env.SOCKET_CONNECTION);

export default socket;
