import { getItem, setItem, KEYS } from './storage';
import { brands as defaultBrands } from '../data/mock';

export const brandService = {
  getBrands() {
    const list = getItem(KEYS.BRANDS, []);
    if (!list || list.length === 0) {
      setItem(KEYS.BRANDS, defaultBrands);
      return defaultBrands;
    }
    // Ensure every brand has its valid logo and slug from default data
    return list.map((b) => {
      const def = defaultBrands.find((d) => d.slug === b.slug || d.id === b.id);
      return {
        ...def,
        ...b,
        logo: b.logo || def?.logo || `/images/brands/${b.slug}.svg`,
      };
    });
  },

  getBrandBySlug(slug) {
    const list = this.getBrands();
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
