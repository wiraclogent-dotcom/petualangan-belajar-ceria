import { getTrackPieceSVG } from '../src/games/creative/trackSvgHelper.js';

console.log('Testing letter SVG generation:');
['I', 'L', 'C', 'S', 'T', 'U', 'X', 'H'].forEach(letter => {
  const svg = getTrackPieceSVG(letter, { width: 140, height: 140 });
  console.log(`Letter ${letter} length:`, svg.length);
});
