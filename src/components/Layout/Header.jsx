import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Plus, ShoppingCart, ChevronDown, LogOut, Package, Heart, LayoutDashboard, Home, Grid } from 'lucide-react';
import Logo from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import './Header.css';

export default function Header({ onOpenSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, logout, isAdmin } = useAuth();
  const { totalCount } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or route change
  useEffect(() => {
    setUserDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/catalog');
    }
  };

  const handlePostAdClick = () => {
    if (!user) {
      navigate('/login?next=/post-ad');
    } else {
      navigate('/post-ad');
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo & Main Nav */}
        <div className="header-left">
          <div className="header-logo-wrap">
            <span className="hide-mobile">
              <Logo variant="default" />
            </span>
            <span className="show-mobile-only">
              <Logo variant="phone" />
            </span>
          </div>

          <nav className="header-main-nav hide-mobile" aria-label="Asosiy menyu">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `header-nav-btn ${isActive ? 'active' : ''}`}
            >
              <Home size={17} />
              <span>{t('header.home', 'Bosh sahifa')}</span>
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) => `header-nav-btn ${isActive ? 'active' : ''}`}
            >
              <Grid size={17} />
              <span>{t('header.catalog', 'Katalog')}</span>
            </NavLink>
          </nav>
        </div>

        {/* Desktop Search Input with attached Blue Button */}
        <form className="header-search hide-mobile" onSubmit={handleSearchSubmit}>
          <div className="header-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder={t('header.searchPlaceholder', "Qidiruv... (masalan: amortizator, tormoz kolodka)")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-submit-btn">
              {t('header.search', 'Qidirish')}
            </button>
          </div>
        </form>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Mobile Search Icon */}
          <button
            type="button"
            className="mobile-header-btn show-mobile-only"
            onClick={onOpenSearch}
            aria-label="Qidirish"
          >
            <Search size={22} />
          </button>

          {/* Cart Icon (Desktop & Tablet) */}
          <Link to="/cart" className="header-cart-btn" aria-label="Savat">
            <ShoppingCart size={22} />
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </Link>

          {/* Auth State (Desktop) */}
          <div className="header-user-wrapper" ref={dropdownRef}>
            {user ? (
              <div className="user-profile-menu">
                <button
                  type="button"
                  className="user-profile-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <div className="user-avatar-circle">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-profile-name hide-mobile">{user.name || 'Foydalanuvchi'}</span>
                  <ChevronDown size={15} className="hide-mobile" />
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    {isAdmin && (
                      <Link to="/admin" className="dropdown-item admin-highlight">
                        <LayoutDashboard size={16} />
                        <span>Admin panel</span>
                      </Link>
                    )}
                    <Link to="/dashboard" className="dropdown-item">
                      <User size={16} />
                      <span>{t('header.cabinet', 'Kabinet')}</span>
                    </Link>
                    <Link to="/dashboard/listings" className="dropdown-item">
                      <Package size={16} />
                      <span>{t('header.myListings', "Mening e'lonlarim")}</span>
                    </Link>
                    <Link to="/dashboard/favorites" className="dropdown-item">
                      <Heart size={16} />
                      <span>{t('header.favorites', 'Sevimlilar')}</span>
                    </Link>
                    <button
                      type="button"
                      className="dropdown-item text-red"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                    >
                      <LogOut size={16} />
                      <span>{t('header.logout', 'Chiqish')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="header-login-btn">
                <User size={19} />
                <span className="hide-mobile">{t('header.login', 'Kirish')}</span>
              </Link>
            )}
          </div>

          {/* Orange "+ E'lon berish" Button - Only visible when user is logged in */}
          {user && (
            <>
              <button
                type="button"
                className="btn-post-ad hide-mobile"
                onClick={handlePostAdClick}
              >
                <Plus size={18} />
                <span>{t('header.postAd', "+ E'lon berish")}</span>
              </button>

              {/* Mobile '+' rounded square button (40px) */}
              <button
                type="button"
                className="btn-post-ad-mobile show-mobile-only"
                onClick={handlePostAdClick}
                aria-label="E'lon berish"
              >
                <Plus size={22} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
