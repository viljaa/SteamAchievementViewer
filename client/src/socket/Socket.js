// Socket initialization
import io from 'socket.io-client';

const endpoint = 'localhost:5000'
const socket = io.connect(endpoint);

export default socket;