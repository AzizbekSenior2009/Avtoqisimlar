import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { inquiryService } from '../../services/inquiryService';
import { useToast } from '../../context/ToastContext';
import '../StaticPages.css';

export default function Contact() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setLoading(true);
    inquiryService.createInquiry({ name, phone, message });
    setLoading(false);

    setName('');
    setPhone('+998 ');
    setMessage('');
    showToast('Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.', 'success');
  };

  return (
    <div className="static-page">
      <Helmet>
        <title>Biz bilan bog'lanish — AvtoQism</title>
      </Helmet>

      <div className="container">
        <div className="static-card">
          <h1 className="static-title">Biz bilan bog'laning</h1>
          <p className="static-text">
            Savollaringiz, takliflaringiz yoki hamkorlik bo'yicha murojaatingiz bormi? Biz sizga yordam berishdan mamnunmiz!
          </p>

          <div className="contact-grid">
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <Phone size={20} />
                </div>
                <div>
                  <strong>Telefon:</strong>
                  <div><a href="tel:+998936953066" style={{ color: 'inherit', textDecoration: 'none' }}>+998 93 695 30 66</a></div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <Mail size={20} />
                </div>
                <div>
                  <strong>Email:</strong>
                  <div><a href="mailto:azizbeksiddiqov077@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>azizbeksiddiqov077@gmail.com</a></div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <Send size={20} />
                </div>
                <div>
                  <strong>Telegram kanal:</strong>
                  <div>@avtoqism</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <MapPin size={20} />
                </div>
                <div>
                  <strong>Manzil:</strong>
                  <div>Namangan viloyati, Yangiqo'rg'on tumani</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div>
                <label className="form-label">Ismingiz *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="Ismingizni kiriting"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Telefon raqamingiz *</label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Xabar matni *</label>
                <textarea
                  rows={4}
                  required
                  className="form-input textarea"
                  placeholder="Savol yoki taklifingizni yozing..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-contact-submit"
              >
                {loading ? 'Yuborilmoqda...' : 'Xabarni yuborish'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
