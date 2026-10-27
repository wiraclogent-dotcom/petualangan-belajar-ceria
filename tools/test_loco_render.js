import fs from 'fs';

const locoSvg = `
<svg width="200" height="150" viewBox="-60 -50 120 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="boilerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f87171"/>
      <stop offset="50%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
    <linearGradient id="cabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="60%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="60%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
    <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#451a03"/>
    </linearGradient>
  </defs>

  <!-- Drop Shadow -->
  <ellipse cx="0" cy="18" rx="36" ry="7" fill="rgba(0,0,0,0.25)" />

  <!-- 1. Cab (Cabin) -->
  <rect x="-30" y="-28" width="26" height="36" rx="4" fill="url(#cabGrad)" stroke="#0c4a6e" stroke-width="2" />
  <!-- Cab Roof -->
  <path d="M -34 -28 Q -17 -34 0 -28 L -2 -25 L -32 -25 Z" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.5" />
  <!-- Cab Window with friendly driver -->
  <rect x="-24" y="-22" width="14" height="15" rx="3" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />
  <circle cx="-17" cy="-14" r="4.5" fill="#f97316" />
  <circle cx="-17" cy="-18" r="4" fill="#3b82f6" /> <!-- Cap -->

  <!-- 2. Boiler Tank -->
  <rect x="-4" y="-18" width="34" height="26" rx="4" fill="url(#boilerGrad)" stroke="#7f1d1d" stroke-width="2" />
  <!-- Brass Boiler Bands -->
  <line x1="8" y1="-18" x2="8" y2="8" stroke="url(#brassGrad)" stroke-width="2.5" />
  <line x1="20" y1="-18" x2="20" y2="8" stroke="url(#brassGrad)" stroke-width="2.5" />

  <!-- 3. Brass Steam Dome & Whistle -->
  <ellipse cx="10" cy="-21" rx="5" ry="4" fill="url(#brassGrad)" stroke="#a16207" stroke-width="1.2" />
  <rect x="-2" y="-24" width="3" height="7" rx="1.5" fill="url(#brassGrad)" />

  <!-- 4. Smokestack (Funnel) -->
  <path d="M 22 -18 L 20 -28 L 28 -28 L 26 -18 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5" />
  <ellipse cx="24" cy="-28" rx="4.5" ry="2" fill="url(#brassGrad)" />

  <!-- 5. Front Cowcatcher & Smiling Face / Headlight -->
  <path d="M 30 0 L 37 4 L 37 9 L 30 9 Z" fill="#f59e0b" stroke="#b45309" stroke-width="1.5" />
  <circle cx="31" cy="-5" r="5.5" fill="#fef08a" stroke="#eab308" stroke-width="1.5" />
  <circle cx="31" cy="-5" r="3" fill="#ffffff" />
  <!-- Cute Smiling Eye on headlight -->
  <circle cx="32" cy="-5" r="1.5" fill="#1e293b" />

  <!-- 6. Heavy Wooden Wheels -->
  <!-- Back Wheel -->
  <circle cx="-16" cy="11" r="10" fill="url(#wheelGrad)" stroke="#1c1917" stroke-width="2" />
  <circle cx="-16" cy="11" r="5" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5" />
  <circle cx="-16" cy="11" r="2" fill="#0f172a" />

  <!-- Front Wheel -->
  <circle cx="16" cy="11" r="10" fill="url(#wheelGrad)" stroke="#1c1917" stroke-width="2" />
  <circle cx="16" cy="11" r="5" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5" />
  <circle cx="16" cy="11" r="2" fill="#0f172a" />

  <!-- Connecting Side Rod -->
  <line x1="-16" y1="12" x2="16" y2="12" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
  <circle cx="-16" cy="12" r="2" fill="#e2e8f0" />
  <circle cx="16" cy="12" r="2" fill="#e2e8f0" />
</svg>
`;

fs.writeFileSync('loco_test.svg', locoSvg);
console.log('loco_test.svg written successfully!');
