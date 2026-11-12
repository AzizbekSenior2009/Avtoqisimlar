import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Package,
  Heart,
  ShoppingBag,
  Settings,
  LogOut,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { productService } from '../../services/productService';
import { formatPrice } from '../../lib/utils';
import Modal from '../../components/ui/Modal';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('active'); // active | sold | archive
  const [userAds, setUserAds] = useState([]);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const fetchAds = () => {
    // Get ads for the current user
    const res = productService.getProducts({
      userId: user?.id || 1,
      status: null, // all statuses for this user
      limit: 100,
    });
    setUserAds(res.products);
  };

  useEffect(() => {
    fetchAds();
  }, [user]);

  const activeAds = userAds.filter((a) => (a.status || 'active') === 'active');
  const soldAds = userAds.filter((a) => a.status === 'sold');
  const archiveAds = userAds.filter((a) => a.status === 'archived' || a.status === 'pending' || a.status === 'rejected');

  const displayedAds =
    activeTab === 'active'
      ? activeAds
      : activeTab === 'sold'
      ? soldAds
      : archiveAds;

  const totalViews = userAds.reduce((sum, a) => sum + (a.views || 0), 0);

  const handleMarkSold = (id) => {
    productService.updateProduct(id, { status: 'sold' });
    fetchAds();
    showToast("E'lon 'Sotilgan' deb belgilandi", 'info');
  };

  const handleRepost = (id) => {
    productService.updateProduct(id, { status: 'active' });
    fetchAds();
    showToast("E'lon qayta faollashtirildi!", 'success');
  };

  const confirmDelete = () => {
    if (deleteModalId) {
      productService.deleteProduct(deleteModalId);
      setDeleteModalId(null);
      fetchAds();
      showToast("E'lon muvaffaqiyatli o'chirildi", 'info');
    }
  };

  return (
    <div className="dashboard-page">
      <Helmet>
        <title>Foydalanuvchi kabineti — AvtoQism</title>
      </Helmet>

      <div className="container">
        <div className="dashboard-layout">
          {/* Left Column: Profile Card & Menu (IMAGE B - Page 7) */}
          <aside className="dashboard-sidebar">
            <div className="user-profile-widget">
              <div className="widget-avatar-round">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <h3 className="widget-user-name">{user?.name || 'Azizbek'}</h3>
              <p className="widget-user-phone">{user?.phone || '+998 90 123 45 67'}</p>
            </div>

            <nav className="dashboard-nav-menu">
              <Link
                to="/dashboard"
                className={`dash-menu-item ${
                  location.pathname === '/dashboard' || location.pathname === '/dashboard/listings'
                    ? 'active'
                    : ''
                }`}
              >
                <Package size={18} />
                <span>Mening e'lonlarim</span>
              </Link>

              <Link
                to="/dashboard/favorites"
                className={`dash-menu-item ${location.pathname === '/dashboard/favorites' ? 'active' : ''}`}
              >
                <Heart size={18} />
                <span>Sevimlilar</span>
              </Link>

              <Link
                to="/dashboard/orders"
                className={`dash-menu-item ${location.pathname === '/dashboard/orders' ? 'active' : ''}`}
              >
                <ShoppingBag size={18} />
                <span>Buyurtmalar</span>
              </Link>

              <Link
                to="/dashboard/settings"
                className={`dash-menu-item ${location.pathname === '/dashboard/settings' ? 'active' : ''}`}
              >
                <Settings size={18} />
                <span>Profil sozlamalari</span>
              </Link>

              <button
                type="button"
                className="dash-menu-item text-red"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <LogOut size={18} />
                <span>Chiqish</span>
              </button>
            </nav>
          </aside>

          {/* Right Column: Content Area */}
          <main className="dashboard-main-area">
            {/* Top Bar with Post Ad Button */}
            <div className="dashboard-top-bar">
              <h1 className="dashboard-page-title">
                Mening e'lonlarim ({userAds.length} ta)
              </h1>
              <Link to="/post-ad" className="btn-dash-post-ad">
                <Plus size={18} />
                <span>+ Yangi e'lon berish</span>
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="dash-stats-grid">
              <div className="dash-stat-tile">
                <span className="stat-tile-label">Jami e'lonlar</span>
                <span className="stat-tile-val">{userAds.length}</span>
              </div>
              <div className="dash-stat-tile">
                <span className="stat-tile-label">Faol e'lonlar</span>
                <span className="stat-tile-val green">{activeAds.length}</span>
              </div>
              <div className="dash-stat-tile">
                <span className="stat-tile-label">Sotilganlar</span>
                <span className="stat-tile-val blue">{soldAds.length}</span>
              </div>
              <div className="dash-stat-tile">
                <span className="stat-tile-label">Jami ko'rishlar</span>
                <span className="stat-tile-val orange">{totalViews}</span>
              </div>
            </div>

            {/* Ads Status Tabs (Faol | Sotilgan | Arxiv) */}
            <div className="dash-tabs-row">
              <button
                type="button"
                className={`dash-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                Faol ({activeAds.length})
              </button>
              <button
                type="button"
                className={`dash-tab-btn ${activeTab === 'sold' ? 'active' : ''}`}
                onClick={() => setActiveTab('sold')}
              >
                Sotilgan ({soldAds.length})
              </button>
              <button
                type="button"
                className={`dash-tab-btn ${activeTab === 'archive' ? 'active' : ''}`}
                onClick={() => setActiveTab('archive')}
              >
                Arxiv / Kutilmoqda ({archiveAds.length})
              </button>
            </div>

            {/* Listings rows matching IMAGE B mockup */}
            <div className="dash-listings-list">
              {displayedAds.length === 0 ? (
                <div className="dash-empty-box">
                  <Package size={40} className="dash-empty-icon" />
                  <p>Ushbu bo'limda hozircha e'lonlar yo'q</p>
                  {activeTab === 'active' && (
                    <Link to="/post-ad" className="btn-dash-empty-cta">
                      E'lon joylashtirish
                    </Link>
                  )}
                </div>
              ) : (
                displayedAds.map((ad) => {
                  const img =
                    ad.images && ad.images.length > 0
                      ? ad.images[0]
                      : '/images/products/placeholder.svg';

                  return (
                    <div key={ad.id} className="dash-listing-card">
                      <div className="dash-ad-left">
                        <img src={img} alt={ad.title} className="dash-ad-img" />
                        <div className="dash-ad-details">
                          <Link to={`/product/${ad.id}`} className="dash-ad-title">
                            {ad.title}
                          </Link>
                          <div className="dash-ad-price">{formatPrice(ad.price)}</div>
                          <div className="dash-ad-meta">
                            <span className={`ad-status-pill ${ad.status || 'active'}`}>
                              {ad.status === 'sold'
                                ? 'Sotilgan'
                                : ad.status === 'pending'
                                ? 'Kutilmoqda'
                                : 'Faol • 30 kun'}
                            </span>
                            <span className="ad-meta-views">
                              <Eye size={13} /> {ad.views || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="dash-ad-actions">
                        {ad.status === 'active' && (
                          <>
                            <button
                              type="button"
                              className="dash-action-btn edit"
                              onClick={() => navigate(`/post-ad?edit=${ad.id}`)}
                            >
                              Tahrirlash
                            </button>
                            <button
                              type="button"
                              className="dash-action-btn mark-sold"
                              onClick={() => handleMarkSold(ad.id)}
                            >
                              Sotildi
                            </button>
                            <button
                              type="button"
                              className="dash-action-btn delete"
                              onClick={() => setDeleteModalId(ad.id)}
                            >
                              O'chirish
                            </button>
                          </>
                        )}

                        {ad.status === 'sold' && (
                          <>
                            <button
                              type="button"
                              className="dash-action-btn repost"
                              onClick={() => handleRepost(ad.id)}
                            >
                              Qayta joylash
                            </button>
                            <button
                              type="button"
                              className="dash-action-btn delete"
                              onClick={() => setDeleteModalId(ad.id)}
                            >
                              O'chirish
                            </button>
                          </>
                        )}

                        {ad.status !== 'active' && ad.status !== 'sold' && (
                          <>
                            <button
                              type="button"
                              className="dash-action-btn repost"
                              onClick={() => handleRepost(ad.id)}
                            >
                              Faollashtirish
                            </button>
                            <button
                              type="button"
                              className="dash-action-btn delete"
                              onClick={() => setDeleteModalId(ad.id)}
                            >
                              O'chirish
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteModalId)}
        onClose={() => setDeleteModalId(null)}
        title="E'lonni o'chirish"
        maxWidth={400}
      >
        <p style={{ fontSize: 14, color: 'var(--text)', marginBottom: 20 }}>
          Haqiqatan ham bu e'lonni butunlay o'chirib tashlamoqchimisiz? Ushbu amalni ortga qaytarib bo'lmaydi.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => setDeleteModalId(null)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: '#F1F5F9',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--red)',
              color: 'var(--white)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            O'chirish
          </button>
        </div>
      </Modal>
    </div>
  );
}
