const { Server } = require('socket.io');

let io = null;

/**
 * Initialize Socket.io Server attached to HTTP Server
 */
const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (
          origin.endsWith('.vercel.app') ||
          origin.includes('localhost') ||
          (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL)
        ) {
          return callback(null, true);
        }
        return callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`⚡ [WEBSOCKET] Client connected: ${socket.id}`);

    // Join Customer Live Order Room
    socket.on('join_order_room', (orderId) => {
      if (!orderId) return;
      const room = `order_${orderId}`;
      socket.join(room);
      console.log(`📡 [WEBSOCKET] Socket ${socket.id} joined order room: ${room}`);
    });

    // Join Partner Business Portal Room
    socket.on('join_partner_room', (restaurantId) => {
      if (!restaurantId) return;
      const room = `partner_${restaurantId}`;
      socket.join(room);
      console.log(`🏪 [WEBSOCKET] Partner Socket ${socket.id} joined partner room: ${room}`);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 [WEBSOCKET] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

/**
 * Get active Socket.io instance
 */
const getIO = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized!');
  }
  return io;
};

/**
 * Broadcast New Order to Partner and Customer Rooms
 */
const notifyNewOrder = (order) => {
  if (!io) return;
  const partnerRoom = `partner_${order.restaurantId || '17'}`;
  const orderRoom = `order_${order.id}`;

  console.log(`🔔 [WEBSOCKET] Broadcasting new order ${order.id} to rooms: ${partnerRoom}, ${orderRoom}`);

  // Emit alert to restaurant partner
  io.to(partnerRoom).emit('new_order_placed', {
    message: '🎉 New Incoming Order!',
    order
  });

  // Emit status update to customer
  io.to(orderRoom).emit('order_status_updated', order);

  // Start Real-Time Order Progression Engine
  startOrderProgression(order);
};

/**
 * Real-Time Automatic Order Progression Engine (Emits via WebSockets without HTTP polling!)
 */
const startOrderProgression = (order) => {
  if (!io || !order) return;
  const orderRoom = `order_${order.id}`;
  const partnerRoom = `partner_${order.restaurantId || '17'}`;

  const scheduleUpdate = (delayMs, status, trackingMessage) => {
    setTimeout(() => {
      const updatedOrder = {
        ...order,
        status,
        updatedAt: new Date().toISOString(),
        trackingMessage
      };

      console.log(`⏱️ [WEBSOCKET PROGRESSION] Order ${order.id} updated to: ${status}`);
      io.to(orderRoom).emit('order_status_updated', updatedOrder);
      io.to(partnerRoom).emit('partner_order_status_changed', updatedOrder);
    }, delayMs);
  };

  // Stage 1: Preparing (15 seconds)
  scheduleUpdate(15000, 'Preparing', 'Chef is preparing your meal fresh with premium ingredients.');

  // Stage 2: Out for Delivery (35 seconds)
  scheduleUpdate(35000, 'Out for Delivery', 'Zomato Valet is on the way with your hot meal!');

  // Stage 3: Delivered (55 seconds)
  scheduleUpdate(55000, 'Delivered', 'Order Delivered! Enjoy your delicious meal.');
};

module.exports = {
  initSocket,
  getIO,
  notifyNewOrder
};
