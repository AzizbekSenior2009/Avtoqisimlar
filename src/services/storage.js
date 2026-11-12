import {
  categories as initialCategories,
  brands as initialBrands,
  sellers as initialSellers,
  products as initialProducts,
  mockUsers as initialUsers,
  mockReviews as initialReviews,
} from '../data/mock';

const KEYS = {
  PRODUCTS: 'avtoqism_products',
  CATEGORIES: 'avtoqism_categories',
  BRANDS: 'avtoqism_brands',
  SELLERS: 'avtoqism_sellers',
  USERS: 'avtoqism_users',
  CURRENT_USER: 'avtoqism_current_user',
  FAVORITES: 'avtoqism_favorites',
  ORDERS: 'avtoqism_orders',
  REPORTS: 'avtoqism_reports',
  REVIEWS: 'avtoqism_reviews',
  SUBSCRIBERS: 'avtoqism_subscribers',
  INQUIRIES: 'avtoqism_inquiries',
  MODERATION: 'avtoqism_moderation_enabled',
};

// Initialize default state if not present in localStorage
export function initLocalStorage() {
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem(KEYS.CATEGORIES)) {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(initialCategories));
  }
  if (!localStorage.getItem(KEYS.BRANDS)) {
    localStorage.setItem(KEYS.BRANDS, JSON.stringify(initialBrands));
  }
  if (!localStorage.getItem(KEYS.SELLERS)) {
    localStorage.setItem(KEYS.SELLERS, JSON.stringify(initialSellers));
  }
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem(KEYS.FAVORITES)) {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify([1, 2]));
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.REPORTS)) {
    localStorage.setItem(KEYS.REPORTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.REVIEWS)) {
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(initialReviews));
  }
  if (!localStorage.getItem(KEYS.SUBSCRIBERS)) {
    localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.INQUIRIES)) {
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify([]));
  }
  if (localStorage.getItem(KEYS.MODERATION) === null) {
    localStorage.setItem(KEYS.MODERATION, JSON.stringify(true));
  }
}

// Call immediately
initLocalStorage();

export function getItem(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    console.error('Error reading localStorage key', key, err);
    return defaultValue;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Error writing localStorage key', key, err);
  }
}

export { KEYS };
