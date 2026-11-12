import { getItem, setItem, KEYS } from './storage';

export const subscriberService = {
  getSubscribers() {
    return getItem(KEYS.SUBSCRIBERS, []);
  },

  addSubscriber(email) {
    const list = getItem(KEYS.SUBSCRIBERS, []);
    const cleanEmail = email.trim().toLowerCase();
    if (!list.includes(cleanEmail)) {
      list.push(cleanEmail);
      setItem(KEYS.SUBSCRIBERS, list);
    }
    return true;
  },
};
