import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, X, TrendingUp, Clock } from 'lucide-react';
import './SearchOverlay.css';

const SUGGESTIONS = [
  'Amortizator',
  'Tormoz kolodka',
  'Motor moyi Shell',
  'Akumulyator Bosch',
  'Moy filtri',
  'Radiator',
  'Spark fara',
  'Cobalt bamper',
];

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState(() => {
    try {
      const saved = localStorage.getItem('avtoqism_recent_searches');
      return saved ? JSON.parse(saved) : ['Amortizator', 'Tormoz disk'];
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (searchTerm) => {
    const term = searchTerm.trim();
    if (!term) return;

    // Save to recent
    const updated = [term, ...recent.filter((r) => r.toLowerCase() !== term.toLowerCase())].slice(0, 6);
    setRecent(updated);
    localStorage.setItem('avtoqism_recent_searches', JSON.stringify(updated));

    onClose();
    navigate(`/catalog?q=${encodeURIComponent(term)}`);
  };

  const handleClearRecent = () => {
    setRecent([]);
    localStorage.removeItem('avtoqism_recent_searches');
  };

  return (
    <div className="search-overlay">
      <div className="search-overlay-header">
        <button type="button" className="search-back-btn" onClick={onClose} aria-label="Orqaga">
          <ArrowLeft size={22} />
        </button>
        <form
          className="search-overlay-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
        >
          <Search size={18} className="search-overlay-icon" />
          <input
            ref={inputRef}
            type="search"
            className="search-overlay-input"
            placeholder="Qidiruv... (masalan: tormoz)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setQuery('')}
              aria-label="Tozalash"
            >
              <X size={18} />
            </button>
          )}
        </form>
        <button
          type="button"
          className="search-action-btn"
          onClick={() => handleSearch(query)}
        >
          Topish
        </button>
      </div>

      <div className="search-overlay-body">
        {recent.length > 0 && (
          <div className="search-section">
            <div className="search-section-head">
              <span className="search-section-title">
                <Clock size={16} /> Oxirgi qidiruvlar
              </span>
              <button type="button" className="search-clear-all" onClick={handleClearRecent}>
                Tozalash
              </button>
            </div>
            <div className="search-chips-wrap">
              {recent.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="search-chip"
                  onClick={() => handleSearch(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="search-section">
          <div className="search-section-head">
            <span className="search-section-title">
              <TrendingUp size={16} /> Ommabop qidiruvlar
            </span>
          </div>
          <div className="search-chips-wrap">
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="search-chip popular"
                onClick={() => handleSearch(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
