const express = require('express');
const router = express.Router();
const { saveOrder, getOrders, getOrderById } = require('../dataStore');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { validateOrder } = require('../middleware/validator');

const { notifyNewOrder } = require('../socket');

// GET /api/orders - Get list of orders
router.get('/', asyncHandler(async (req, res) => {
  const allOrders = getOrders();
  res.json({
    success: true,
    count: allOrders.length,
    orders: allOrders
  });
}));

// POST /api/orders - Place a new order
router.post('/', validateOrder, asyncHandler(async (req, res) => {
  const { items, subtotal, discount, deliveryFee, tax, total, deliveryAddress, paymentMethod, restaurantId } = req.body;

  const orderPayload = {
    restaurantId: restaurantId || "17",
    items,
    subtotal: parseFloat(subtotal) || 0,
    discount: parseFloat(discount) || 0,
    deliveryFee: parseFloat(deliveryFee) || 0,
    tax: parseFloat(tax) || 0,
    total: parseFloat(total) || 0,
    status: "Confirmed",
    address: deliveryAddress,
    paymentMethod: paymentMethod || "UPI",
    estimatedDeliveryTime: 30
  };

  const createdOrder = await saveOrder(orderPayload);

  // Broadcast WebSocket notification to partner and customer rooms
  notifyNewOrder(createdOrder);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order: createdOrder
  });
}));

// GET /api/orders/:id - Retrieve order status with progression
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = getOrderById(id);

  if (!order) {
    throw new AppError(`Order not found with ID: ${id}`, 404);
  }

  const elapsedMs = Date.now() - new Date(order.createdAt).getTime();
  const elapsedSeconds = Math.floor(elapsedMs / 1000);

  if (elapsedSeconds < 15) {
    order.status = "Confirmed";
  } else if (elapsedSeconds < 35) {
    order.status = "Preparing";
  } else if (elapsedSeconds < 55) {
    order.status = "Out for Delivery";
  } else {
    order.status = "Delivered";
  }

  res.json({
    success: true,
    order
  });
}));

module.exports = router;
