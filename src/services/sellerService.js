import { getItem, KEYS } from './storage';

export const sellerService = {
  getSellers() {
    return getItem(KEYS.SELLERS, []);
  },

  getSellerById(id) {
    const list = getItem(KEYS.SELLERS, []);
    return list.find((s) => String(s.id) === String(id) || s.slug === id) || null;
  },
};
