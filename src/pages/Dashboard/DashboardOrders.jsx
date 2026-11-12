import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Package, Heart, ShoppingBag, Settings, LogOut, Clock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { formatPrice, formatDate } from '../../lib/utils';
import './Dashboard.css';

export default function DashboardOrders() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userOrders = orderService.getOrdersByUser(user?.id, user?.phone);
    setOrders(userOrders);
  }, [user]);

  return (
    <div className="dashboard-page">
      <Helmet>
        <title>Mening buyurtmalarim — AvtoQism</title>
      </Helmet>

      <div className="container">
        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="user-profile-widget">
              <div className="widget-avatar-round">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <h3 className="widget-user-name">{user?.name || 'Azizbek'}</h3>
              <p className="widget-user-phone">{user?.phone || '+998 90 123 45 67'}</p>
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
              <Link to="/dashboard/orders" className="dash-menu-item active">
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
              Mening buyurtmalarim ({orders.length})
            </h1>

            {orders.length === 0 ? (
              <div className="dash-empty-box">
                <ShoppingBag size={44} className="dash-empty-icon" />
                <p>Hozircha hech qanday buyurtma bermagansiz</p>
                <Link to="/catalog" className="btn-dash-empty-cta">
                  Katalogdan tanlash
                </Link>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-item-card">
                    <div className="order-head">
                      <div>
                        <strong>{order.orderNumber}</strong>
                        <span className="order-date"> • {formatDate(order.createdAt)}</span>
                      </div>
                      <span className={`order-status-badge ${order.status}`}>
                        {order.status === 'completed'
                          ? 'Bajarildi'
                          : order.status === 'processing'
                          ? 'Jarayonda'
                          : 'Yangi'}
                      </span>
                    </div>

                    <div className="order-products-summary">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="order-prod-row">
                          <span>{it.title} x {it.quantity} ta</span>
                          <span>{formatPrice((it.price || 0) * it.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <span className="order-total-label">Jami:</span>
                      <span className="order-total-val">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
