import fs from 'fs';
import { getTrackPieceSVG } from '../src/games/creative/trackSvgHelper.js';

const letters = ['I', 'L', 'C', 'S', 'T', 'U', 'X', 'H'];

const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0f172a; font-family: sans-serif; display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; }
  .card { width: 160px; height: 160px; background: white; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }
  .title { position: absolute; top: 8px; left: 12px; font-weight: bold; color: #0369a1; }
</style>
</head>
<body>
  ${letters.map(l => `
    <div class="card">
      <span class="title">${l}</span>
      ${getTrackPieceSVG(l, { width: 130, height: 130 })}
    </div>
  `).join('')}
</body>
</html>
`;

fs.writeFileSync('preview_choices_current.html', html);
console.log('Written preview_choices_current.html');
