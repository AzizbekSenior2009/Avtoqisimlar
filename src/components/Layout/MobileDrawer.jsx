import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Globe, Heart, Package, Truck, Phone, LogIn, LogOut, Grid } from 'lucide-react';
import Logo from '../ui/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { categoryService } from '../../services/categoryService';
import './MobileDrawer.css';

export default function MobileDrawer({ isOpen, onClose }) {
  const { lang, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const categories = categoryService.getCategories();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <Logo variant="default" />
          <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Yopish">
            <X size={22} />
          </button>
        </div>

        {/* Language switch */}
        <div className="drawer-lang-row">
          <Globe size={18} className="drawer-lang-icon" />
          <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>Til:</span>
          <div className="drawer-lang-buttons">
            <button
              type="button"
              className={`drawer-lang-btn ${lang === 'uz' ? 'active' : ''}`}
              onClick={() => setLanguage('uz')}
            >
              UZ
            </button>
            <button
              type="button"
              className={`drawer-lang-btn ${lang === 'ru' ? 'active' : ''}`}
              onClick={() => setLanguage('ru')}
            >
              RU
            </button>
            <button
              type="button"
              className={`drawer-lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>

        <div className="drawer-content">
          {/* Main Navigation Links */}
          <div className="drawer-nav-group">
            <Link to="/catalog" className="drawer-nav-link">
              <Grid size={18} />
              <span>{t('footer.catalog', 'Katalog')}</span>
            </Link>
            <Link to="/dashboard/favorites" className="drawer-nav-link">
              <Heart size={18} />
              <span>{t('header.favorites', 'Sevimlilar')}</span>
            </Link>
            <Link to="/dashboard/listings" className="drawer-nav-link">
              <Package size={18} />
              <span>{t('header.myListings', "Mening e'lonlarim")}</span>
            </Link>
            <Link to="/delivery" className="drawer-nav-link">
              <Truck size={18} />
              <span>{t('footer.delivery', 'Yetkazib berish')}</span>
            </Link>
            <Link to="/contact" className="drawer-nav-link">
              <Phone size={18} />
              <span>{t('footer.contact', 'Aloqa')}</span>
            </Link>
          </div>

          <div className="drawer-separator" />

          {/* Categories Section */}
          <div className="drawer-categories-group">
            <h4 className="drawer-section-title">Kategoriyalar</h4>
            <div className="drawer-categories-list">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/catalog?category=${cat.slug}`}
                  className="drawer-category-item"
                >
                  <span>{cat.name}</span>
                  <span className="drawer-cat-count">({cat.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions inside drawer */}
        <div className="drawer-footer">
          {user ? (
            <button
              type="button"
              className="drawer-auth-btn logout"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              <LogOut size={18} />
              <span>Chiqish</span>
            </button>
          ) : (
            <Link to="/login" className="drawer-auth-btn login">
              <LogIn size={18} />
              <span>Kirish / Ro'yxatdan o'tish</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
