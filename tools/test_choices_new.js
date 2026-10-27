import fs from 'fs';

function renderPiece(letter) {
  let paths = [];
  let malePegs = [];
  let femaleHoles = [];
  let decor = '';

  switch (letter) {
    case 'I': {
      paths.push('M 70 18 L 70 122');
      malePegs.push({ x: 70, y: 15 });
      femaleHoles.push({ x: 70, y: 125 });
      break;
    }

    case 'L': {
      paths.push('M 44 20 L 44 94 Q 44 116 66 116 L 122 116');
      malePegs.push({ x: 44, y: 16 });
      femaleHoles.push({ x: 125, y: 116 });
      break;
    }

    case 'C': {
      paths.push('M 102 24 A 46 46 0 0 0 102 116');
      malePegs.push({ x: 104, y: 24 });
      femaleHoles.push({ x: 104, y: 116 });
      break;
    }

    case 'S': {
      paths.push('M 104 24 C 40 8, 36 62, 70 70 C 104 78, 100 132, 36 116');
      malePegs.push({ x: 106, y: 24 });
      femaleHoles.push({ x: 34, y: 116 });
      break;
    }

    case 'T': {
      // Main top bar & stem
      paths.push('M 20 34 L 120 34');
      paths.push('M 70 34 L 70 122');
      malePegs.push({ x: 18, y: 34 });
      malePegs.push({ x: 122, y: 34 });
      femaleHoles.push({ x: 70, y: 124 });
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
        <rect x="58" y="58" width="24" height="24" rx="5" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
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

  // Generate SVG with uniform layered rendering
  return `
    <svg width="130" height="130" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="woodGrad_${letter}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fde68a"/>
          <stop offset="50%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
      </defs>

      <!-- 1. Wooden Roadbed Base -->
      ${paths.map(p => `
        <path d="${p}" fill="none" stroke="#92400e" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${p}" fill="none" stroke="url(#woodGrad_${letter})" stroke-width="42" stroke-linecap="round" stroke-linejoin="round"/>
      `).join('')}

      <!-- Jigsaw Male Pegs & Female Holes -->
      ${malePegs.map(m => `
        <circle cx="${m.x}" cy="${m.y}" r="8.5" fill="url(#woodGrad_${letter})" stroke="#92400e" stroke-width="2.5" />
      `).join('')}
      ${femaleHoles.map(h => `
        <circle cx="${h.x}" cy="${h.y}" r="8.5" fill="#451a03" stroke="#92400e" stroke-width="2" />
      `).join('')}

      <!-- 2. Sleepers / Ties (Otomatis & Presisi) -->
      ${paths.map(p => `
        <path d="${p}" fill="none" stroke="#78350f" stroke-width="32" stroke-dasharray="5 15" stroke-linecap="butt" stroke-linejoin="round"/>
      `).join('')}

      <!-- 3. Dual Steel Rails (Base Silver) -->
      ${paths.map(p => `
        <path d="${p}" fill="none" stroke="#475569" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Center Wood Inset -->
        <path d="${p}" fill="none" stroke="url(#woodGrad_${letter})" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
      `).join('')}

      <!-- 4. Metallic Gleam -->
      ${paths.map(p => `
        <path d="${p}" fill="none" stroke="#f8fafc" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
        <path d="${p}" fill="none" stroke="url(#woodGrad_${letter})" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
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
      ${renderPiece(l)}
    </div>
  `).join('')}
</body>
</html>
`;

fs.writeFileSync('preview_choices_new.html', html);
console.log('Written preview_choices_new.html');
