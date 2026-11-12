import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Upload, X, Check, Image as ImageIcon, CheckCircle2, ChevronRight, Car } from 'lucide-react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { brandService } from '../../services/brandService';
import { cities } from '../../data/mock';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../lib/utils';
import './PostAd.css';

const CAR_MODELS = [
  'Chevrolet Cobalt',
  'Chevrolet Gentra',
  'Chevrolet Nexia 3',
  'Chevrolet Spark',
  'Chevrolet Tracker',
  'Chevrolet Malibu',
  'KIA K5',
  'Hyundai Sonata',
  'Lada Vesta',
  'Daewoo Nexia',
];

export default function PostAd() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const categories = categoryService.getCategories();
  const brands = brandService.getBrands();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form states
  // Step 1: Images
  const [images, setImages] = useState([]);

  // Step 2: Details
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('new');
  const [oem, setOem] = useState('');
  const [city, setCity] = useState('Toshkent');
  const [description, setDescription] = useState('');

  // Step 3: Contact
  const [sellerName, setSellerName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+998 ');
  const [telegram, setTelegram] = useState('');
  const [contactPref, setContactPref] = useState('all'); // all | call | telegram

  // Errors
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (images.length + files.length > 5) {
      showToast("Ko'pi bilan 5 tagacha rasm yuklash mumkin!", 'error');
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImages((prev) => [...prev, loadEvent.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const toggleModel = (model) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!categoryId) newErrors.category = 'Kategoriyani tanlang';
    if (!brandId) newErrors.brand = 'Brendni tanlang';
    if (!title.trim()) newErrors.title = 'Sarlavhani kiriting';
    if (!price || Number(price) <= 0) newErrors.price = "Narxni to'g'ri kiriting";
    if (!description.trim() || description.length < 20) {
      newErrors.description = "Tavsif kamida 20 ta belgidan iborat bo'lishi kerak";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!sellerName.trim()) newErrors.sellerName = 'Ismingizni kiriting';
    if (!phone || phone.trim().length < 9) newErrors.phone = "Telefon raqamingizni to'liq kiriting";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (images.length === 0) {
        showToast("Kamida bitta rasm yuklash tavsiya etiladi (yoki keyingi qadamga o'ting)", 'info');
      }
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (validateStep3()) setStep(4);
    }
  };

  const handleSubmitAd = async () => {
    setLoading(true);

    const newAd = productService.createProduct({
      title,
      price: Number(price),
      condition,
      category_id: Number(categoryId),
      brand_id: Number(brandId),
      compatibleCars: selectedModels,
      oem: oem.trim() || undefined,
      city,
      description,
      images: images.length > 0 ? images : ['/images/products/placeholder.svg'],
      seller_id: user?.id || 1,
      sellerName,
      phone,
      telegram,
      userId: user?.id || 1,
    });

    setLoading(false);
    showToast("E'loningiz muvaffaqiyatli qabul qilindi!", 'success');
    navigate('/dashboard/listings');
  };

  return (
    <div className="post-ad-page">
      <Helmet>
        <title>E'lon berish — AvtoQism</title>
      </Helmet>

      <div className="container">
        {/* Stepper Header */}
        <div className="stepper-header-card">
          <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-label">Rasmlar</span>
          </div>
          <div className="step-line" />
          <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-label">Ma'lumot</span>
          </div>
          <div className="step-line" />
          <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-label">Aloqa</span>
          </div>
          <div className="step-line" />
          <div className={`step-item ${step >= 4 ? 'active' : ''}`}>
            <span className="step-num">4</span>
            <span className="step-label">Tasdiqlash</span>
          </div>
        </div>

        {/* Layout Grid: Left Form (Wizard) + Right Sidebar (Why AvtoQism) */}
        <div className="post-ad-grid">
          <div className="post-ad-main-form">
            {/* Step 1: Images */}
            {step === 1 && (
              <div className="wizard-step-panel">
                <h2 className="step-headline">Rasmlarni yuklang</h2>
                <p className="step-instruction">
                  E'loningiz tezroq sotilishi uchun aniq va sifatli rasmlar yuklang (5 tagacha)
                </p>

                <label className="upload-dropzone">
                  <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <div className="upload-icon-circle">
                    <Upload size={32} />
                  </div>
                  <span className="upload-main-text">
                    5 gacha rasm tanlang (JPG, PNG)
                  </span>
                  <span className="upload-hint">yoki rasmlarni bu yerga bosing</span>
                </label>

                {images.length > 0 && (
                  <div className="uploaded-thumbnails-grid">
                    {images.map((img, idx) => (
                      <div key={idx} className="uploaded-thumb-box">
                        <img src={img} alt={`Yuklangan ${idx + 1}`} />
                        <button
                          type="button"
                          className="thumb-remove-btn"
                          onClick={() => removeImage(idx)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="step-footer-actions">
                  <div />
                  <button
                    type="button"
                    className="btn-step-next"
                    onClick={handleNextStep}
                  >
                    Davom etish →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Information */}
            {step === 2 && (
              <div className="wizard-step-panel">
                <h2 className="step-headline">Mahsulot haqida ma'lumot</h2>

                <div className="form-fields-grid">
                  {/* Category */}
                  <div className="form-group">
                    <label className="form-label">Kategoriya *</label>
                    <select
                      className={`form-input ${errors.category ? 'error' : ''}`}
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option value="">Kategoriyani tanlang</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && <span className="error-msg">{errors.category}</span>}
                  </div>

                  {/* Brand */}
                  <div className="form-group">
                    <label className="form-label">Brend *</label>
                    <select
                      className={`form-input ${errors.brand ? 'error' : ''}`}
                      value={brandId}
                      onChange={(e) => setBrandId(e.target.value)}
                    >
                      <option value="">Brendni tanlang</option>
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                    {errors.brand && <span className="error-msg">{errors.brand}</span>}
                  </div>

                  {/* Compatible Car Models (Multi-select Chips) */}
                  <div className="form-group full-width">
                    <label className="form-label">Mos avtomobillar (tanlang)</label>
                    <div className="chips-selector-wrap">
                      {CAR_MODELS.map((m) => (
                        <button
                          key={m}
                          type="button"
                          className={`model-chip ${
                            selectedModels.includes(m) ? 'selected' : ''
                          }`}
                          onClick={() => toggleModel(m)}
                        >
                          {selectedModels.includes(m) && <Check size={14} />}
                          <span>{m}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="form-group full-width">
                    <label className="form-label">E'lon sarlavhasi *</label>
                    <input
                      type="text"
                      className={`form-input ${errors.title ? 'error' : ''}`}
                      placeholder="Masalan: Chevrolet Cobalt uchun old tormoz diski"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <span className="error-msg">{errors.title}</span>}
                  </div>

                  {/* Price */}
                  <div className="form-group">
                    <label className="form-label">Narxi (so'm) *</label>
                    <input
                      type="number"
                      className={`form-input ${errors.price ? 'error' : ''}`}
                      placeholder="Masalan: 450000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {price && <span className="price-preview">{formatPrice(price)}</span>}
                    {errors.price && <span className="error-msg">{errors.price}</span>}
                  </div>

                  {/* Condition */}
                  <div className="form-group">
                    <label className="form-label">Holati *</label>
                    <div className="condition-toggle-group">
                      <label className={`cond-toggle-btn ${condition === 'new' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="p-cond"
                          checked={condition === 'new'}
                          onChange={() => setCondition('new')}
                        />
                        <span>Yangi</span>
                      </label>
                      <label className={`cond-toggle-btn ${condition === 'used' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="p-cond"
                          checked={condition === 'used'}
                          onChange={() => setCondition('used')}
                        />
                        <span>Ishlatilgan</span>
                      </label>
                    </div>
                  </div>

                  {/* OEM */}
                  <div className="form-group">
                    <label className="form-label">OEM kodi (ixtiyoriy)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Masalan: 96471298"
                      value={oem}
                      onChange={(e) => setOem(e.target.value)}
                    />
                  </div>

                  {/* City */}
                  <div className="form-group">
                    <label className="form-label">Shahar *</label>
                    <select
                      className="form-input"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="form-group full-width">
                    <label className="form-label">Batafsil tavsif * (kamida 20 belgi)</label>
                    <textarea
                      rows={4}
                      className={`form-input textarea ${errors.description ? 'error' : ''}`}
                      placeholder="Mahsulot holati, xususiyatlari va kafolatlari haqida batafsil yozing..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <span className="error-msg">{errors.description}</span>
                    )}
                  </div>
                </div>

                <div className="step-footer-actions">
                  <button
                    type="button"
                    className="btn-step-prev"
                    onClick={() => setStep(1)}
                  >
                    ← Orqaga
                  </button>
                  <button
                    type="button"
                    className="btn-step-next"
                    onClick={handleNextStep}
                  >
                    Davom etish →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div className="wizard-step-panel">
                <h2 className="step-headline">Aloqa ma'lumotlari</h2>

                <div className="form-fields-grid">
                  <div className="form-group">
                    <label className="form-label">Ismingiz *</label>
                    <input
                      type="text"
                      className={`form-input ${errors.sellerName ? 'error' : ''}`}
                      placeholder="Masalan: Sardor"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                    />
                    {errors.sellerName && (
                      <span className="error-msg">{errors.sellerName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Telefon raqam *</label>
                    <input
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+998 90 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <span className="error-msg">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Telegram username</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="@username"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Aloqa turi</label>
                    <select
                      className="form-input"
                      value={contactPref}
                      onChange={(e) => setContactPref(e.target.value)}
                    >
                      <option value="all">Qo'ng'iroq va Telegram</option>
                      <option value="call">Faqat qo'ng'iroq</option>
                      <option value="telegram">Faqat Telegram</option>
                    </select>
                  </div>
                </div>

                <div className="step-footer-actions">
                  <button
                    type="button"
                    className="btn-step-prev"
                    onClick={() => setStep(2)}
                  >
                    ← Orqaga
                  </button>
                  <button
                    type="button"
                    className="btn-step-next"
                    onClick={handleNextStep}
                  >
                    Davom etish →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Preview & Confirm */}
            {step === 4 && (
              <div className="wizard-step-panel">
                <h2 className="step-headline">E'lonni tasdiqlash</h2>
                <p className="step-instruction">
                  E'loningizni joylashdan oldin barcha ma'lumotlarni tekshirib chiqing
                </p>

                <div className="preview-ad-card">
                  <div className="preview-top-row">
                    <div className="preview-image-box">
                      <img
                        src={
                          images.length > 0
                            ? images[0]
                            : '/images/products/placeholder.svg'
                        }
                        alt={title}
                      />
                    </div>
                    <div className="preview-info-box">
                      <span className={`preview-cond ${condition}`}>
                        {condition === 'new' ? 'Yangi' : 'Ishlatilgan'}
                      </span>
                      <h3 className="preview-title">{title}</h3>
                      <div className="preview-price">{formatPrice(price)}</div>
                      <div className="preview-meta">
                        <span>{city}</span>
                        {oem && <span>• OEM: {oem}</span>}
                      </div>
                    </div>
                  </div>

                  {selectedModels.length > 0 && (
                    <div className="preview-models">
                      <strong>Mos avtomobillar:</strong> {selectedModels.join(', ')}
                    </div>
                  )}

                  <div className="preview-desc">{description}</div>

                  <div className="preview-contacts">
                    <strong>Bog'lanish uchun:</strong> {sellerName} ({phone})
                    {telegram && ` • ${telegram}`}
                  </div>
                </div>

                <div className="step-footer-actions">
                  <button
                    type="button"
                    className="btn-step-prev"
                    onClick={() => setStep(3)}
                  >
                    ← Orqaga
                  </button>
                  <button
                    type="button"
                    className="btn-publish-ad"
                    disabled={loading}
                    onClick={handleSubmitAd}
                  >
                    {loading ? 'Joylanmoqda...' : "E'lonni joylash"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: "Nega AvtoQism?" */}
          <div className="post-ad-sidebar hide-mobile">
            <div className="sidebar-why-card">
              <h3 className="sidebar-why-title">Nega AvtoQism?</h3>

              <div className="sidebar-why-list">
                <div className="why-bullet-row">
                  <CheckCircle2 size={18} className="why-icon-blue" />
                  <span>Bepul e'lon berish</span>
                </div>
                <div className="why-bullet-row">
                  <CheckCircle2 size={18} className="why-icon-blue" />
                  <span>Tez joylashish</span>
                </div>
                <div className="why-bullet-row">
                  <CheckCircle2 size={18} className="why-icon-blue" />
                  <span>Ishonchli platforma</span>
                </div>
              </div>

              <div className="sidebar-car-wrap">
                <img
                  src="/images/why-us-car.svg"
                  alt="AvtoQism Avtomobil"
                  className="sidebar-car-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
