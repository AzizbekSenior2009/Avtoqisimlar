import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../StaticPages.css';

export default function About() {
  return (
    <div className="static-page">
      <Helmet>
        <title>Biz haqimizda — AvtoQism</title>
      </Helmet>

      <div className="container">
        <div className="static-card">
          <h1 className="static-title">AvtoQism haqida</h1>
          <p className="static-text">
            <strong>AvtoQism</strong> — O‘zbekistondagi eng zamonaviy va qulay avtomobil ehtiyot qismlari onlayn platformasi. Biz avtomobil egalari va ishonchli ehtiyot qism sotuvchilarini bir joyda birlashtiramiz.
          </p>

          <h2 className="static-section-sub">Bizning maqsadimiz</h2>
          <p className="static-text">
            Avtomobilingiz uchun kerakli ehtiyot qismni qidirish jarayonini bir necha daqiqaga qisqartirish, arzon narxlarda sifatli tovarlarni topish va butun O'zbekiston bo'ylab qulay xarid imkoniyatini taqdim etish.
          </p>

          <h2 className="static-section-sub">Nega aynan AvtoQism?</h2>
          <ul className="static-list">
            <li><strong>Keng assortiment:</strong> Dvigatel, podveska, tormoz tizimi, elektrika, moylar va shinalargacha.</li>
            <li><strong>Kafolatlangan sifat:</strong> Faqat sinalgan va tasdiqlangan do'konlar hamda rasmiy dilerlar.</li>
            <li><strong>Shaffof narxlar:</strong> Vositachilarsiz, to'g'ridan-to'g'ri sotuvchi narxlarida xarid qiling.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
