import { getItem, setItem, KEYS } from './storage';
import { sendTelegramNotification } from './telegramService';

export const inquiryService = {
  getInquiries() {
    return getItem(KEYS.INQUIRIES, []);
  },

  createInquiry({ name, phone, message }) {
    const list = getItem(KEYS.INQUIRIES, []);
    const newInquiry = {
      id: Date.now(),
      name,
      phone,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newInquiry);
    setItem(KEYS.INQUIRIES, list);

    sendTelegramNotification('contact_inquiry', {
      name,
      phone,
      message,
    });

    return newInquiry;
  },
};
