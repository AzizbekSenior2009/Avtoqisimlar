import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import '../Login/Auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitted(true);
    showToast('Parolni tiklash havolasi yuborildi!', 'success');
  };

  return (
    <div className="auth-page">
      <Helmet>
        <title>Parolni tiklash — AvtoQism</title>
      </Helmet>

      <div className="auth-card">
        <div className="auth-card-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  color: 'var(--green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h2 className="auth-heading">Havola yuborildi!</h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.5 }}>
                <strong>{email}</strong> manziliga parolni qayta tiklash bo'yicha ko'rsatma yuborildi.
              </p>
              <Link to="/login" className="btn-auth-orange" style={{ textDecoration: 'none' }}>
                Kirish sahifasiga qaytish
              </Link>
            </div>
          ) : (
            <>
              <h2 className="auth-heading">Parolni unutdingizmi?</h2>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', textAlign: 'center', marginBottom: 20 }}>
                Ro'yxatdan o'tgan email manzilingizni kiriting, biz sizga tiklash havolasini yuboramiz.
              </p>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                  <input
                    type="email"
                    required
                    className="auth-input"
                    placeholder="Email manzilingiz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-auth-orange">
                  Tiklash havolasini yuborish
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Link to="/login" className="auth-back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <ArrowLeft size={16} /> Kirishga qaytish
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
