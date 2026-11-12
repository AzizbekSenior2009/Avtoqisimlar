import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home } from 'lucide-react';
import '../StaticPages.css';

export default function NotFound() {
  return (
    <div className="static-page">
      <Helmet>
        <title>Sahifa topilmadi — AvtoQism</title>
      </Helmet>

      <div className="container">
        <div className="static-card notfound-box">
          <div className="notfound-code">404</div>
          <h1 className="notfound-sub">Sahifa topilmadi</h1>
          <p className="notfound-desc">
            Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan.
          </p>
          <Link to="/" className="btn-back-home">
            <Home size={18} style={{ marginRight: 8 }} />
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}
