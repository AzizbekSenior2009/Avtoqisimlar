import { getItem, setItem, KEYS } from './storage';
import { sendTelegramNotification } from './telegramService';

export const orderService = {
  getOrders() {
    return getItem(KEYS.ORDERS, []);
  },

  getOrdersByUser(userId, phone = '') {
    const orders = getItem(KEYS.ORDERS, []);
    return orders.filter(
      (o) =>
        (userId && o.userId === userId) ||
        (phone && o.phone?.replace(/\s+/g, '') === phone.replace(/\s+/g, ''))
    );
  },

  createOrder({ customerName, phone, comment, items, total, userId = null }) {
    const orders = getItem(KEYS.ORDERS, []);
    const newOrder = {
      id: Date.now(),
      orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName,
      phone,
      comment,
      items,
      total,
      userId,
      status: 'new', // new | processing | completed | cancelled
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    setItem(KEYS.ORDERS, orders);

    // Notify Telegram
    sendTelegramNotification('new_order', {
      customerName,
      phone,
      total: `${total.toLocaleString()} so'm`,
      itemsCount: items.length,
    });

    return newOrder;
  },

  updateOrderStatus(orderId, status) {
    const orders = getItem(KEYS.ORDERS, []);
    const index = orders.findIndex((o) => String(o.id) === String(orderId));
    if (index !== -1) {
      orders[index].status = status;
      setItem(KEYS.ORDERS, orders);
      return orders[index];
    }
    return null;
  },
};
