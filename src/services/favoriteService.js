import { getItem, setItem, KEYS } from './storage';

export const favoriteService = {
  getFavorites() {
    return getItem(KEYS.FAVORITES, []);
  },

  isFavorite(productId) {
    const favs = getItem(KEYS.FAVORITES, []);
    return favs.includes(Number(productId)) || favs.includes(String(productId));
  },

  toggleFavorite(productId) {
    const favs = getItem(KEYS.FAVORITES, []);
    const id = Number(productId);
    let updated;
    let added = false;

    if (favs.includes(id)) {
      updated = favs.filter((item) => item !== id);
      added = false;
    } else {
      updated = [...favs, id];
      added = true;
    }

    setItem(KEYS.FAVORITES, updated);
    return { added, favorites: updated };
  },
};
