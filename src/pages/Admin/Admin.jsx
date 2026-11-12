import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Grid,
  Tag,
  AlertTriangle,
  Mail,
  Settings,
  LogOut,
  Check,
  X,
  Trash2,
  Menu,
  ChevronRight,
  TrendingUp,
  Eye,
  ShieldAlert,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';
import { reportService } from '../../services/reportService';
import { subscriberService } from '../../services/subscriberService';
import { categoryService } from '../../services/categoryService';
import { brandService } from '../../services/brandService';
import { getItem, setItem, KEYS } from '../../services/storage';
import { formatPrice } from '../../lib/utils';
import Logo from '../../components/ui/Logo';
import './Admin.css';

const CHART_DATA = [
  { date: '24.10', visits: 120 },
  { date: '25.10', visits: 145 },
  { date: '26.10', visits: 130 },
  { date: '27.10', visits: 210 },
  { date: '28.10', visits: 180 },
  { date: '29.10', visits: 260 },
  { date: '30.10', visits: 310 },
];

export default function Admin() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Data states
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reports, setReports] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [moderationEnabled, setModerationEnabled] = useState(true);

  const refreshData = () => {
    setProducts(productService.getProducts({ limit: 100, status: null }).products);
    setOrders(orderService.getOrders());
    setReports(reportService.getReports());
    setSubscribers(subscriberService.getSubscribers());
    setCategories(categoryService.getCategories());
    setBrands(brandService.getBrands());
    setModerationEnabled(getItem(KEYS.MODERATION, true));
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleApproveAd = (id) => {
    productService.updateProduct(id, { status: 'active' });
    refreshData();
    showToast("E'lon tasdiqlandi va faollashtirildi!", 'success');
  };

  const handleRejectAd = (id) => {
    productService.updateProduct(id, { status: 'rejected' });
    refreshData();
    showToast("E'lon rad etildi", 'info');
  };

  const handleDeleteAd = (id) => {
    productService.deleteProduct(id);
    refreshData();
    showToast("E'lon o'chirildi", 'info');
  };

  const toggleModeration = () => {
    const nextVal = !moderationEnabled;
    setModerationEnabled(nextVal);
    setItem(KEYS.MODERATION, nextVal);
    showToast(`Moderatsiya ${nextVal ? 'yoqildi' : 'o‘chirildi'}`, 'info');
  };

  return (
    <div className="admin-container">
      <Helmet>
        <title>Admin panel — AvtoQism</title>
      </Helmet>

      {/* Navy Sidebar (IMAGE B - Page 8) */}
      <aside className={`admin-sidebar ${mobileDrawerOpen ? 'drawer-open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-brand">
            <span className="admin-brand-main">AvtoQism</span>
            <span className="admin-brand-badge">Admin</span>
          </div>
          <button
            type="button"
            className="admin-drawer-close show-mobile-only"
            onClick={() => setMobileDrawerOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-nav-list">
          <button
            type="button"
            className={`admin-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('dashboard');
              setMobileDrawerOpen(false);
            }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={`admin-nav-btn ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('listings');
              setMobileDrawerOpen(false);
            }}
          >
            <Package size={18} />
            <span>E'lonlar ({products.length})</span>
          </button>

          <button
            type="button"
            className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('orders');
              setMobileDrawerOpen(false);
            }}
          >
            <ShoppingBag size={18} />
            <span>Buyurtmalar ({orders.length})</span>
          </button>

          <button
            type="button"
            className={`admin-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('reports');
              setMobileDrawerOpen(false);
            }}
          >
            <AlertTriangle size={18} />
            <span>Shikoyatlar ({reports.length})</span>
          </button>

          <button
            type="button"
            className={`admin-nav-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('categories');
              setMobileDrawerOpen(false);
            }}
          >
            <Grid size={18} />
            <span>Kategoriyalar</span>
          </button>

          <button
            type="button"
            className={`admin-nav-btn ${activeTab === 'brands' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('brands');
              setMobileDrawerOpen(false);
            }}
          >
            <Tag size={18} />
            <span>Brendlar</span>
          </button>

          <button
            type="button"
            className={`admin-nav-btn ${activeTab === 'subscribers' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('subscribers');
              setMobileDrawerOpen(false);
            }}
          >
            <Mail size={18} />
            <span>Obunachilar</span>
          </button>

          <button
            type="button"
            className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('settings');
              setMobileDrawerOpen(false);
            }}
          >
            <Settings size={18} />
            <span>Sozlamalar</span>
          </button>

          <button
            type="button"
            className="admin-nav-btn text-red"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <LogOut size={18} />
            <span>Chiqish</span>
          </button>
        </nav>
      </aside>

      {/* Main Admin Content */}
      <div className="admin-main">
        {/* Admin Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              type="button"
              className="admin-menu-toggle show-mobile-only"
              onClick={() => setMobileDrawerOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h2 className="admin-page-title">
              {activeTab === 'dashboard'
                ? 'Admin panel'
                : activeTab === 'listings'
                ? "E'lonlar boshqaruvi"
                : activeTab === 'orders'
                ? 'Buyurtmalar'
                : activeTab === 'reports'
                ? 'Shikoyatlar'
                : activeTab === 'categories'
                ? 'Kategoriyalar'
                : activeTab === 'brands'
                ? 'Brendlar'
                : activeTab === 'subscribers'
                ? 'Obunachilar ro‘yxati'
                : 'Tizim sozlamalari'}
            </h2>
          </div>

          <div className="admin-user-badge">
            <div className="admin-avatar">A</div>
            <span className="admin-user-name">Admin (admin@avtoqism.uz)</span>
          </div>
        </header>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="admin-dashboard-view">
            {/* 4 Stat Cards (IMAGE B) */}
            <div className="admin-stat-cards-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-icon-wrap blue">
                  <Package size={22} />
                </div>
                <div className="admin-stat-info">
                  <div className="stat-number">{products.length || 120}</div>
                  <div className="stat-name">Jami e'lonlar</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon-wrap green">
                  <Check size={22} />
                </div>
                <div className="admin-stat-info">
                  <div className="stat-number">24</div>
                  <div className="stat-name">Yangi bugun</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon-wrap purple">
                  <Users size={22} />
                </div>
                <div className="admin-stat-info">
                  <div className="stat-number">5 230</div>
                  <div className="stat-name">Foydalanuvchilar</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon-wrap orange">
                  <Eye size={22} />
                </div>
                <div className="admin-stat-info">
                  <div className="stat-number">89 760</div>
                  <div className="stat-name">Tashriflar</div>
                </div>
              </div>
            </div>

            {/* Middle Row: 7-day Line Chart & Latest Ads */}
            <div className="admin-charts-grid">
              {/* Chart */}
              <div className="admin-card-panel chart-panel">
                <h3 className="panel-title">Statistika (oxirgi 7 kun)</h3>
                <div style={{ width: '100%', height: 260 }}>
                  <ResponsiveContainer>
                    <LineChart data={CHART_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
                      <YAxis stroke="#94A3B8" fontSize={12} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="visits"
                        stroke="#1D4ED8"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#1D4ED8' }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Latest Ads list */}
              <div className="admin-card-panel latest-ads-panel">
                <h3 className="panel-title">So'nggi e'lonlar</h3>
                <div className="admin-mini-ads-list">
                  {products.slice(0, 5).map((p) => (
                    <div key={p.id} className="admin-mini-ad-row">
                      <img
                        src={
                          p.images && p.images[0]
                            ? p.images[0]
                            : '/images/products/placeholder.svg'
                        }
                        alt={p.title}
                        className="mini-ad-thumb"
                      />
                      <div className="mini-ad-details">
                        <span className="mini-ad-title">{p.title}</span>
                        <span className="mini-ad-price">{formatPrice(p.price)}</span>
                      </div>
                      <span className={`mini-status-badge ${p.status || 'active'}`}>
                        {p.status === 'pending'
                          ? 'Kutilmoqda'
                          : p.status === 'rejected'
                          ? 'Rad etildi'
                          : 'Faol'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Listings Moderation Table */}
        {activeTab === 'listings' && (
          <div className="admin-card-panel">
            <div className="panel-header-row">
              <h3 className="panel-title">Barcha e'lonlar ({products.length})</h3>
              <div className="moderation-switch-box">
                <span>Avtomatik moderatsiya:</span>
                <button
                  type="button"
                  className={`toggle-switch-btn ${moderationEnabled ? 'active' : ''}`}
                  onClick={toggleModeration}
                >
                  <div className="toggle-slider" />
                </button>
              </div>
            </div>

            <div className="table-responsive-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Rasm & Nomi</th>
                    <th>Narxi</th>
                    <th>Shahar</th>
                    <th>Holati</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((ad) => (
                    <tr key={ad.id}>
                      <td>
                        <div className="table-product-cell">
                          <img
                            src={
                              ad.images && ad.images[0]
                                ? ad.images[0]
                                : '/images/products/placeholder.svg'
                            }
                            alt=""
                            className="table-ad-thumb"
                          />
                          <div className="table-ad-text">
                            <strong>{ad.title}</strong>
                            <span className="table-ad-sub">{ad.oem ? `OEM: ${ad.oem}` : ad.city}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong className="table-price">{formatPrice(ad.price)}</strong>
                      </td>
                      <td>{ad.city}</td>
                      <td>
                        <span className={`table-status-pill ${ad.status || 'active'}`}>
                          {ad.status === 'pending'
                            ? 'Kutilmoqda'
                            : ad.status === 'rejected'
                            ? 'Rad etildi'
                            : 'Faol'}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          {ad.status !== 'active' && (
                            <button
                              type="button"
                              className="action-btn-icon check"
                              title="Tasdiqlash"
                              onClick={() => handleApproveAd(ad.id)}
                            >
                              <Check size={16} />
                            </button>
                          )}
                          {ad.status !== 'rejected' && (
                            <button
                              type="button"
                              className="action-btn-icon reject"
                              title="Rad etish"
                              onClick={() => handleRejectAd(ad.id)}
                            >
                              <X size={16} />
                            </button>
                          )}
                          <button
                            type="button"
                            className="action-btn-icon trash"
                            title="O'chirish"
                            onClick={() => handleDeleteAd(ad.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Orders */}
        {activeTab === 'orders' && (
          <div className="admin-card-panel">
            <h3 className="panel-title">Mijozlar buyurtmalari ({orders.length})</h3>
            <div className="table-responsive-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Buyurtmachi</th>
                    <th>Telefon</th>
                    <th>Jami summa</th>
                    <th>Holati</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>
                        Buyurtmalar mavjud emas
                      </td>
                    </tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o.id}>
                        <td><strong>{o.orderNumber}</strong></td>
                        <td>{o.customerName}</td>
                        <td>{o.phone}</td>
                        <td><strong>{formatPrice(o.total)}</strong></td>
                        <td>
                          <span className={`table-status-pill ${o.status}`}>
                            {o.status === 'new' ? 'Yangi' : o.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Reports */}
        {activeTab === 'reports' && (
          <div className="admin-card-panel">
            <h3 className="panel-title">Kelib tushgan shikoyatlar ({reports.length})</h3>
            <div className="table-responsive-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>E'lon</th>
                    <th>Sabab</th>
                    <th>Izoh</th>
                    <th>Holati</th>
                    <th>Amal</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>
                        Shikoyatlar yo'q
                      </td>
                    </tr>
                  ) : (
                    reports.map((r) => (
                      <tr key={r.id}>
                        <td><strong>#{r.adId}</strong> {r.adTitle}</td>
                        <td>{r.reason}</td>
                        <td>{r.comment || '-'}</td>
                        <td>
                          <span className={`table-status-pill ${r.status}`}>
                            {r.status}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="action-btn-icon check"
                            onClick={() => {
                              reportService.resolveReport(r.id, 'resolved');
                              refreshData();
                              showToast('Shikoyat ko‘rib chiqildi deb belgilandi', 'success');
                            }}
                          >
                            <Check size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Categories */}
        {activeTab === 'categories' && (
          <div className="admin-card-panel">
            <h3 className="panel-title">Kategoriyalar boshqaruvi ({categories.length})</h3>
            <div className="table-responsive-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nomi</th>
                    <th>Slug</th>
                    <th>E'lonlar soni</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td>#{c.id}</td>
                      <td><strong>{c.name}</strong></td>
                      <td>{c.slug}</td>
                      <td>{c.count || 0} ta</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 6: Brands */}
        {activeTab === 'brands' && (
          <div className="admin-card-panel">
            <h3 className="panel-title">Brendlar boshqaruvi ({brands.length})</h3>
            <div className="table-responsive-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Nomi</th>
                    <th>Slug</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <img src={b.logo} alt="" style={{ height: 24, objectFit: 'contain' }} />
                      </td>
                      <td><strong>{b.name}</strong></td>
                      <td>{b.slug}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 7: Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="admin-card-panel">
            <h3 className="panel-title">Obunachilar ({subscribers.length})</h3>
            <ul style={{ listStyle: 'none', padding: 12 }}>
              {subscribers.length === 0 ? (
                <li style={{ color: 'var(--muted)' }}>Hozircha obunachilar yo'q</li>
              ) : (
                subscribers.map((email, idx) => (
                  <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                    📧 {email}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {/* Tab 8: Settings */}
        {activeTab === 'settings' && (
          <div className="admin-card-panel">
            <h3 className="panel-title">Tizim va Moderatsiya sozlamalari</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: '#F8FAFC', borderRadius: 10 }}>
                <div>
                  <strong>Yangi e'lonlar moderatsiyasi</strong>
                  <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
                    Yoqilgan bo'lsa, foydalanuvchi joylagan e'lonlar admin tasdiqlaguncha kutish holatida turadi.
                  </p>
                </div>
                <button
                  type="button"
                  className={`toggle-switch-btn ${moderationEnabled ? 'active' : ''}`}
                  onClick={toggleModeration}
                >
                  <div className="toggle-slider" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
