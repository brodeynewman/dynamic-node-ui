import io from 'socket.io-client';
import SOCKET_CONNECTION from './socketConfig';

// Building inital sock connection
const socket = io.connect(SOCKET_CONNECTION);

export default socket;
