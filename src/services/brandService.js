import { getItem, setItem, KEYS } from './storage';

export const brandService = {
  getBrands() {
    return getItem(KEYS.BRANDS, []);
  },

  getBrandBySlug(slug) {
    const list = getItem(KEYS.BRANDS, []);
    return list.find((b) => b.slug === slug || String(b.id) === String(slug));
  },

  addBrand(brand) {
    const list = getItem(KEYS.BRANDS, []);
    const newBrand = { ...brand, id: Date.now() };
    list.push(newBrand);
    setItem(KEYS.BRANDS, list);
    return newBrand;
  },

  updateBrand(id, updatedFields) {
    const list = getItem(KEYS.BRANDS, []);
    const index = list.findIndex((b) => String(b.id) === String(id));
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedFields };
      setItem(KEYS.BRANDS, list);
      return list[index];
    }
    return null;
  },

  deleteBrand(id) {
    const list = getItem(KEYS.BRANDS, []);
    const filtered = list.filter((b) => String(b.id) !== String(id));
    setItem(KEYS.BRANDS, filtered);
    return true;
  },
};
