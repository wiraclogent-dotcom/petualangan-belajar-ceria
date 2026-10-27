/**
 * GridMazeGame.js
 * Game 4: Grid Maze Patrol (Patroli Labirin Abjad)
 * 
 * Game logika spasial penelusuran labirin huruf untuk anak 4 tahun (pre-reader).
 * Mengendalikan mobil patroli (🚓) dengan remote TV D-Pad (▲ ▼ ◀ ▶).
 * Mengikuti jalur huruf target dari Start 🚩 hingga Goal 🏁.
 */

import { GRID_MAZE_LEVELS } from '../../data/gridMazeData.js';
import { speakText, cancelSpeech } from '../../core/tts.js';

export class GridMazeGame {
  constructor(engine) {
    this.engine = engine;
    this.level = 1;
    this.currentData = null;
    this.playerPos = { x: 0, y: 0 };
    this.visitedTiles = new Set();
    this.isInputLocked = false;
  }

  start() {
    this.level = 1;
    if (this.engine.voice) {
      this.engine.voice.stopListening();
    }
    this.engine.initStars('grid-maze-stars-container', 15);
    this.loadLevel(this.level);
  }

  loadLevel(lvl) {
    this.level = lvl;
    this.isInputLocked = false;

    const data = GRID_MAZE_LEVELS.find(d => d.level === lvl) || GRID_MAZE_LEVELS[0];
    this.currentData = data;
    this.playerPos = { x: data.start.x, y: data.start.y };
    this.visitedTiles = new Set();
    this.visitedTiles.add(`${data.start.x},${data.start.y}`);

    // 1. Header Information
    const lvlEl = document.getElementById('grid-maze-level');
    if (lvlEl) lvlEl.innerText = lvl;

    const instructionEl = document.getElementById('grid-maze-instruction-text');
    if (instructionEl) instructionEl.innerText = data.title;

    // 2. Render Panggung Labirin
    this.renderMazeStage();

    // 3. Suara Pembuka Ramah Anak
    speakText(`Misi ${lvl}! Ikuti jejak huruf ${data.targetLetter} untuk menuju ${data.clue.goalName}!`);

    this.engine.reportTVState();
  }

  renderMazeStage() {
    const sidebarContainer = document.getElementById('grid-maze-sidebar');
    const arenaContainer = document.getElementById('grid-maze-arena');
    if (!sidebarContainer || !arenaContainer) return;

    const d = this.currentData;

    // 1. Render Sidebar Clue Target
    sidebarContainer.innerHTML = `
      <div class="maze-clue-card">
        <div class="maze-clue-header">TARGET PATROLI</div>
        <div class="maze-clue-icon">${d.clue.icon}</div>
        <div class="maze-target-badge">
          <span class="badge-letter">${d.targetLetter}</span>
        </div>
        <div class="maze-clue-name">${d.clue.name}</div>
        <div class="maze-goal-destination">
          <span class="dest-label">TUJUAN:</span>
          <span class="dest-title">${d.clue.goalIcon} ${d.clue.goalName}</span>
        </div>
      </div>
    `;

    // 2. Render Grid Cells
    const cols = d.cols;
    const rows = d.rows;

    let cellsHtml = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const type = d.layout[r][c];
        const isVisited = this.visitedTiles.has(`${c},${r}`);

        let cellContent = '';
        let cellClass = 'maze-cell';

        if (type === 'W') {
          cellClass += ' cell-wall';
          cellContent = '<span class="cell-bush">🌳</span>';
        } else if (type === 'S') {
          cellClass += ' cell-start';
          cellContent = '<span class="cell-flag">🚩</span>';
        } else if (type === 'G') {
          cellClass += ' cell-goal';
          cellContent = `<span class="cell-goal-icon">${d.clue.goalIcon}</span>`;
        } else if (type === 'T') {
          cellClass += ' cell-target-road';
          if (isVisited) cellClass += ' tile-visited';
          cellContent = `
            <span class="cell-letter">${d.targetLetter}</span>
            ${isVisited ? '<span class="tile-sparkle">⭐</span>' : ''}
          `;
        }

        cellsHtml += `
          <div class="${cellClass}" id="maze-cell-${c}-${r}" data-x="${c}" data-y="${r}">
            ${cellContent}
          </div>
        `;
      }
    }

    arenaContainer.innerHTML = `
      <div class="maze-board-wrapper">
        <div class="maze-grid-board" style="grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr);" id="maze-grid-board">
          ${cellsHtml}
          <!-- Mobil Patroli Polisi Ceria -->
          <div class="patrol-car-token" id="patrol-car-token">
            <span class="car-sprite">🚓</span>
            <div class="car-beacon-light"></div>
          </div>
        </div>
      </div>
    `;

    // Update Token Position
    this.updateCarPosition(false);
  }

  updateCarPosition(playAudio = true) {
    const token = document.getElementById('patrol-car-token');
    const board = document.getElementById('maze-grid-board');
    if (!token || !board) return;

    const cols = this.currentData.cols;
    const rows = this.currentData.rows;

    const cellW = board.clientWidth / cols;
    const cellH = board.clientHeight / rows;

    const left = this.playerPos.x * cellW + (cellW / 2) - 35;
    const top = this.playerPos.y * cellH + (cellH / 2) - 35;

    token.style.left = `${left}px`;
    token.style.top = `${top}px`;

    // Mark current cell as visited
    const curKey = `${this.playerPos.x},${this.playerPos.y}`;
    this.visitedTiles.add(curKey);

    const cellEl = document.getElementById(`maze-cell-${this.playerPos.x}-${this.playerPos.y}`);
    const cellType = this.currentData.layout[this.playerPos.y][this.playerPos.x];

    if (cellType === 'T' && cellEl) {
      cellEl.classList.add('tile-visited');
      if (!cellEl.querySelector('.tile-sparkle')) {
        const sp = document.createElement('span');
        sp.className = 'tile-sparkle';
        sp.innerText = '⭐';
        cellEl.appendChild(sp);
      }
      if (playAudio && this.engine.sound) {
        this.engine.sound.playTileStep();
      }
    } else if (cellType === 'G') {
      this.reachGoal();
    }
  }

  movePlayer(dx, dy) {
    if (this.isInputLocked) return;

    const newX = this.playerPos.x + dx;
    const newY = this.playerPos.y + dy;

    const cols = this.currentData.cols;
    const rows = this.currentData.rows;

    // 1. Cek Batas Arena
    if (newX < 0 || newX >= cols || newY < 0 || newY >= rows) {
      if (this.engine.sound) this.engine.sound.playOops();
      return;
    }

    // 2. Cek Jenis Ubin
    const targetType = this.currentData.layout[newY][newX];
    if (targetType === 'W') {
      // Menabrak semak/tembok
      const token = document.getElementById('patrol-car-token');
      if (token) {
        token.classList.add('car-bump');
        setTimeout(() => token.classList.remove('car-bump'), 400);
      }
      if (this.engine.sound) this.engine.sound.playOops();
      return;
    }

    // Gerakan valid
    this.playerPos = { x: newX, y: newY };
    if (this.engine.sound) {
      this.engine.sound.playRoverMove();
    }

    this.updateCarPosition(true);
    this.engine.reportTVState();
  }

  reachGoal() {
    this.isInputLocked = true;
    cancelSpeech();

    const token = document.getElementById('patrol-car-token');
    if (token) {
      token.classList.add('car-celebrate');
    }

    if (this.engine.sound) {
      this.engine.sound.playPatrolSiren();
    }

    setTimeout(() => {
      if (this.engine.sound) this.engine.sound.playCorrect();
      if (this.engine.confetti) this.engine.confetti.fire(40);
      this.engine.updateStar(this.level, 'grid-maze-stars-container');

      speakText(`Luar biasa! Mobil patroli berhasil sampai ke ${this.currentData.clue.goalName}!`);
    }, 450);

    setTimeout(() => {
      if (this.level >= 15) {
        this.engine.showVictory(15);
      } else {
        this.level++;
        this.loadLevel(this.level);
      }
    }, 2800);
  }

  handleKey(key) {
    if (this.isInputLocked) return;

    // D-Pad Arah
    if (['ArrowUp', 'Up'].includes(key)) {
      this.movePlayer(0, -1);
      return;
    }
    if (['ArrowDown', 'Down'].includes(key)) {
      this.movePlayer(0, 1);
      return;
    }
    if (['ArrowLeft', 'Left'].includes(key)) {
      this.movePlayer(-1, 0);
      return;
    }
    if (['ArrowRight', 'Right'].includes(key)) {
      this.movePlayer(1, 0);
      return;
    }

    // Tombol Back
    if (['Escape', 'Backspace', 'GoBack'].includes(key)) {
      this.engine.navigateBack();
    }
  }
}
