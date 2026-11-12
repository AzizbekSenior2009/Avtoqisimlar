import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../StaticPages.css';

export default function Terms() {
  return (
    <div className="static-page">
      <Helmet>
        <title>Foydalanish shartlari — AvtoQism</title>
      </Helmet>

      <div className="container">
        <div className="static-card">
          <h1 className="static-title">Foydalanish shartlari</h1>
          <p className="static-text">
            AvtoQism veb-platformasidan foydalanish orqali siz quyidagi shartlarga rozilik bildirasiz.
          </p>

          <h2 className="static-section-sub">1. E'lon joylashtirish qoidalari</h2>
          <ul className="static-list">
            <li>E'lon beruvchi mahsulot holati, narxi va rasmlarining to'g'riligi uchun to'liq javobgardir.</li>
            <li>Noqonuniy, taqiqlangan yoki qalbaki tovarlarni sotish qat'iyan taqiqlanadi.</li>
            <li>Barcha e'lonlar moderatorlar tomonidan ko'rib chiqilishi mumkin.</li>
          </ul>

          <h2 className="static-section-sub">2. Xarid va to'lovlar</h2>
          <p className="static-text">
            Platforma tovar xaridi bo'yicha sotuvchi va xaridor o'rtasidagi to'g'ridan-to'g'ri axborot vositachisi hisoblanadi. To'lov va yetkazib berish shartlari tomonlar o'rtasida mustaqil kelishiladi.
          </p>
        </div>
      </div>
    </div>
  );
}
