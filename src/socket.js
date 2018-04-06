import io from 'socket.io-client';

// Building inital sock connection
const socket = io.connect('https://whispering-anchorage-42548.herokuapp.com/');

export default socket;
