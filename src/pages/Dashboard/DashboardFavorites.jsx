import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Package, Heart, ShoppingBag, Settings, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { favoriteService } from '../../services/favoriteService';
import { productService } from '../../services/productService';
import ProductCard from '../../components/products/ProductCard';
import './Dashboard.css';

export default function DashboardFavorites() {
  const { user, logout } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const loadFavorites = () => {
    const favIds = favoriteService.getFavorites();
    const all = productService.getProducts({ limit: 100 }).products;
    const filtered = all.filter((p) => favIds.includes(Number(p.id)) || favIds.includes(String(p.id)));
    setFavoriteProducts(filtered);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleFavoriteToggle = () => {
    loadFavorites();
  };

  return (
    <div className="dashboard-page">
      <Helmet>
        <title>Sevimlilar — AvtoQism</title>
      </Helmet>

      <div className="container">
        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="user-profile-widget">
              <div className="widget-avatar-round">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <h3 className="widget-user-name">{user?.name || 'Azizbek'}</h3>
              <p className="widget-user-phone">{user?.phone || '+998 93 695 30 66'}</p>
            </div>

            <nav className="dashboard-nav-menu">
              <Link to="/dashboard" className="dash-menu-item">
                <Package size={18} />
                <span>Mening e'lonlarim</span>
              </Link>
              <Link to="/dashboard/favorites" className="dash-menu-item active">
                <Heart size={18} />
                <span>Sevimlilar</span>
              </Link>
              <Link to="/dashboard/orders" className="dash-menu-item">
                <ShoppingBag size={18} />
                <span>Buyurtmalar</span>
              </Link>
              <Link to="/dashboard/settings" className="dash-menu-item">
                <Settings size={18} />
                <span>Profil sozlamalari</span>
              </Link>
              <button type="button" className="dash-menu-item text-red" onClick={logout}>
                <LogOut size={18} />
                <span>Chiqish</span>
              </button>
            </nav>
          </aside>

          <main className="dashboard-main-area">
            <h1 className="dashboard-page-title">
              Sevimlilar ro'yxati ({favoriteProducts.length})
            </h1>

            {favoriteProducts.length === 0 ? (
              <div className="dash-empty-box">
                <Heart size={44} className="dash-empty-icon" />
                <p>Hozircha sevimlilar ro'yxatiga hech narsa qo'shmadingiz</p>
                <Link to="/catalog" className="btn-dash-empty-cta">
                  Katalogga o'tish
                </Link>
              </div>
            ) : (
              <div className="dash-favorites-grid">
                {favoriteProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isFavorite={true}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
