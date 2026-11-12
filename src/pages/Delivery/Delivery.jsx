import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import '../StaticPages.css';

export default function Delivery() {
  return (
    <div className="static-page">
      <Helmet>
        <title>Yetkazib berish — AvtoQism</title>
      </Helmet>

      <div className="container">
        <div className="static-card">
          <h1 className="static-title">Yetkazib berish xizmati</h1>
          <p className="static-text">
            AvtoQism platformasida xarid qilingan avtomobil ehtiyot qismlari butun O‘zbekiston bo‘ylab tez va xavfsiz yetkazib beriladi.
          </p>

          <h2 className="static-section-sub">Toshkent shahri bo‘ylab</h2>
          <ul className="static-list">
            <li><strong>Tezkor yetkazib berish:</strong> Buyurtma tasdiqlangandan so'ng 2-4 soat ichida yetkaziladi.</li>
            <li><strong>Standart yetkazib berish:</strong> 24 soat ichida qulay vaqtda topshiriladi.</li>
          </ul>

          <h2 className="static-section-sub">Viloyatlar bo‘ylab</h2>
          <ul className="static-list">
            <li>Samarqand, Buxoro, Andijon, Farg‘ona, Namangan, Qarshi va Nukus shaharlariga: 1-2 ish kuni ichida.</li>
            <li>Yetkazib berish kuryerlik xizmatlari (BTS, Fargo, EMU) orqali amalga oshiriladi.</li>
          </ul>

          <h2 className="static-section-sub">Xavfsizlik va kafolat</h2>
          <p className="static-text">
            Tovarni qabul qilib olayotganda qutini ochib, mahsulot butunligi va OEM mosligini tekshirish huquqiga egasiz. Nosozlik yoki nomuvofiqlik aniqlanganda sotuvchi mahsulotni almashtirib beradi.
          </p>
        </div>
      </div>
    </div>
  );
}
