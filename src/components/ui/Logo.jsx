import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AvtoQism Logo Component
 * @param {'default' | 'phone' | 'white'} variant
 */
export default function Logo({ variant = 'default', className = '' }) {
  const isWhite = variant === 'white';
  const isPhone = variant === 'phone';

  const avtoColor = isWhite ? '#FFFFFF' : '#1D4ED8';
  const qismColor = isWhite ? '#F97316' : '#F97316';
  const swooshColor = isWhite ? '#FFFFFF' : '#1D4ED8';

  const width = isPhone ? 130 : 160;
  const height = isPhone ? 34 : 42;

  return (
    <Link
      to="/"
      className={`logo-link ${className}`}
      aria-label="AvtoQism Bosh sahifa"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 160 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dynamic car aerodynamic swoosh */}
        <path
          d="M8 15C18 7 35 4 58 5C70 5.5 85 9 100 13C115 17 130 18 148 15"
          stroke={swooshColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M26 12C40 6 62 4.5 82 7C100 9.2 120 14 136 12"
          stroke={qismColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 2"
          opacity="0.9"
        />
        <circle cx="36" cy="14" r="2.5" fill={qismColor} />
        <circle cx="118" cy="15" r="2.5" fill={swooshColor} />

        {/* Wordmark "Avto" */}
        <text
          x="12"
          y="36"
          fill={avtoColor}
          fontFamily="'Inter', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="-0.5px"
        >
          Avto
        </text>

        {/* Wordmark "Qism" */}
        <text
          x="69"
          y="36"
          fill={qismColor}
          fontFamily="'Inter', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="-0.5px"
        >
          Qism
        </text>
      </svg>
    </Link>
  );
}
