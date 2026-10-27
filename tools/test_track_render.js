import fs from 'fs';

const svg = `
<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f5d0a9"/>
      <stop offset="50%" stop-color="#dfa067"/>
      <stop offset="100%" stop-color="#c67d3b"/>
    </linearGradient>
  </defs>

  <rect width="600" height="200" fill="#a7f3d0"/>

  <g id="track-demo">
    <!-- 1. Wooden Roadbed Base -->
    <path d="M 50 100 Q 200 20 350 100 T 550 100" 
          fill="none" stroke="#92400e" stroke-width="54" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 50 100 Q 200 20 350 100 T 550 100" 
          fill="none" stroke="url(#woodGrad)" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- 2. Wooden Sleepers (Ties) -->
    <path d="M 50 100 Q 200 20 350 100 T 550 100" 
          fill="none" stroke="#78350f" stroke-width="38" stroke-dasharray="6 18" stroke-linecap="butt"/>

    <!-- 3. Dual Steel Rails (Base silver) -->
    <path d="M 50 100 Q 200 20 350 100 T 550 100" 
          fill="none" stroke="#475569" stroke-width="28" stroke-linecap="round"/>

    <!-- 4. Inner Wood Center (Hollows out the middle) -->
    <path d="M 50 100 Q 200 20 350 100 T 550 100" 
          fill="none" stroke="url(#woodGrad)" stroke-width="18" stroke-linecap="round"/>

    <!-- 5. Rail Gleams (Metallic reflection) -->
    <path d="M 50 100 Q 200 20 350 100 T 550 100" 
          fill="none" stroke="#ffffff" stroke-width="26" stroke-linecap="round" opacity="0.6"/>
    <path d="M 50 100 Q 200 20 350 100 T 550 100" 
          fill="none" stroke="url(#woodGrad)" stroke-width="20" stroke-linecap="round"/>
  </g>
</svg>
`;

fs.writeFileSync('track_test.svg', svg);
console.log('track_test.svg written successfully!');
