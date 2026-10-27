/**
 * trackSvgHelper.js
 * Unified Vector SVG Graphics Generator for Train Track Architect.
 * Guarantees 100% Mathematical & Visual Consistency:
 * 1. Choice cards (1, 2, 3) in the left vertical sidebar
 * 2. Puzzle socket cutout recess & silhouette clue in the arena
 * 3. Permanent railway tracks on the right-side expansive arena (960x540)
 * 4. Placed track piece after selection
 */

// Unified Wooden Railway Theme (Single Source of Truth)
export const TRACK_THEME = {
  woodStops: `
    <stop offset="0%" stop-color="#fed7aa"/>
    <stop offset="45%" stop-color="#f59e0b"/>
    <stop offset="100%" stop-color="#c2410c"/>
  `,
  woodStroke: '#7c2d12',
  sleeperStroke: '#451a03',
  sleeperDash: '4 14',
  steelBase: '#334155',
  steelHighlight: '#ffffff',
  femaleHoleFill: '#3b1803'
};

// Canonical 140x140 Tile Geometries for all 8 Letters
export const CANONICAL_PIECES = {
  'I': {
    paths: ['M 70 18 L 70 122'],
    malePegs: [{ x: 70, y: 15 }],
    femaleHoles: [{ x: 70, y: 125 }]
  },
  'L': {
    paths: ['M 45 18 L 45 82 Q 45 118 82 118 L 122 118'],
    malePegs: [{ x: 45, y: 15 }],
    femaleHoles: [{ x: 125, y: 118 }]
  },
  'C': {
    paths: ['M 112 24 A 48 48 0 0 0 112 116'],
    malePegs: [{ x: 112, y: 24 }],
    femaleHoles: [{ x: 112, y: 116 }]
  },
  'S': {
    paths: ['M 108 24 C 48 10, 26 56, 70 70 C 114 84, 92 130, 32 116'],
    malePegs: [{ x: 108, y: 24 }],
    femaleHoles: [{ x: 32, y: 116 }]
  },
  'T': {
    paths: ['M 20 32 L 120 32', 'M 70 32 L 70 124'],
    malePegs: [],
    femaleHoles: [{ x: 70, y: 124 }]
  },
  'U': {
    paths: ['M 42 20 L 42 74 A 28 28 0 0 0 98 74 L 98 20'],
    malePegs: [{ x: 98, y: 18 }],
    femaleHoles: [{ x: 42, y: 18 }]
  },
  'X': {
    paths: ['M 26 26 L 114 114', 'M 114 26 L 26 114'],
    malePegs: [],
    femaleHoles: []
  },
  'H': {
    paths: ['M 38 18 L 38 122', 'M 102 18 L 102 122', 'M 38 70 L 102 70'],
    malePegs: [{ x: 38, y: 15 }],
    femaleHoles: [{ x: 102, y: 125 }]
  }
};

/**
 * Master Track Renderer with Fused Multi-Path Layering
 * Renders all paths of the same material together to ensure 100% seamless intersections (T, X, H).
 */
export function renderTrackLayers(paths, isSilhouette = false, gradId = 'sharedWoodGrad') {
  if (isSilhouette) {
    return `
      <!-- Recess Base Tone -->
      ${paths.map(p => `<path d="${p}" fill="none" stroke="#fcd34d" stroke-width="42" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"/>`).join('')}
      <!-- Recess Carved Outer Border -->
      ${paths.map(p => `<path d="${p}" fill="none" stroke="#b45309" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 4" opacity="0.5"/>`).join('')}
      <!-- Recess Center Guide Line -->
      ${paths.map(p => `<path d="${p}" fill="none" stroke="#78350f" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 6" opacity="0.6"/>`).join('')}
    `;
  }

  return `
    <!-- Layer 1: Dark Brown Outer Bevel / Wood Stroke (Fused Outline) -->
    ${paths.map(p => `<path d="${p}" fill="none" stroke="${TRACK_THEME.woodStroke}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}

    <!-- Layer 2: Beechwood Honey Surface (Continuous Wood Gradient) -->
    ${paths.map(p => `<path d="${p}" fill="none" stroke="url(#${gradId})" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}

    <!-- Layer 3: Walnut Wooden Sleepers (Ties) -->
    ${paths.map(p => `<path d="${p}" fill="none" stroke="${TRACK_THEME.sleeperStroke}" stroke-width="26" stroke-dasharray="${TRACK_THEME.sleeperDash}" stroke-linecap="butt" stroke-linejoin="round" opacity="0.75"/>`).join('')}

    <!-- Layer 4: Twin Steel Rail Base -->
    ${paths.map(p => `<path d="${p}" fill="none" stroke="${TRACK_THEME.steelBase}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}

    <!-- Layer 5: Wood Center Groove (Separates the Twin Rails) -->
    ${paths.map(p => `<path d="${p}" fill="none" stroke="url(#${gradId})" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}

    <!-- Layer 6: Chrome Silver Rail Highlights -->
    ${paths.map(p => `<path d="${p}" fill="none" stroke="${TRACK_THEME.steelHighlight}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity="0.65"/>`).join('')}
    ${paths.map(p => `<path d="${p}" fill="none" stroke="url(#${gradId})" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
  `;
}

/**
 * 1. Choice Card Wooden Track Piece SVG Generator
 */
export function getTrackPieceSVG(letter, options = {}) {
  const { width = 125, height = 125, isSilhouette = false } = options;
  const piece = CANONICAL_PIECES[letter] || CANONICAL_PIECES['I'];
  const gradId = `cardGrad_${letter}_${Math.floor(Math.random() * 100000)}`;

  return `
    <svg class="track-piece-svg track-letter-${letter}" 
         width="${width}" height="${height}" viewBox="0 0 140 140" style="display: block;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gradId}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="140" y2="140">
          ${TRACK_THEME.woodStops}
        </linearGradient>
      </defs>

      <!-- Seamless Layered Tracks -->
      ${renderTrackLayers(piece.paths, isSilhouette, gradId)}

      <!-- Connector Pegs & Holes -->
      ${!isSilhouette ? (piece.malePegs || []).map(m => `
        <circle cx="${m.x}" cy="${m.y}" r="7" fill="url(#${gradId})" stroke="${TRACK_THEME.woodStroke}" stroke-width="2" />
      `).join('') : ''}
      ${!isSilhouette ? (piece.femaleHoles || []).map(h => `
        <circle cx="${h.x}" cy="${h.y}" r="6.5" fill="${TRACK_THEME.femaleHoleFill}" stroke="${TRACK_THEME.woodStroke}" stroke-width="1.8" />
      `).join('') : ''}
    </svg>
  `;
}

/**
 * 2. Standardized Layout Configurations for All 8 Alphabet Track Setups
 * Expansive 960x540 Stage Arena:
 * Socket centered at gapOrigin: { x: 410, y: 200 }
 */
export const LAYOUT_CONFIGS = {
  'vertical': { // Letter I
    gapOrigin: { x: 410, y: 200 },
    gapBox: { x: 410, y: 200, width: 140, height: 140 },
    motionPath: 'M 480 435 L 480 105',
    leadInTrack: ['M 480 435 L 480 322'],
    gapTrack: ['M 480 322 L 480 218'],
    leadOutTrack: ['M 480 218 L 480 105'],
    startStation: { x: 480, y: 485, name: 'Stasiun Lembah', icon: '🌲' },
    endStation: { x: 480, y: 55, name: 'Kebun Jeruk', icon: '🍊' }
  },

  'corner-bottom-right': { // Letter L
    gapOrigin: { x: 410, y: 200 },
    gapBox: { x: 410, y: 200, width: 140, height: 140 },
    motionPath: 'M 455 105 L 455 282 Q 455 318 492 318 L 720 318',
    leadInTrack: ['M 455 105 L 455 218'],
    gapTrack: ['M 455 218 L 455 282 Q 455 318 492 318 L 532 318'],
    leadOutTrack: ['M 532 318 L 720 318'],
    startStation: { x: 455, y: 55, name: 'Kaki Bukit', icon: '⛰️' },
    endStation: { x: 830, y: 318, name: 'Danau Biru', icon: '⛵' }
  },

  'loop-right': { // Letter C
    gapOrigin: { x: 410, y: 200 },
    gapBox: { x: 410, y: 200, width: 140, height: 140 },
    motionPath: 'M 710 224 L 522 224 A 48 48 0 0 0 522 316 L 710 316',
    leadInTrack: ['M 710 224 L 522 224'],
    gapTrack: ['M 522 224 A 48 48 0 0 0 522 316'],
    leadOutTrack: ['M 522 316 L 710 316'],
    startStation: { x: 825, y: 224, name: 'Dermaga Utara', icon: '⚓' },
    endStation: { x: 825, y: 316, name: 'Teluk Pelangi', icon: '🌈' }
  },

  'snake-diagonal': { // Letter S
    gapOrigin: { x: 410, y: 200 },
    gapBox: { x: 410, y: 200, width: 140, height: 140 },
    motionPath: 'M 710 224 L 518 224 C 458 210, 436 256, 480 270 C 524 284, 502 330, 442 316 L 250 316',
    leadInTrack: ['M 710 224 L 518 224'],
    gapTrack: ['M 518 224 C 458 210, 436 256, 480 270 C 524 284, 502 330, 442 316'],
    leadOutTrack: ['M 442 316 L 250 316'],
    startStation: { x: 825, y: 224, name: 'Puncak Pinus', icon: '🌲' },
    endStation: { x: 135, y: 316, name: 'Lembah Bunga', icon: '🌸' }
  },

  't-junction': { // Letter T
    gapOrigin: { x: 410, y: 200 },
    gapBox: { x: 410, y: 200, width: 140, height: 140 },
    motionPath: 'M 480 435 L 480 252 Q 480 232 500 232 L 720 232',
    leadInTrack: ['M 480 435 L 480 324'],
    gapTrack: ['M 430 232 L 530 232', 'M 480 232 L 480 324'],
    leadOutTrack: ['M 530 232 L 720 232'],
    startStation: { x: 480, y: 485, name: 'Depo Utama', icon: '🏢' },
    endStation: { x: 830, y: 232, name: 'Menara Jam', icon: '🕰️' }
  },

  'u-loop': { // Letter U
    gapOrigin: { x: 410, y: 200 },
    gapBox: { x: 410, y: 200, width: 140, height: 140 },
    motionPath: 'M 452 110 L 452 274 A 28 28 0 0 0 508 274 L 508 110',
    leadInTrack: ['M 452 110 L 452 220'],
    gapTrack: ['M 452 220 L 452 274 A 28 28 0 0 0 508 274 L 508 220'],
    leadOutTrack: ['M 508 220 L 508 110'],
    startStation: { x: 345, y: 60, name: 'Taman Barat', icon: '🌻' },
    endStation: { x: 615, y: 60, name: 'Gazebo Bintang', icon: '⭐' }
  },

  'crossing': { // Letter X
    gapOrigin: { x: 410, y: 200 },
    gapBox: { x: 410, y: 200, width: 140, height: 140 },
    motionPath: 'M 326 424 L 634 116',
    leadInTrack: ['M 326 424 L 436 314'],
    gapTrack: ['M 436 314 L 524 226', 'M 436 226 L 524 314'],
    leadOutTrack: ['M 524 226 L 634 116'],
    visualDecorativeTrack: ['M 396 186 L 436 226', 'M 524 314 L 564 354'],
    startStation: { x: 230, y: 470, name: 'Gerbang Barat', icon: '🛤️' },
    endStation: { x: 730, y: 70, name: 'Stasiun Timur', icon: '🚀' }
  },

  'bridge-h': { // Letter H
    gapOrigin: { x: 410, y: 200 },
    gapBox: { x: 410, y: 200, width: 140, height: 140 },
    motionPath: 'M 448 435 L 448 270 L 512 270 L 512 105',
    leadInTrack: ['M 448 435 L 448 322'],
    gapTrack: ['M 448 218 L 448 322', 'M 512 218 L 512 322', 'M 448 270 L 512 270'],
    leadOutTrack: ['M 512 218 L 512 105'],
    startStation: { x: 448, y: 485, name: 'Tepi Sungai', icon: '🌊' },
    endStation: { x: 512, y: 55, name: 'Mercusuar', icon: '🗼' }
  }
};

/**
 * 3. Unified Expansive Railway Arena SVG Generator (960 x 540)
 */
export function getRailwayArenaSVG(levelData, placedPiece = null) {
  const layoutKey = levelData.layoutType || 'vertical';
  const cfg = LAYOUT_CONFIGS[layoutKey] || LAYOUT_CONFIGS['vertical'];
  const hasPlaced = Boolean(placedPiece);

  const startSt = { ...cfg.startStation, name: levelData.startStation || cfg.startStation.name };
  const endSt = { ...cfg.endStation, name: levelData.endStation || cfg.endStation.name };

  const fixedPaths = [
    ...(cfg.leadInTrack || []),
    ...(cfg.leadOutTrack || []),
    ...(cfg.visualDecorativeTrack || [])
  ];

  return `
    <svg id="railway-arena-svg" viewBox="0 0 960 540" width="100%" height="100%" 
         preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Master Wood Gradient for the 960x540 Arena -->
        <linearGradient id="arenaWoodGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="960" y2="540">
          ${TRACK_THEME.woodStops}
        </linearGradient>

        <!-- Pleasant Meadow Grass -->
        <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#dcfce7"/>
          <stop offset="45%" stop-color="#bbf7d0"/>
          <stop offset="100%" stop-color="#86efac"/>
        </linearGradient>

        <!-- Soft Rolling Hills -->
        <linearGradient id="hillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#86efac"/>
          <stop offset="100%" stop-color="#4ade80"/>
        </linearGradient>

        <!-- Toy Locomotive Gradients -->
        <linearGradient id="locoBoilerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f87171"/>
          <stop offset="50%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#b91c1c"/>
        </linearGradient>
        <linearGradient id="locoCabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="50%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
        <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="50%" stop-color="#eab308"/>
          <stop offset="100%" stop-color="#a16207"/>
        </linearGradient>
        <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#78350f"/>
          <stop offset="100%" stop-color="#451a03"/>
        </linearGradient>

        <!-- Gold Glow Filter on Piece Placement -->
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- 1. Meadow & Scenery Background (Expansive 960x540) -->
      <rect width="960" height="540" rx="26" fill="url(#grassGrad)"/>

      <!-- Distant Hills -->
      <path d="M 0 240 Q 240 170 480 230 Q 720 160 960 210 L 960 540 L 0 540 Z" fill="url(#hillGrad)" opacity="0.32"/>
      <path d="M 0 350 Q 280 270 560 330 Q 780 260 960 300 L 960 540 L 0 540 Z" fill="url(#hillGrad)" opacity="0.48"/>

      <!-- Trees & Miniature Scenery Decoration -->
      <g opacity="0.85">
        <circle cx="90" cy="140" r="22" fill="#15803d"/>
        <circle cx="82" cy="130" r="17" fill="#22c55e"/>
        <rect x="87" y="156" width="6" height="18" rx="2" fill="#78350f"/>

        <circle cx="150" cy="220" r="18" fill="#166534"/>
        <circle cx="144" cy="214" r="13" fill="#4ade80"/>
        <rect x="147" y="234" width="6" height="14" rx="2" fill="#78350f"/>

        <circle cx="870" cy="140" r="24" fill="#15803d"/>
        <circle cx="862" cy="128" r="18" fill="#22c55e"/>
        <rect x="867" y="158" width="6" height="20" rx="2" fill="#78350f"/>

        <circle cx="890" cy="420" r="20" fill="#166534"/>
        <circle cx="884" cy="412" r="15" fill="#4ade80"/>
        <rect x="887" y="434" width="6" height="16" rx="2" fill="#78350f"/>

        <circle cx="70" cy="420" r="18" fill="#15803d"/>
        <circle cx="64" cy="412" r="13" fill="#22c55e"/>
        <rect x="67" y="434" width="6" height="14" rx="2" fill="#78350f"/>
      </g>

      <!-- 2. Permanent Railway Tracks (Lead-in & Lead-out) -->
      <g id="fixed-rail-tracks">
        ${renderTrackLayers(fixedPaths, false, 'arenaWoodGrad')}
      </g>

      <!-- 3. Puzzle Socket Cutout Area -->
      <g id="socket-cutout-area">
        <!-- Socket Wooden Recess Frame -->
        <rect x="${cfg.gapBox.x}" y="${cfg.gapBox.y}" 
              width="${cfg.gapBox.width}" height="${cfg.gapBox.height}" rx="18" 
              fill="${hasPlaced ? 'rgba(254, 243, 199, 0.95)' : 'rgba(254, 243, 199, 0.45)'}" 
              stroke="${hasPlaced ? '#10b981' : '#d97706'}" 
              stroke-width="${hasPlaced ? '3.5' : '2.5'}" 
              stroke-dasharray="${hasPlaced ? 'none' : '6 4'}" 
              filter="${hasPlaced ? 'url(#goldGlow)' : 'none'}"/>

        <!-- Missing Track Silhouette OR Placed Track Piece -->
        ${!hasPlaced ? `
          <g id="track-gap-silhouette">
            ${renderTrackLayers(cfg.gapTrack, true, 'arenaWoodGrad')}
          </g>
        ` : `
          <g id="track-gap-filled">
            ${renderTrackLayers(cfg.gapTrack, false, 'arenaWoodGrad')}
            <!-- Placement Stars Celebration Effect -->
            <circle cx="${cfg.gapBox.x + 18}" cy="${cfg.gapBox.y + 18}" r="5" fill="#fef08a" opacity="0.9"/>
            <circle cx="${cfg.gapBox.x + cfg.gapBox.width - 18}" cy="${cfg.gapBox.y + cfg.gapBox.height - 18}" r="5" fill="#fef08a" opacity="0.9"/>
          </g>
        `}
      </g>

      <!-- 4. Stations Group (Start & End) -->
      <g id="stations-group">
        <!-- Start Station -->
        <g id="start-station" transform="translate(${startSt.x}, ${startSt.y})">
          <rect x="-85" y="-18" width="170" height="38" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>
          <circle cx="-62" cy="1" r="13" fill="#dbeafe"/>
          <text x="-62" y="6" font-size="15" text-anchor="middle">${startSt.icon}</text>
          <text x="14" y="6" font-family="'Nunito', sans-serif" font-weight="800" font-size="13.5" fill="#1e293b" text-anchor="middle">${startSt.name}</text>
        </g>

        <!-- Destination Station -->
        <g id="end-station" transform="translate(${endSt.x}, ${endSt.y})">
          <rect x="-95" y="-18" width="190" height="38" rx="12" fill="#ffffff" stroke="#f59e0b" stroke-width="2.5" filter="drop-shadow(0 4px 8px rgba(245,158,11,0.25))"/>
          <circle cx="-72" cy="1" r="13" fill="#fef3c7"/>
          <text x="-72" y="6" font-size="15" text-anchor="middle">${endSt.icon}</text>
          <text x="0" y="6" font-family="'Nunito', sans-serif" font-weight="900" font-size="14" fill="#0f172a" text-anchor="middle">${endSt.name}</text>
          <text x="74" y="7" font-size="15" text-anchor="middle">🚩</text>
        </g>
      </g>

      <!-- 5. Invisible Motion Path for 60FPS Locomotive Movement -->
      <path id="train-motion-path" d="${cfg.motionPath}" fill="none" stroke="none" />

      <!-- 6. Steam Smoke Particle Container -->
      <g id="smoke-container" pointer-events="none"></g>

      <!-- 7. Custom Vector Toy Locomotive -->
      <g id="toy-locomotive" pointer-events="none" style="transition: none;">
        <ellipse cx="0" cy="18" rx="34" ry="7" fill="rgba(0,0,0,0.25)" />

        <!-- Driver Cab (Vibrant Blue) -->
        <rect x="-30" y="-28" width="26" height="36" rx="4" fill="url(#locoCabGrad)" stroke="#0c4a6e" stroke-width="2" />
        <path d="M -34 -28 Q -17 -34 0 -28 L -2 -25 L -32 -25 Z" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.5" />
        <rect x="-24" y="-22" width="14" height="15" rx="3" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />
        <circle cx="-17" cy="-14" r="4.5" fill="#f97316" />
        <circle cx="-17" cy="-18" r="4" fill="#3b82f6" />

        <!-- Boiler (Glossy Red) -->
        <rect x="-4" y="-18" width="34" height="26" rx="4" fill="url(#locoBoilerGrad)" stroke="#7f1d1d" stroke-width="2" />
        <line x1="8" y1="-18" x2="8" y2="8" stroke="url(#brassGrad)" stroke-width="2.5" />
        <line x1="20" y1="-18" x2="20" y2="8" stroke="url(#brassGrad)" stroke-width="2.5" />

        <!-- Brass Dome & Whistle -->
        <ellipse cx="10" cy="-21" rx="5" ry="4" fill="url(#brassGrad)" stroke="#a16207" stroke-width="1.2" />
        <rect x="-2" y="-24" width="3" height="7" rx="1.5" fill="url(#brassGrad)" />

        <!-- Smokestack -->
        <path d="M 22 -18 L 20 -28 L 28 -28 L 26 -18 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5" />
        <ellipse cx="24" cy="-28" rx="4.5" ry="2" fill="url(#brassGrad)" />

        <!-- Front Nose, Headlamp & Smiling Eyes -->
        <path d="M 30 0 L 37 4 L 37 9 L 30 9 Z" fill="#f59e0b" stroke="#b45309" stroke-width="1.5" />
        <circle cx="31" cy="-5" r="5.5" fill="#fef08a" stroke="#eab308" stroke-width="1.5" />
        <circle cx="31" cy="-5" r="3" fill="#ffffff" />
        <circle cx="32" cy="-5" r="1.5" fill="#1e293b" />

        <!-- Wood Wheels & Silver Studs -->
        <circle cx="-16" cy="11" r="10" fill="url(#wheelGrad)" stroke="#1c1917" stroke-width="2" />
        <circle cx="-16" cy="11" r="5" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5" />
        <circle cx="-16" cy="11" r="2" fill="#0f172a" />

        <circle cx="16" cy="11" r="10" fill="url(#wheelGrad)" stroke="#1c1917" stroke-width="2" />
        <circle cx="16" cy="11" r="5" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5" />
        <circle cx="16" cy="11" r="2" fill="#0f172a" />

        <!-- Side Rod Linkage -->
        <line x1="-16" y1="12" x2="16" y2="12" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
        <circle cx="-16" cy="12" r="2" fill="#e2e8f0" />
        <circle cx="16" cy="12" r="2" fill="#e2e8f0" />
      </g>
    </svg>
  `;
}
