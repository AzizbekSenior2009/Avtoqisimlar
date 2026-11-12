import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './BottomNav.css';

export default function BottomNav({ onOpenSearch }) {
  const { user } = useAuth();
  const { totalCount } = useCart();
  const location = useLocation();

  // Hide bottom nav on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const profileLink = user ? '/dashboard' : '/login';

  return (
    <nav className="bottom-nav" aria-label="Mobil navigatsiya">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Home size={22} />
        <span>Bosh sahifa</span>
      </NavLink>

      <button
        type="button"
        className="bottom-nav-item bottom-nav-btn"
        onClick={onOpenSearch}
      >
        <Search size={22} />
        <span>Qidirish</span>
      </button>

      <NavLink
        to="/cart"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="bottom-nav-cart-wrapper">
          <ShoppingBag size={22} />
          {totalCount > 0 && <span className="bottom-nav-badge">{totalCount}</span>}
        </div>
        <span>Savat</span>
      </NavLink>

      <NavLink
        to={profileLink}
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <User size={22} />
        <span>Profil</span>
      </NavLink>
    </nav>
  );
}
