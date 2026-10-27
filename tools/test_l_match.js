import fs from 'fs';

// Shared Style Constants
const WOOD_GRAD = `
  <linearGradient id="unifWood" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#fed7aa"/>
    <stop offset="50%" stop-color="#f59e0b"/>
    <stop offset="100%" stop-color="#c2410c"/>
  </linearGradient>
`;

function renderTrack(d, isSilhouette = false) {
  if (isSilhouette) {
    return `
      <path d="${d}" fill="none" stroke="#f59e0b" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="8 6"/>
      <path d="${d}" fill="none" stroke="#7c2d12" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 8"/>
    `;
  }
  return `
    <!-- 1. Wood Bed -->
    <path d="${d}" fill="none" stroke="#7c2d12" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="url(#unifWood)" stroke-width="42" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- 2. Ties -->
    <path d="${d}" fill="none" stroke="#451a03" stroke-width="32" stroke-dasharray="5 15" stroke-linecap="butt" stroke-linejoin="round"/>
    <!-- 3. Steel Rails (Twin) -->
    <path d="${d}" fill="none" stroke="#334155" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="url(#unifWood)" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- 4. Metallic Gleam -->
    <path d="${d}" fill="none" stroke="#ffffff" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity="0.65"/>
    <path d="${d}" fill="none" stroke="url(#unifWood)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  `;
}

// Check Level 2 (L):
// Arena Socket vs Card 2 (L)
const cardL = `
<svg width="150" height="150" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
  <defs>${WOOD_GRAD}</defs>
  <!-- Card L: from top-left (45, 20) down to (45, 92) turning right to (122, 116) -->
  ${renderTrack('M 45 20 L 45 92 Q 45 116 68 116 L 122 116')}
  <circle cx="45" cy="16" r="8.5" fill="url(#unifWood)" stroke="#7c2d12" stroke-width="2.5"/>
  <circle cx="126" cy="116" r="8.5" fill="#451a03" stroke="#7c2d12" stroke-width="2"/>
</svg>
`;

// Arena L: enters at top (280, 140), goes down to y=235, turns right to (430, 280)
const arenaL = `
<svg width="400" height="250" viewBox="200 100 400 250" xmlns="http://www.w3.org/2000/svg">
  <defs>${WOOD_GRAD}</defs>
  <rect x="200" y="100" width="400" height="250" fill="#dcfce7"/>
  <!-- Lead-in from top -->
  ${renderTrack('M 280 100 L 280 140')}
  <!-- Socket -->
  <rect x="235" y="140" width="180" height="170" rx="20" fill="rgba(254, 243, 199, 0.45)" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8 6"/>
  ${renderTrack('M 280 140 L 280 235 Q 280 280 325 280 L 415 280', true)}
  <!-- Lead-out to right -->
  ${renderTrack('M 415 280 L 600 280')}
</svg>
`;

fs.writeFileSync('preview_l_match.html', `
<!DOCTYPE html>
<html>
<body style="background:#0f172a; display:flex; gap:30px; padding:30px; align-items:center;">
  <div style="background:white; padding:10px; border-radius:20px;">
    <h3>Card Shape (L)</h3>
    ${cardL}
  </div>
  <div style="background:white; padding:10px; border-radius:20px;">
    <h3>Arena Gap Shape (L)</h3>
    ${arenaL}
  </div>
</body>
</html>
`);

console.log('preview_l_match.html written successfully!');
