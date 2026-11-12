import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Filter, SlidersHorizontal, ChevronRight, X, RotateCcw } from 'lucide-react';
import ProductCard from '../../components/products/ProductCard';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { brandService } from '../../services/brandService';
import { cities } from '../../data/mock';
import { formatPrice } from '../../lib/utils';
import './Catalog.css';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const qParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';
  const brandParam = searchParams.get('brand') || 'all';
  const cityParam = searchParams.get('city') || 'all';
  const conditionParam = searchParams.get('condition') || 'all';
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  const sortParam = searchParams.get('sort') || 'newest';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  // Local filter states
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filter form temporary state
  const [minPrice, setMinPrice] = useState(minPriceParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);
  const [condition, setCondition] = useState(conditionParam);
  const [selectedCity, setSelectedCity] = useState(cityParam);
  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  useEffect(() => {
    setCategories(categoryService.getCategories());
    setBrands(brandService.getBrands());
  }, []);

  // Sync inputs with URL params
  useEffect(() => {
    setMinPrice(minPriceParam);
    setMaxPrice(maxPriceParam);
    setCondition(conditionParam);
    setSelectedCity(cityParam);
    setSelectedBrand(brandParam);
    setSelectedCategory(categoryParam);
  }, [minPriceParam, maxPriceParam, conditionParam, cityParam, brandParam, categoryParam]);

  // Query products with active filters
  const result = useMemo(() => {
    return productService.getProducts({
      query: qParam,
      category: categoryParam,
      brand: brandParam,
      city: cityParam,
      condition: conditionParam,
      minPrice: minPriceParam ? parseInt(minPriceParam, 10) : undefined,
      maxPrice: maxPriceParam ? parseInt(maxPriceParam, 10) : undefined,
      sort: sortParam,
      page: pageParam,
      limit: 12,
    });
  }, [qParam, categoryParam, brandParam, cityParam, conditionParam, minPriceParam, maxPriceParam, sortParam, pageParam]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');

    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');

    if (condition && condition !== 'all') params.set('condition', condition);
    else params.delete('condition');

    if (selectedCity && selectedCity !== 'all') params.set('city', selectedCity);
    else params.delete('city');

    if (selectedBrand && selectedBrand !== 'all') params.set('brand', selectedBrand);
    else params.delete('brand');

    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    else params.delete('category');

    params.set('page', '1');
    setSearchParams(params);
    setFilterDrawerOpen(false);
  };

  const handleResetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setCondition('all');
    setSelectedCity('all');
    setSelectedBrand('all');
    setSelectedCategory('all');

    const params = new URLSearchParams();
    if (qParam) params.set('q', qParam);
    setSearchParams(params);
    setFilterDrawerOpen(false);
  };

  const handleSortChange = (newSort) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="catalog-page">
      <Helmet>
        <title>Katalog — AvtoQism</title>
      </Helmet>

      <div className="container">
        {/* Breadcrumb */}
        <div className="catalog-breadcrumb">
          <Link to="/">Bosh sahifa</Link>
          <ChevronRight size={14} />
          <span>Katalog</span>
          {qParam && (
            <>
              <ChevronRight size={14} />
              <span>"{qParam}"</span>
            </>
          )}
        </div>

        {/* Top Header Row: Results Count & Sort Dropdown */}
        <div className="catalog-header-bar">
          <div className="catalog-title-group">
            <h1 className="catalog-title">
              {qParam ? `Qidiruv natijalari: "${qParam}"` : 'Qidiruv natijalari'}
              <span className="catalog-count-badge">({result.total} ta)</span>
            </h1>
          </div>

          <div className="catalog-header-actions">
            {/* Mobile Filter Button */}
            <button
              type="button"
              className="catalog-mobile-filter-btn show-mobile-only"
              onClick={() => setFilterDrawerOpen(true)}
            >
              <Filter size={18} />
              <span>Filtr</span>
            </button>

            {/* Sort Dropdown */}
            <div className="catalog-sort-box">
              <span className="sort-label">Saralash:</span>
              <select
                className="sort-select"
                value={sortParam}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="newest">Eng yangi</option>
                <option value="cheapest">Arzonidan</option>
                <option value="expensive">Qimmatidan</option>
                <option value="popular">Mashhur</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Filter Card (260px) + Right Products Grid */}
        <div className="catalog-layout">
          {/* Desktop Left Filter Card */}
          <aside className="catalog-filter-card hide-mobile">
            <div className="filter-header">
              <div className="filter-header-title">
                <SlidersHorizontal size={18} />
                <span>Filtrlar</span>
              </div>
              <button
                type="button"
                className="filter-reset-link"
                onClick={handleResetFilters}
              >
                Tozalash
              </button>
            </div>

            <div className="filter-body">
              {/* 1. Price Range */}
              <div className="filter-group">
                <label className="filter-label">Narx oralig'i (so'm)</label>
                <div className="price-inputs-row">
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="price-input"
                  />
                  <span className="price-sep">-</span>
                  <input
                    type="number"
                    placeholder="10 000 000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="price-input"
                  />
                </div>
              </div>

              {/* 2. Condition */}
              <div className="filter-group">
                <label className="filter-label">Holati</label>
                <div className="condition-radios">
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="condition"
                      checked={condition === 'all'}
                      onChange={() => setCondition('all')}
                    />
                    <span>Barchasi</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="condition"
                      checked={condition === 'new'}
                      onChange={() => setCondition('new')}
                    />
                    <span>Yangi</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="condition"
                      checked={condition === 'used'}
                      onChange={() => setCondition('used')}
                    />
                    <span>Ishlatilgan</span>
                  </label>
                </div>
              </div>

              {/* 3. Category Select */}
              <div className="filter-group">
                <label className="filter-label">Kategoriya</label>
                <select
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Barcha kategoriyalar</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Brand Select */}
              <div className="filter-group">
                <label className="filter-label">Brend</label>
                <select
                  className="filter-select"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="all">Barcha brendlar</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.slug}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. City Select */}
              <div className="filter-group">
                <label className="filter-label">Shahar</label>
                <select
                  className="filter-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="all">Barcha shaharlar</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Buttons */}
              <div className="filter-action-buttons">
                <button
                  type="button"
                  className="btn-apply-filters"
                  onClick={handleApplyFilters}
                >
                  Qo'llash
                </button>
                <button
                  type="button"
                  className="btn-clear-filters"
                  onClick={handleResetFilters}
                >
                  Filtrni tozalash
                </button>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="catalog-products-main">
            {result.products.length === 0 ? (
              <div className="catalog-empty-state">
                <div className="empty-icon-box">🔍</div>
                <h3>Hech qanday mahsulot topilmadi</h3>
                <p>Qidiruv shartlarini o'zgartirib yoki filtrlarni tozalab ko'ring</p>
                <button
                  type="button"
                  className="btn-reset-empty"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={16} />
                  Filtrlarni tozalash
                </button>
              </div>
            ) : (
              <>
                <div className="catalog-cards-grid">
                  {result.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {result.totalPages > 1 && (
                  <div className="catalog-pagination">
                    <button
                      type="button"
                      disabled={result.page <= 1}
                      onClick={() => handlePageChange(result.page - 1)}
                      className="pagination-btn arrow"
                    >
                      &lt;
                    </button>

                    {Array.from({ length: result.totalPages }, (_, i) => i + 1).map(
                      (num) => (
                        <button
                          key={num}
                          type="button"
                          className={`pagination-btn ${
                            result.page === num ? 'active' : ''
                          }`}
                          onClick={() => handlePageChange(num)}
                        >
                          {num}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      disabled={result.page >= result.totalPages}
                      onClick={() => handlePageChange(result.page + 1)}
                      className="pagination-btn arrow"
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer (Bottom Sheet) */}
      {filterDrawerOpen && (
        <div
          className="mobile-filter-backdrop"
          onClick={() => setFilterDrawerOpen(false)}
        >
          <div
            className="mobile-filter-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-filter-head">
              <h3>Filtrlar</h3>
              <button
                type="button"
                className="mobile-filter-close"
                onClick={() => setFilterDrawerOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-filter-content">
              {/* Price */}
              <div className="filter-group">
                <label className="filter-label">Narx oralig'i (so'm)</label>
                <div className="price-inputs-row">
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="price-input"
                  />
                  <span className="price-sep">-</span>
                  <input
                    type="number"
                    placeholder="10 000 000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="price-input"
                  />
                </div>
              </div>

              {/* Condition */}
              <div className="filter-group">
                <label className="filter-label">Holati</label>
                <div className="condition-radios">
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="mob-condition"
                      checked={condition === 'all'}
                      onChange={() => setCondition('all')}
                    />
                    <span>Barchasi</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="mob-condition"
                      checked={condition === 'new'}
                      onChange={() => setCondition('new')}
                    />
                    <span>Yangi</span>
                  </label>
                  <label className="filter-radio-item">
                    <input
                      type="radio"
                      name="mob-condition"
                      checked={condition === 'used'}
                      onChange={() => setCondition('used')}
                    />
                    <span>Ishlatilgan</span>
                  </label>
                </div>
              </div>

              {/* Category */}
              <div className="filter-group">
                <label className="filter-label">Kategoriya</label>
                <select
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Barcha kategoriyalar</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="filter-group">
                <label className="filter-label">Brend</label>
                <select
                  className="filter-select"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="all">Barcha brendlar</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.slug}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="filter-group">
                <label className="filter-label">Shahar</label>
                <select
                  className="filter-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="all">Barcha shaharlar</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mobile-filter-foot">
              <button
                type="button"
                className="btn-apply-filters"
                onClick={handleApplyFilters}
              >
                Natijalarni ko'rish
              </button>
              <button
                type="button"
                className="btn-clear-filters"
                onClick={handleResetFilters}
              >
                Tozalash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
