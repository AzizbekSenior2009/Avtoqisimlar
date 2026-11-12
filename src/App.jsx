import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminRoute from './components/AdminRoute/AdminRoute';

/* ── Lazy-loaded Pages ────────────────────────────────── */
const Home = lazy(() => import('./pages/Home/Home'));
const Catalog = lazy(() => import('./pages/Catalog/Catalog'));
const Product = lazy(() => import('./pages/Product/Product'));
const Seller = lazy(() => import('./pages/Seller/Seller'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const PostAd = lazy(() => import('./pages/PostAd/PostAd'));
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const DashboardListings = lazy(() => import('./pages/Dashboard/DashboardListings'));
const DashboardFavorites = lazy(() => import('./pages/Dashboard/DashboardFavorites'));
const DashboardOrders = lazy(() => import('./pages/Dashboard/DashboardOrders'));
const DashboardSettings = lazy(() => import('./pages/Dashboard/DashboardSettings'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const Delivery = lazy(() => import('./pages/Delivery/Delivery'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const About = lazy(() => import('./pages/About/About'));
const Terms = lazy(() => import('./pages/Terms/Terms'));
const Privacy = lazy(() => import('./pages/Privacy/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

/* ── Loading Fallback ─────────────────────────────────── */
function LoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        width: '100%',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: '3px solid #E2E8F0',
          borderTopColor: '#1D4ED8',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }}
      />
    </div>
  );
}

/* ── App Component ────────────────────────────────────── */
function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="seller/:id" element={<Seller />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="post-ad" element={<PostAd />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/listings" element={<DashboardListings />} />
            <Route path="dashboard/favorites" element={<DashboardFavorites />} />
            <Route path="dashboard/orders" element={<DashboardOrders />} />
            <Route path="dashboard/settings" element={<DashboardSettings />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin/*" element={<Admin />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
