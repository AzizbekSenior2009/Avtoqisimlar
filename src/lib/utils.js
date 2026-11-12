/* ═══════════════════════════════════════════════════════
   AvtoQism – Utility Functions
   ═══════════════════════════════════════════════════════ */

/**
 * Format a number as price with space-separated thousands and "so'm" suffix.
 * @param {number} num - The price value
 * @returns {string} Formatted price string, e.g. "450 000 so'm"
 */
export function formatPrice(num) {
  if (num === null || num === undefined || isNaN(num)) return '0 so\'m';
  const formatted = Math.round(Number(num))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} so'm`;
}

/**
 * Format a date to a user-friendly string in Uzbek.
 * "Bugun, 14:30" / "Kecha, 18:00" / "25.10.2025"
 * @param {string|Date} date - Date value
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;

  if (target.getTime() === today.getTime()) {
    return `Bugun, ${time}`;
  }
  if (target.getTime() === yesterday.getTime()) {
    return `Kecha, ${time}`;
  }

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Create a URL-safe slug from text.
 * @param {string} text - Input text
 * @returns {string} URL-safe slug
 */
export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Truncate text to a maximum length, adding ellipsis if needed.
 * @param {string} text - Input text
 * @param {number} len - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, len = 100) {
  if (!text) return '';
  if (text.length <= len) return text;
  return text.slice(0, len).trimEnd() + '…';
}

/**
 * Generate a random unique ID string.
 * @returns {string} Random ID
 */
export function generateId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 10)
  );
}

/**
 * Join class names, filtering out falsy values.
 * @param {...(string|boolean|null|undefined)} classes - Class names
 * @returns {string} Joined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get relative time string in Uzbek.
 * @param {string|Date} date - Date value
 * @returns {string} Relative time string in Uzbek
 */
export function getTimeAgo(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 5) return 'Hozirgina';
  if (diffSeconds < 60) return `${diffSeconds} soniya oldin`;
  if (diffMinutes === 1) return '1 daqiqa oldin';
  if (diffMinutes < 60) return `${diffMinutes} daqiqa oldin`;
  if (diffHours === 1) return '1 soat oldin';
  if (diffHours < 24) return `${diffHours} soat oldin`;
  if (diffDays === 1) return 'Kecha';
  if (diffDays < 7) return `${diffDays} kun oldin`;
  if (diffWeeks === 1) return '1 hafta oldin';
  if (diffWeeks < 4) return `${diffWeeks} hafta oldin`;
  if (diffMonths === 1) return '1 oy oldin';
  if (diffMonths < 12) return `${diffMonths} oy oldin`;
  if (diffYears === 1) return '1 yil oldin';
  return `${diffYears} yil oldin`;
}

/**
 * Validate an Uzbekistan phone number (+998XXXXXXXXX).
 * @param {string} phone - Phone number string
 * @returns {boolean} True if valid
 */
export function validatePhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const pattern = /^\+998[0-9]{9}$/;
  return pattern.test(cleaned);
}

/**
 * Compress an image file, returning a Promise that resolves to a Blob.
 * @param {File} file - Image file
 * @param {number} maxWidth - Maximum width in pixels (default 1200)
 * @param {number} quality - JPEG quality 0-1 (default 0.8)
 * @returns {Promise<Blob>} Compressed image blob
 */
export function compressImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Fayl rasm emas'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Faylni o\'qishda xatolik'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Rasmni yuklashda xatolik'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Rasmni siqishda xatolik'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Create a debounced version of a function.
 * @param {Function} fn - Function to debounce
 * @param {number} ms - Delay in milliseconds (default 300)
 * @returns {Function} Debounced function
 */
export function debounce(fn, ms = 300) {
  let timeoutId;
  const debounced = (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
  debounced.cancel = () => {
    clearTimeout(timeoutId);
  };
  return debounced;
}

/**
 * Get a value from localStorage with JSON parsing and a fallback.
 * @param {string} key - localStorage key
 * @param {*} fallback - Fallback value if key doesn't exist or parsing fails
 * @returns {*} Parsed value or fallback
 */
export function getFromLS(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

/**
 * Set a value to localStorage with JSON stringification.
 * @param {string} key - localStorage key
 * @param {*} value - Value to store
 */
export function setToLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`localStorage ga yozishda xatolik: ${key}`);
  }
}
