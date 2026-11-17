import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Package, Heart, ShoppingBag, Settings, LogOut, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './Dashboard.css';

export default function DashboardSettings() {
  const { user, updateProfile, logout } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile({ name, phone, email });
    setLoading(false);
    showToast('Profil maʼlumotlari saqlandi!', 'success');
  };

  return (
    <div className="dashboard-page">
      <Helmet>
        <title>Profil sozlamalari — AvtoQism</title>
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
              <Link to="/dashboard/favorites" className="dash-menu-item">
                <Heart size={18} />
                <span>Sevimlilar</span>
              </Link>
              <Link to="/dashboard/orders" className="dash-menu-item">
                <ShoppingBag size={18} />
                <span>Buyurtmalar</span>
              </Link>
              <Link to="/dashboard/settings" className="dash-menu-item active">
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
            <h1 className="dashboard-page-title">Profil sozlamalari</h1>

            <div className="settings-card">
              <form onSubmit={handleSubmit} className="settings-form">
                <div className="form-group">
                  <label className="form-label">Ism va familiya</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Telefon raqam</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email manzil</label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-save-settings"
                >
                  <Check size={18} />
                  <span>{loading ? 'Saqlanmoqda...' : 'O‘zgarishlarni saqlash'}</span>
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
