import { getItem, setItem, KEYS } from './storage';
import { sendTelegramNotification } from './telegramService';

export const productService = {
  getProducts(filters = {}) {
    const {
      category,
      brand,
      city,
      condition,
      minPrice,
      maxPrice,
      sellerType,
      sort = 'newest',
      query = '',
      status = 'active',
      page = 1,
      limit = 12,
      userId = null,
    } = filters;

    let items = getItem(KEYS.PRODUCTS, []);

    // Filter by user ID if requested (for dashboard)
    if (userId !== null && userId !== undefined) {
      items = items.filter((item) => item.seller_id === userId || item.userId === userId);
    } else if (status) {
      items = items.filter((item) => (item.status || 'active') === status);
    }

    // Search query
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.oem?.toLowerCase().includes(q) ||
          item.compatibleCars?.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Category filter (slug or id)
    if (category && category !== 'all') {
      const cats = getItem(KEYS.CATEGORIES, []);
      const matchedCat = cats.find(
        (c) => String(c.id) === String(category) || c.slug === category
      );
      if (matchedCat) {
        items = items.filter((item) => item.category_id === matchedCat.id);
      }
    }

    // Brand filter (slug or id)
    if (brand && brand !== 'all') {
      const brands = getItem(KEYS.BRANDS, []);
      const matchedBrand = brands.find(
        (b) => String(b.id) === String(brand) || b.slug === brand
      );
      if (matchedBrand) {
        items = items.filter((item) => item.brand_id === matchedBrand.id);
      }
    }

    // City filter
    if (city && city !== 'all') {
      items = items.filter((item) => item.city === city);
    }

    // Condition filter ('new' / 'used')
    if (condition && condition !== 'all') {
      items = items.filter((item) => item.condition === condition);
    }

    // Price range
    if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
      items = items.filter((item) => item.price >= Number(minPrice));
    }
    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
      items = items.filter((item) => item.price <= Number(maxPrice));
    }

    // Seller type
    if (sellerType && sellerType !== 'all') {
      if (sellerType === 'shop') {
        items = items.filter((item) => item.seller_id && item.seller_id <= 5);
      } else if (sellerType === 'private') {
        items = items.filter((item) => !item.seller_id || item.seller_id > 5);
      }
    }

    // Sorting
    items = [...items].sort((a, b) => {
      if (sort === 'cheapest') return (a.price || 0) - (b.price || 0);
      if (sort === 'expensive') return (b.price || 0) - (a.price || 0);
      if (sort === 'popular') return (b.views || 0) - (a.views || 0);
      // default: newest
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    const total = items.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);

    return {
      products: paginatedItems,
      total,
      page,
      totalPages,
    };
  },

  getProductById(id) {
    const items = getItem(KEYS.PRODUCTS, []);
    return items.find((item) => String(item.id) === String(id)) || null;
  },

  getNewAds(limit = 4) {
    const items = getItem(KEYS.PRODUCTS, []);
    return items
      .filter((item) => (item.status || 'active') === 'active')
      .slice(0, limit);
  },

  getSimilarProducts(productId, limit = 4) {
    const items = getItem(KEYS.PRODUCTS, []);
    const current = items.find((p) => String(p.id) === String(productId));
    if (!current) return items.slice(0, limit);

    return items
      .filter(
        (item) =>
          String(item.id) !== String(productId) &&
          (item.category_id === current.category_id ||
            item.brand_id === current.brand_id)
      )
      .slice(0, limit);
  },

  getSellerProducts(sellerId, excludeId = null, limit = 4) {
    const items = getItem(KEYS.PRODUCTS, []);
    return items
      .filter(
        (item) =>
          String(item.seller_id) === String(sellerId) &&
          String(item.id) !== String(excludeId)
      )
      .slice(0, limit);
  },

  incrementViews(id) {
    const items = getItem(KEYS.PRODUCTS, []);
    const index = items.findIndex((item) => String(item.id) === String(id));
    if (index !== -1) {
      items[index] = {
        ...items[index],
        views: (items[index].views || 0) + 1,
      };
      setItem(KEYS.PRODUCTS, items);
      return items[index].views;
    }
    return 0;
  },

  createProduct(data) {
    const items = getItem(KEYS.PRODUCTS, []);
    const moderationEnabled = getItem(KEYS.MODERATION, true);

    const newProduct = {
      ...data,
      id: Date.now(),
      status: data.status || 'active',
      views: 0,
      createdAt: new Date().toISOString(),
      images:
        data.images && data.images.length > 0
          ? data.images
          : ['/images/products/placeholder.svg'],
    };

    items.unshift(newProduct);
    setItem(KEYS.PRODUCTS, items);

    // Telegram notification
    sendTelegramNotification('new_ad', {
      title: newProduct.title,
      price: `${newProduct.price} so'm`,
      city: newProduct.city,
      sellerName: data.sellerName || 'Foydalanuvchi',
      status: newProduct.status,
    });

    return newProduct;
  },

  updateProduct(id, updatedFields) {
    const items = getItem(KEYS.PRODUCTS, []);
    const index = items.findIndex((item) => String(item.id) === String(id));
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedFields };
      setItem(KEYS.PRODUCTS, items);
      return items[index];
    }
    return null;
  },

  deleteProduct(id) {
    const items = getItem(KEYS.PRODUCTS, []);
    const filtered = items.filter((item) => String(item.id) !== String(id));
    setItem(KEYS.PRODUCTS, filtered);
    return true;
  },
};
