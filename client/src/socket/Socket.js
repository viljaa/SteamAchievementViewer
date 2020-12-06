// Socket initialization
import io from 'socket.io-client';

const endpoint = 'https://arch-steam-achievement-viewer.herokuapp.com/'
const socket = io.connect(endpoint);

export default socket;