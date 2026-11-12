import { getItem, setItem, KEYS } from './storage';

export const reviewService = {
  getReviewsBySeller(sellerId) {
    const list = getItem(KEYS.REVIEWS, []);
    return list.filter((r) => String(r.seller_id) === String(sellerId));
  },

  addReview({ sellerId, userName, rating, comment }) {
    const list = getItem(KEYS.REVIEWS, []);
    const newReview = {
      id: Date.now(),
      seller_id: Number(sellerId),
      userName,
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newReview);
    setItem(KEYS.REVIEWS, list);
    return newReview;
  },
};
