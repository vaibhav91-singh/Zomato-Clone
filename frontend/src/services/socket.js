import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000
    });

    socket.on('connect', () => {
      console.log(`⚡ [WEBSOCKET CLIENT] Connected with Socket ID: ${socket.id}`);
    });

    socket.on('connect_error', (err) => {
      console.warn('[WEBSOCKET CLIENT ERROR]:', err.message);
    });
  }
  return socket;
};

export const joinOrderRoom = (orderId) => {
  const s = getSocket();
  if (s && orderId) {
    s.emit('join_order_room', orderId);
  }
};

export const joinPartnerRoom = (restaurantId) => {
  const s = getSocket();
  if (s && restaurantId) {
    s.emit('join_partner_room', restaurantId);
  }
};

export default getSocket;
