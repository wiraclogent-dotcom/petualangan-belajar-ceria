/**
 * Confetti Cannon - Efek konfeti selebrasi kemenangan berbasis Canvas 2D
 * Dioptimalkan untuk Smart TV (Mali GPU): resolusi internal 960x540 (hemat VRAM 75%),
 * auto-hide saat selesai animasi, dan proteksi batas partikel.
 */
export class ConfettiCannon {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d', { alpha: true }) : null;
    this.particles = [];
    this.isRunning = false;
    if (this.canvas) {
      this.canvas.style.display = 'none';
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (!this.canvas) return;
    const targetW = Math.min(window.innerWidth || 1920, 960);
    const targetH = Math.min(window.innerHeight || 1080, 540);
    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW;
      this.canvas.height = targetH;
    }
  }

  fire(amount = 25) {
    if (!this.canvas || !this.ctx) return;
    this.canvas.style.display = 'block';
    const colors = ['#f43f5e', '#38bdf8', '#facc15', '#4ade80', '#c084fc', '#fb923c'];
    for (let i = 0; i < amount; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * (this.canvas.width * 0.3),
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 6,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    if (this.particles.length > 50) {
      this.particles = this.particles.slice(-50);
    }

    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  loop() {
    if (!this.isRunning || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.5;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.015;

      if (p.opacity <= 0 || p.y > this.canvas.height + 30) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.loop());
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.style.display = 'none';
      this.isRunning = false;
    }
  }
}
