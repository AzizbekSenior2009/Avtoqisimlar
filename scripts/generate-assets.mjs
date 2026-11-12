// Script to generate high quality SVG assets for brands, products, hero and illustrations
import fs from 'fs';
import path from 'path';

// Brand logos
const brands = {
  'chevrolet.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" fill="none">
    <path d="M12 14h24V6h28v8h24l-4 12H60v8H32v-8H8l4-12z" fill="#D4AF37" stroke="#B8860B" stroke-width="1.5"/>
    <path d="M14 15h23V8h26v7h23l-3 10H61v8H34v-8H11l3-10z" fill="url(#goldGrad)"/>
    <defs>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FCD34D"/>
        <stop offset="50%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>
    </defs>
  </svg>`,

  'kia.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" fill="none">
    <path d="M15 8v24h6V22l9 10h8l-11-12.5L37 8h-7.5l-8.5 10.5V8H15zm26 0v24h6V8h-6zm17 0l-9 24h6.5l2.2-6.5h8.6L48.5 8H58zm-7 12.5L54 11l3 9.5h-6z" fill="#111827"/>
  </svg>`,

  'hyundai.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" fill="none">
    <ellipse cx="50" cy="20" rx="36" ry="16" stroke="#002C6C" stroke-width="4" fill="none"/>
    <path d="M35 12h8l5 16h-7l-6-16zm22 0h8l-6 16h-7l5-16z" fill="#002C6C"/>
    <path d="M40 19h20v4H40z" fill="#002C6C"/>
  </svg>`,

  'daewoo.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" fill="none">
    <ellipse cx="50" cy="20" rx="14" ry="14" stroke="#0B4B8A" stroke-width="3" fill="none"/>
    <path d="M22 17c9-4 17-4 22 2-6 3-14 3-22-2zm56 0c-9-4-17-4-22 2 6 3 14 3 22-2z" fill="#0B4B8A"/>
    <path d="M50 10v18" stroke="#0B4B8A" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  'lada.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" fill="none">
    <ellipse cx="50" cy="20" rx="30" ry="16" stroke="#C51829" stroke-width="3" fill="none"/>
    <path d="M42 27c0-10 12-14 16-14-3 5-3 10-2 14h-14zm14 0c2-5 6-8 10-9-3 3-5 6-5 9h-5z" fill="#C51829"/>
  </svg>`,

  'toyota.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" fill="none">
    <ellipse cx="50" cy="20" rx="34" ry="16" stroke="#E60012" stroke-width="3.5" fill="none"/>
    <ellipse cx="50" cy="18" rx="20" ry="8" stroke="#E60012" stroke-width="3.5" fill="none"/>
    <ellipse cx="50" cy="21" rx="8" ry="14" stroke="#E60012" stroke-width="3.5" fill="none"/>
  </svg>`,

  'spark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" fill="none">
    <path d="M20 20h14l4-8 12 16 6-8h24" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="50" cy="20" r="4" fill="#F97316"/>
  </svg>`,

  'tracker.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" fill="none">
    <path d="M15 16h14V9h16v7h14l-2 8H47v6H31v-6H13l2-8z" fill="#D4AF37"/>
    <rect x="62" y="16" width="22" height="8" rx="2" fill="#1D4ED8"/>
  </svg>`,

  'nexia.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" fill="none">
    <path d="M15 12h12l18 16h-12L15 12zm28 0h12l18 16h-12L43 12z" fill="#0B4B8A"/>
    <circle cx="82" cy="20" r="5" fill="#F97316"/>
  </svg>`,

  'lacetti.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" fill="none">
    <path d="M15 24l15-12h18L33 24H15zm32 0l15-12h18L65 24H47z" fill="#0B1F46"/>
    <circle cx="85" cy="18" r="4" fill="#16A34A"/>
  </svg>`
};

fs.mkdirSync('public/images/brands', { recursive: true });
for (const [name, content] of Object.entries(brands)) {
  fs.writeFileSync(path.join('public/images/brands', name), content.trim());
}

// Product illustrations generator
const productTemplates = {
  'tormoz-disk': (num) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
    <defs>
      <radialGradient id="discGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#4B5563"/>
        <stop offset="60%" stop-color="#9CA3AF"/>
        <stop offset="85%" stop-color="#D1D5DB"/>
        <stop offset="100%" stop-color="#6B7280"/>
      </radialGradient>
      <linearGradient id="caliper" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#DC2626"/>
        <stop offset="100%" stop-color="#991B1B"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="#F8FAFC"/>
    <circle cx="180" cy="150" r="105" fill="url(#discGrad)" stroke="#374151" stroke-width="4"/>
    <circle cx="180" cy="150" r="75" stroke="#4B5563" stroke-width="3" stroke-dasharray="8 12"/>
    <circle cx="180" cy="150" r="55" stroke="#4B5563" stroke-width="2" stroke-dasharray="6 10"/>
    <circle cx="180" cy="150" r="38" fill="#374151" stroke="#1F2937" stroke-width="3"/>
    <circle cx="180" cy="150" r="18" fill="#111827"/>
    <!-- Lug holes -->
    <circle cx="180" cy="120" r="6" fill="#111827"/>
    <circle cx="208" cy="140" r="6" fill="#111827"/>
    <circle cx="198" cy="172" r="6" fill="#111827"/>
    <circle cx="162" cy="172" r="6" fill="#111827"/>
    <circle cx="152" cy="140" r="6" fill="#111827"/>
    <!-- Brake caliper -->
    <path d="M220 70c25 0 55 20 65 55l10 50c-15 10-35 5-45-10l-15-40c-5-15-10-35-15-55z" fill="url(#caliper)"/>
    <rect x="250" y="110" width="40" height="20" rx="4" fill="#B91C1C"/>
    <text x="270" y="125" fill="#FFF" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">BREMBO</text>
  </svg>`,

  'akum-bosch': (num) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
    <rect width="400" height="300" fill="#F8FAFC"/>
    <!-- Battery body -->
    <rect x="80" y="80" width="240" height="150" rx="8" fill="#1E293B" stroke="#0F172A" stroke-width="3"/>
    <!-- Top cover -->
    <rect x="75" y="70" width="250" height="25" rx="4" fill="#0284C7"/>
    <!-- Terminals -->
    <rect x="110" y="55" width="20" height="15" rx="2" fill="#94A3B8"/>
    <circle cx="120" cy="52" r="7" fill="#DC2626"/>
    <text x="120" y="56" fill="#FFF" font-size="12" font-weight="bold" text-anchor="middle">+</text>

    <rect x="270" y="55" width="20" height="15" rx="2" fill="#94A3B8"/>
    <circle cx="280" cy="52" r="7" fill="#0284C7"/>
    <text x="280" y="56" fill="#FFF" font-size="12" font-weight="bold" text-anchor="middle">-</text>

    <!-- Handle -->
    <path d="M130 70v-25h140v25" stroke="#E2E8F0" stroke-width="6" stroke-linecap="round" fill="none"/>
    
    <!-- Bosch Label -->
    <rect x="100" y="110" width="200" height="90" rx="4" fill="#0F172A"/>
    <rect x="105" y="115" width="190" height="35" fill="#FFF"/>
    <text x="200" y="140" fill="#DC2626" font-size="28" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="3">BOSCH</text>
    <text x="200" y="170" fill="#38BDF8" font-size="18" font-family="sans-serif" font-weight="bold" text-anchor="middle">S4 008 • 74Ah 680A</text>
    <text x="200" y="188" fill="#94A3B8" font-size="11" font-family="sans-serif" text-anchor="middle">12V Silver Technology</text>
  </svg>`,

  'amortizator': (num) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
    <rect width="400" height="300" fill="#F8FAFC"/>
    <!-- Twin shock absorbers diagonally -->
    <g transform="rotate(-30 200 150)">
      <!-- First shock -->
      <rect x="100" y="120" width="200" height="24" rx="4" fill="#1E293B"/>
      <rect x="60" y="126" width="40" height="12" fill="#94A3B8"/>
      <circle cx="50" cy="132" r="14" fill="#334155" stroke="#94A3B8" stroke-width="4"/>
      <circle cx="310" cy="132" r="14" fill="#334155" stroke="#94A3B8" stroke-width="4"/>
      <rect x="120" y="116" width="30" height="32" rx="2" fill="#0284C7"/>

      <!-- Second shock -->
      <rect x="110" y="160" width="200" height="24" rx="4" fill="#1E293B"/>
      <rect x="70" y="166" width="40" height="12" fill="#94A3B8"/>
      <circle cx="60" cy="172" r="14" fill="#334155" stroke="#94A3B8" stroke-width="4"/>
      <circle cx="320" cy="172" r="14" fill="#334155" stroke="#94A3B8" stroke-width="4"/>
      <rect x="130" y="156" width="30" height="32" rx="2" fill="#0284C7"/>
    </g>
  </svg>`,

  'shell-moy': (num) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
    <rect width="400" height="300" fill="#F8FAFC"/>
    <!-- Shell Canister -->
    <path d="M140 85h50v-20h30v20h40l20 30v130c0 10-10 15-20 15H140c-10 0-20-5-20-15V115l20-30z" fill="#0284C7" stroke="#0369A1" stroke-width="3"/>
    <!-- Handle cutout -->
    <path d="M145 110h30v70h-30z" rx="8" fill="#F8FAFC"/>
    <!-- Yellow shell logo area -->
    <rect x="185" y="110" width="85" height="120" rx="6" fill="#FACC15"/>
    <circle cx="227" cy="140" r="18" fill="#DC2626"/>
    <path d="M217 142c3-10 17-10 20 0-3 3-7 4-10 4s-7-1-10-4z" fill="#FACC15"/>
    <text x="227" y="175" fill="#1E293B" font-size="14" font-family="sans-serif" font-weight="900" text-anchor="middle">HELIX</text>
    <text x="227" y="195" fill="#DC2626" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">Ultra 5W-40</text>
    <text x="227" y="215" fill="#1E293B" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">PurePlus 4L</text>
    <!-- Cap -->
    <rect x="190" y="50" width="30" height="16" rx="2" fill="#DC2626"/>
  </svg>`,

  'moy-filtr': (num) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
    <rect width="400" height="300" fill="#F8FAFC"/>
    <!-- Oil filter cylinder -->
    <rect x="140" y="70" width="120" height="160" rx="16" fill="#1E293B" stroke="#0F172A" stroke-width="4"/>
    <ellipse cx="200" cy="70" rx="60" ry="16" fill="#334155" stroke="#0F172A" stroke-width="3"/>
    <circle cx="200" cy="70" r="22" fill="#1E293B" stroke="#94A3B8" stroke-width="3"/>
    <circle cx="200" cy="70" r="10" fill="#0F172A"/>
    <!-- Small holes -->
    <circle cx="180" cy="65" r="3" fill="#94A3B8"/>
    <circle cx="220" cy="65" r="3" fill="#94A3B8"/>
    <circle cx="180" cy="75" r="3" fill="#94A3B8"/>
    <circle cx="220" cy="75" r="3" fill="#94A3B8"/>
    <!-- Print on filter -->
    <rect x="150" y="120" width="100" height="40" rx="4" fill="#0284C7"/>
    <text x="200" y="145" fill="#FFF" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">MANN-FILTER</text>
    <text x="200" y="180" fill="#94A3B8" font-size="15" font-family="sans-serif" font-weight="bold" text-anchor="middle">W 67/1</text>
  </svg>`,

  'radiator': (num) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
    <rect width="400" height="300" fill="#F8FAFC"/>
    <!-- Radiator frame -->
    <rect x="60" y="60" width="280" height="180" rx="8" fill="#1E293B" stroke="#334155" stroke-width="4"/>
    <!-- Mesh ribs -->
    <rect x="75" y="75" width="250" height="150" fill="#475569"/>
    <path d="M75 90h250 M75 105h250 M75 120h250 M75 135h250 M75 150h250 M75 165h250 M75 180h250 M75 195h250 M75 210h250" stroke="#94A3B8" stroke-width="2"/>
    <path d="M100 75v150 M130 75v150 M160 75v150 M190 75v150 M220 75v150 M250 75v150 M280 75v150 M310 75v150" stroke="#64748B" stroke-width="1.5"/>
    <!-- Inlets -->
    <rect x="40" y="90" width="20" height="24" rx="4" fill="#0284C7"/>
    <rect x="340" y="180" width="20" height="24" rx="4" fill="#0284C7"/>
  </svg>`,

  'generator': (num) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
    <rect width="400" height="300" fill="#F8FAFC"/>
    <!-- Alternator housing -->
    <circle cx="200" cy="150" r="75" fill="#64748B" stroke="#334155" stroke-width="5"/>
    <circle cx="200" cy="150" r="50" fill="#94A3B8"/>
    <!-- Copper coils inside slots -->
    <circle cx="200" cy="150" r="38" fill="#B45309" stroke="#78350F" stroke-width="4"/>
    <!-- Pulley wheel in front -->
    <circle cx="200" cy="150" r="24" fill="#1E293B" stroke="#0F172A" stroke-width="4"/>
    <circle cx="200" cy="150" r="8" fill="#E2E8F0"/>
    <!-- Mounting brackets -->
    <rect x="110" y="80" width="30" height="20" rx="4" fill="#475569"/>
    <rect x="260" y="80" width="30" height="20" rx="4" fill="#475569"/>
    <rect x="185" y="225" width="30" height="25" rx="4" fill="#475569"/>
  </svg>`,

  'default': (name) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none">
    <rect width="400" height="300" fill="#F8FAFC"/>
    <rect x="60" y="40" width="280" height="220" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <circle cx="200" cy="130" r="55" fill="#EFF6FF"/>
    <path d="M175 150l20-40h10l20 40h-10l-4-9h-22l-4 9h-10zm18-18h14l-7-16-7 16z" fill="#1D4ED8"/>
    <path d="M170 165c0-5 25-10 60-10s60 5 60 10v20c0 5-25 10-60 10s-60-5-60-10v-20z" fill="#0B1F46" opacity="0.1"/>
    <text x="200" y="225" fill="#1E293B" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">${name.replace(/[-_]/g, ' ').toUpperCase()}</text>
    <text x="200" y="245" fill="#64748B" font-size="12" font-family="sans-serif" text-anchor="middle">Original AvtoQism</text>
  </svg>`
};

// Generate product images
const productImages = [
  'tormoz-disk-1.jpg', 'tormoz-disk-2.jpg',
  'akum-bosch-1.jpg', 'akum-bosch-2.jpg',
  'amortizator-1.jpg',
  'shell-moy-1.jpg', 'shell-moy-2.jpg',
  'moy-filtr-1.jpg',
  'radiator-1.jpg', 'radiator-2.jpg',
  'generator-1.jpg',
  'kolodka-1.jpg', 'kolodka-2.jpg',
  'starter-1.jpg', 'svecha-1.jpg', 'havo-filtr-1.jpg', 'prujina-1.jpg',
  'panjara-1.jpg', 'fara-spark-1.jpg', 'fara-spark-2.jpg', 'antifrize-1.jpg',
  'shina-bridgestone-1.jpg', 'rul-orash-1.jpg', 'grm-cobalt-1.jpg', 'grm-cobalt-2.jpg',
  'pompa-1.jpg', 'bamper-cobalt-1.jpg', 'tormoz-silindr-1.jpg', 'yoqilgi-filtr-1.jpg',
  'sharovaya-1.jpg', 'oyna-kotaruvchi-1.jpg', 'katushka-1.jpg', 'atf-moy-1.jpg',
  'shina-kumho-1.jpg', 'registrator-1.jpg', 'registrator-2.jpg', 'kovrik-1.jpg',
  'styajka-1.jpg', 'shrus-1.jpg', 'kozgu-1.jpg', 'tormoz-shlang-1.jpg',
  'remen-grm-1.jpg', 'remen-grm-2.jpg', 'salon-filtr-1.jpg', 'tuman-fara-1.jpg',
  'tormoz-suyuqlik-1.jpg', 'led-h7-1.jpg', 'disk-kia-1.jpg', 'termostat-1.jpg',
  'saylentblok-1.jpg', 'kompressor-1.jpg', 'shlang-radiator-1.jpg', 'vesta-bamper-1.jpg',
  'toyota-filtr-1.jpg', 'hyundai-kolodka-1.jpg', 'viatti-shina-1.jpg', 'yostiq-1.jpg',
  'kia-filtr-1.jpg', 'tracker-disk-1.jpg'
];

fs.mkdirSync('public/images/products', { recursive: true });

for (const img of productImages) {
  let content = '';
  const key = img.replace(/-\d+\.jpg$/, '');
  if (productTemplates[key]) {
    content = productTemplates[key](img);
  } else {
    content = productTemplates['default'](key);
  }
  
  // Also write .svg variant
  const svgName = img.replace(/\.jpg$/, '.svg');
  fs.writeFileSync(path.join('public/images/products', svgName), content.trim());
  fs.writeFileSync(path.join('public/images/products', img), content.trim());
}

// Placeholder
fs.writeFileSync('public/images/products/placeholder.svg', productTemplates['default']('AVTOQISM').trim());

// Hero banner composition
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 400" fill="none">
  <defs>
    <radialGradient id="glow" cx="70%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#1D4ED8" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="carBody" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="70%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
  </defs>
  <rect width="700" height="400" fill="transparent"/>
  <circle cx="480" cy="200" r="180" fill="url(#glow)"/>

  <!-- White Chevrolet Sedan Composition -->
  <g transform="translate(180, 40) scale(0.95)">
    <!-- Shadow under car -->
    <ellipse cx="260" cy="260" rx="220" ry="24" fill="#030712" opacity="0.35"/>
    
    <!-- Car body side-front view -->
    <path d="M70 200c10-25 40-45 80-50l80-35c40-18 90-20 140-10l70 40c40 10 60 25 70 55l-20 30c-10 10-40 15-80 15H120c-30 0-45-15-50-45z" fill="url(#carBody)" stroke="#94A3B8" stroke-width="2"/>
    <!-- Cabin & Windshield -->
    <path d="M165 145l65-30c35-15 75-15 110-5l55 35-15 45H155l10-45z" fill="#0F172A" stroke="#334155" stroke-width="2"/>
    <path d="M245 118l-15 32h120l-40-30c-20-4-45-5-65-2z" fill="#1E293B" opacity="0.8"/>
    <!-- Headlights -->
    <path d="M470 190l30 5-15 15-25-2z" fill="#FDE047" stroke="#EAB308" stroke-width="1.5"/>
    <!-- Grille & Bowtie -->
    <rect x="440" y="200" width="40" height="18" rx="3" fill="#1E293B"/>
    <path d="M455 206h12v-3h8v3h12l-2 4h-10v3h-8v-3h-10l-2-4z" fill="#F59E0B"/>
    
    <!-- Wheels -->
    <!-- Front wheel -->
    <circle cx="410" cy="245" r="42" fill="#0F172A"/>
    <circle cx="410" cy="245" r="28" fill="#64748B" stroke="#CBD5E1" stroke-width="4"/>
    <circle cx="410" cy="245" r="12" fill="#1E293B"/>
    <!-- Rear wheel -->
    <circle cx="160" cy="245" r="42" fill="#0F172A"/>
    <circle cx="160" cy="245" r="28" fill="#64748B" stroke="#CBD5E1" stroke-width="4"/>
    <circle cx="160" cy="245" r="12" fill="#1E293B"/>
  </g>

  <!-- Auto parts in foreground (Brake disc, oil canister, oil filter, spark plugs) -->
  <g transform="translate(10, 100)">
    <!-- Brake disc in front left -->
    <g transform="translate(80, 60) scale(0.65)">
      <circle cx="180" cy="150" r="105" fill="#64748B" stroke="#1F2937" stroke-width="5"/>
      <circle cx="180" cy="150" r="75" stroke="#475569" stroke-width="4" stroke-dasharray="10 12"/>
      <circle cx="180" cy="150" r="38" fill="#1E293B"/>
      <circle cx="180" cy="150" r="15" fill="#0F172A"/>
      <!-- holes -->
      <circle cx="180" cy="120" r="6" fill="#0F172A"/>
      <circle cx="210" cy="150" r="6" fill="#0F172A"/>
      <circle cx="180" cy="180" r="6" fill="#0F172A"/>
      <circle cx="150" cy="150" r="6" fill="#0F172A"/>
    </g>

    <!-- Motor Oil Canister -->
    <g transform="translate(180, 20) scale(0.6)">
      <path d="M140 85h50v-20h30v20h40l20 30v130c0 10-10 15-20 15H140c-10 0-20-5-20-15V115l20-30z" fill="#0284C7" stroke="#0369A1" stroke-width="3"/>
      <rect x="185" y="110" width="85" height="110" rx="6" fill="#FACC15"/>
      <text x="227" y="150" fill="#DC2626" font-size="20" font-weight="900" text-anchor="middle">HELIX</text>
      <text x="227" y="180" fill="#1E293B" font-size="16" font-weight="bold" text-anchor="middle">5W-40</text>
      <rect x="190" y="50" width="30" height="16" rx="2" fill="#DC2626"/>
    </g>

    <!-- Oil filter -->
    <g transform="translate(250, 90) scale(0.5)">
      <rect x="140" y="70" width="110" height="150" rx="14" fill="#F59E0B" stroke="#B45309" stroke-width="4"/>
      <path d="M140 100h110 M140 130h110 M140 160h110 M140 190h110" stroke="#78350F" stroke-width="2"/>
    </g>

    <!-- Spark Plugs lying down -->
    <g transform="translate(230, 190) scale(0.4) rotate(15)">
      <rect x="50" y="140" width="120" height="20" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="3"/>
      <rect x="170" y="135" width="40" height="30" fill="#94A3B8"/>
      <rect x="210" y="142" width="50" height="16" fill="#B45309"/>
      <rect x="260" y="146" width="20" height="8" fill="#E2E8F0"/>
    </g>
  </g>
</svg>`;

fs.mkdirSync('public/images/hero', { recursive: true });
fs.writeFileSync('public/images/hero/hero-car-parts.svg', heroSvg.trim());

// Why Us blue car + shield illustration
const whyUsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" fill="none">
  <!-- Blue car front-side view -->
  <g transform="translate(20, 40) scale(0.65)">
    <!-- Shadow -->
    <ellipse cx="180" cy="190" rx="160" ry="18" fill="#0284C7" opacity="0.25"/>
    <!-- Car body -->
    <path d="M40 140c10-25 40-45 80-50l60-25c30-12 70-12 100-2l50 27c30 10 45 25 50 50l-10 25H60l-20-25z" fill="#2563EB" stroke="#1D4ED8" stroke-width="3"/>
    <!-- Windshield -->
    <path d="M120 95l55-22c25-10 55-10 80 0l40 22-10 35H110l10-35z" fill="#93C5FD" opacity="0.9"/>
    <!-- Wheels -->
    <circle cx="100" cy="170" r="32" fill="#1E293B"/>
    <circle cx="100" cy="170" r="18" fill="#94A3B8"/>
    <circle cx="280" cy="170" r="32" fill="#1E293B"/>
    <circle cx="280" cy="170" r="18" fill="#94A3B8"/>
    <!-- Headlights -->
    <circle cx="320" cy="135" r="10" fill="#FEF08A"/>
  </g>

  <!-- Big blue shield with white checkmark at right -->
  <g transform="translate(190, 60)">
    <path d="M40 0C60 0 80 15 80 35c0 40-30 65-40 75C30 100 0 75 0 35 0 15 20 0 40 0z" fill="#0284C7"/>
    <path d="M40 5C57 5 74 18 74 36c0 36-26 58-34 67-8-9-34-31-34-67 0-18 17-31 34-31z" fill="#2563EB"/>
    <path d="M26 38l10 10 20-20" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

fs.writeFileSync('public/images/why-us-car.svg', whyUsSvg.trim());

console.log('All SVG assets generated successfully!');
