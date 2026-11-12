import { getItem, setItem, KEYS } from './storage';

export const categoryService = {
  getCategories() {
    return getItem(KEYS.CATEGORIES, []);
  },

  getCategoryBySlug(slug) {
    const list = getItem(KEYS.CATEGORIES, []);
    return list.find((c) => c.slug === slug || String(c.id) === String(slug));
  },

  addCategory(category) {
    const list = getItem(KEYS.CATEGORIES, []);
    const newCat = { ...category, id: Date.now() };
    list.push(newCat);
    setItem(KEYS.CATEGORIES, list);
    return newCat;
  },

  updateCategory(id, updatedFields) {
    const list = getItem(KEYS.CATEGORIES, []);
    const index = list.findIndex((c) => String(c.id) === String(id));
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedFields };
      setItem(KEYS.CATEGORIES, list);
      return list[index];
    }
    return null;
  },

  deleteCategory(id) {
    const list = getItem(KEYS.CATEGORIES, []);
    const filtered = list.filter((c) => String(c.id) !== String(id));
    setItem(KEYS.CATEGORIES, filtered);
    return true;
  },
};
