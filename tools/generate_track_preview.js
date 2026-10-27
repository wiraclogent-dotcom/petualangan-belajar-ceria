import fs from 'fs';
import { getTrackPieceSVG } from '../src/games/creative/trackSvgHelper.js';

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #1e293b; color: white; font-family: sans-serif; display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; justify-content: center; }
    .card { background: white; padding: 15px; border-radius: 16px; display: flex; flex-direction: column; align-items: center; color: black; box-shadow: 0 8px 0 #94a3b8; }
    h3 { margin: 0 0 10px 0; font-size: 1.2rem; }
  </style>
</head>
<body>
  ${['I', 'L', 'C', 'S', 'T', 'U', 'X', 'H'].map(l => `
    <div class="card">
      <h3>Kepingan ${l}</h3>
      ${getTrackPieceSVG(l, { width: 140, height: 140, isSilhouette: false })}
      <div style="margin-top: 10px;">Siluet:</div>
      ${getTrackPieceSVG(l, { width: 140, height: 140, isSilhouette: true })}
    </div>
  `).join('')}
</body>
</html>
`;

fs.writeFileSync('preview_tracks.html', html);
console.log('preview_tracks.html created');
