import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../StaticPages.css';

export default function Privacy() {
  return (
    <div className="static-page">
      <Helmet>
        <title>Maxfiylik siyosati — AvtoQism</title>
      </Helmet>

      <div className="container">
        <div className="static-card">
          <h1 className="static-title">Maxfiylik siyosati</h1>
          <p className="static-text">
            AvtoQism foydalanuvchilarining shaxsiy ma'lumotlari xavfsizligini ta'minlash bizning ustuvor vazifamizdir.
          </p>

          <h2 className="static-section-sub">1. Ma'lumotlarni yig'ish</h2>
          <p className="static-text">
            Biz ro'yxatdan o'tishda kiritilgan ism, telefon raqami va email manzilingizni faqat xizmat ko'rsatish va buyurtmalarni qayta ishlash maqsadida saqlaymiz.
          </p>

          <h2 className="static-section-sub">2. Ma'lumotlarni uchinchi shaxslarga bermaslik</h2>
          <p className="static-text">
            Sizning shaxsiy ma'lumotlaringiz qonunda nazarda tutilgan holatlardan tashqari hech qachon uchinchi shaxslarga sotilmaydi yoki topshirilmaydi.
          </p>
        </div>
      </div>
    </div>
  );
}
