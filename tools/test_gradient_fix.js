import fs from 'fs';

function renderPieceClean(letter) {
  let paths = [];
  let malePegs = [];
  let femaleHoles = [];
  let decor = '';

  switch (letter) {
    case 'I': {
      paths.push('M 70 18 L 70 122');
      malePegs.push({ x: 70, y: 14 });
      femaleHoles.push({ x: 70, y: 126 });
      break;
    }
    case 'L': {
      paths.push('M 45 20 L 45 92 Q 45 116 68 116 L 122 116');
      malePegs.push({ x: 45, y: 16 });
      femaleHoles.push({ x: 126, y: 116 });
      break;
    }
    case 'C': {
      paths.push('M 102 24 A 46 46 0 0 0 102 116');
      malePegs.push({ x: 104, y: 24 });
      femaleHoles.push({ x: 104, y: 116 });
      break;
    }
    case 'S': {
      paths.push('M 102 24 C 40 10, 36 60, 70 70 C 104 80, 100 130, 38 116');
      malePegs.push({ x: 104, y: 24 });
      femaleHoles.push({ x: 36, y: 116 });
      break;
    }
    case 'T': {
      paths.push('M 20 34 L 120 34');
      paths.push('M 70 34 L 70 122');
      malePegs.push({ x: 18, y: 34 });
      malePegs.push({ x: 122, y: 34 });
      femaleHoles.push({ x: 70, y: 124 });
      decor = `
        <circle cx="70" cy="34" r="6.5" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
        <circle cx="70" cy="34" r="3" fill="#fef08a"/>
      `;
      break;
    }
    case 'U': {
      paths.push('M 42 22 L 42 76 A 28 28 0 0 0 98 76 L 98 22');
      femaleHoles.push({ x: 42, y: 19 });
      malePegs.push({ x: 98, y: 19 });
      break;
    }
    case 'X': {
      paths.push('M 26 26 L 114 114');
      paths.push('M 114 26 L 26 114');
      malePegs.push({ x: 24, y: 24 });
      malePegs.push({ x: 116, y: 24 });
      femaleHoles.push({ x: 24, y: 116 });
      femaleHoles.push({ x: 116, y: 116 });
      decor = `
        <rect x="58" y="58" width="24" height="24" rx="5" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
        <circle cx="70" cy="70" r="4.5" fill="#f8fafc"/>
      `;
      break;
    }
    case 'H': {
      paths.push('M 40 18 L 40 122');
      paths.push('M 100 18 L 100 122');
      paths.push('M 40 70 L 100 70');
      malePegs.push({ x: 40, y: 15 });
      malePegs.push({ x: 100, y: 15 });
      femaleHoles.push({ x: 40, y: 125 });
      femaleHoles.push({ x: 100, y: 125 });
      break;
    }
  }

  return `
    <svg width="130" height="130" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- userSpaceOnUse ensures the gradient works equally on horizontal, vertical, and curved paths! -->
        <linearGradient id="cardGrad_${letter}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="140" y2="140">
          <stop offset="0%" stop-color="#fed7aa"/>
          <stop offset="45%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#c2410c"/>
        </linearGradient>
      </defs>

      <!-- 1. Wood Roadbed Base -->
      ${paths.map(p => `
        <path d="${p}" fill="none" stroke="#7c2d12" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${p}" fill="none" stroke="url(#cardGrad_${letter})" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
      `).join('')}

      <!-- Jigsaw Male Pegs & Female Holes -->
      ${malePegs.map(m => `
        <circle cx="${m.x}" cy="${m.y}" r="8" fill="url(#cardGrad_${letter})" stroke="#7c2d12" stroke-width="2.5" />
      `).join('')}
      ${femaleHoles.map(h => `
        <circle cx="${h.x}" cy="${h.y}" r="8" fill="#451a03" stroke="#7c2d12" stroke-width="2" />
      `).join('')}

      <!-- 2. Sleepers / Ties (Uniform walnut ties) -->
      ${paths.map(p => `
        <path d="${p}" fill="none" stroke="#451a03" stroke-width="30" stroke-dasharray="5 15" stroke-linecap="butt" stroke-linejoin="round" opacity="0.6"/>
      `).join('')}

      <!-- 3. Dual Steel Rails (Base Dark Steel) -->
      ${paths.map(p => `
        <path d="${p}" fill="none" stroke="#334155" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Center Wood Inset matches exact base gradient so middle is hollowed seamlessly -->
        <path d="${p}" fill="none" stroke="url(#cardGrad_${letter})" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      `).join('')}

      <!-- 4. Metallic Gleam Highlight -->
      ${paths.map(p => `
        <path d="${p}" fill="none" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" opacity="0.65"/>
        <path d="${p}" fill="none" stroke="url(#cardGrad_${letter})" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      `).join('')}

      ${decor}
    </svg>
  `;
}

const letters = ['I', 'L', 'C', 'S', 'T', 'U', 'X', 'H'];
const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0f172a; font-family: sans-serif; display: flex; flex-wrap: wrap; gap: 20px; padding: 24px; justify-content: center; }
  .card { width: 150px; height: 150px; background: white; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; box-shadow: 0 8px 16px rgba(0,0,0,0.3); }
  .title { position: absolute; top: 8px; left: 12px; font-weight: 900; font-size: 1.1rem; color: #0284c7; }
</style>
</head>
<body>
  ${letters.map(l => `
    <div class="card">
      <span class="title">${l}</span>
      ${renderPieceClean(l)}
    </div>
  `).join('')}
</body>
</html>
`;

fs.writeFileSync('test_gradient_fix.html', html);
console.log('test_gradient_fix.html written!');
