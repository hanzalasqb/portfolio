// Typing Animation
class TypingAnimation {
  constructor(element, words, speed = 100, delay = 2000) {
    this.element = element;
    this.words = words;
    this.speed = speed;
    this.delay = delay;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
  }

  type() {
    const currentWord = this.words[this.wordIndex];
    const displayText = currentWord.substring(0, this.charIndex);
    this.element.textContent = displayText;
    this.element.style.borderRight = '2px solid var(--accent)';

    if (!this.isDeleting && this.charIndex < currentWord.length) {
      this.charIndex++;
      setTimeout(() => this.type(), this.speed);
    } else if (this.isDeleting && this.charIndex > 0) {
      this.charIndex--;
      setTimeout(() => this.type(), this.speed / 2);
    } else {
      this.isDeleting = !this.isDeleting;
      this.wordIndex = !this.isDeleting ? (this.wordIndex + 1) % this.words.length : this.wordIndex;
      setTimeout(() => this.type(), this.delay);
    }
  }

  start() {
    this.type();
  }
}

// Particle Background
class ParticleBackground {
  constructor(canvasId, particleCount = 50) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particleCount = particleCount;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };

    this.resize();
    this.init();
    this.animate();

    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => this.updateMouse(e));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  updateMouse(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';

    this.particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      const dx = particle.x - this.mouse.x;
      const dy = particle.y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        particle.vx += (particle.x - this.mouse.x) * 0.01;
        particle.vy += (particle.y - this.mouse.y) * 0.01;
      }

      this.ctx.globalAlpha = particle.opacity;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();

      if (index > 0) {
        const prevParticle = this.particles[index - 1];
        const dx = particle.x - prevParticle.x;
        const dy = particle.y - prevParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(prevParticle.x, prevParticle.y);
          this.ctx.stroke();
        }
      }
    });

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// Mouse Cursor Effect
class MouseCursor {
  constructor() {
    this.cursor = document.createElement('div');
    this.cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      display: none;
    `;
    document.body.appendChild(this.cursor);

    this.x = 0;
    this.y = 0;

    document.addEventListener('mousemove', (e) => this.updatePosition(e));
    document.addEventListener('mouseenter', () => this.show());
    document.addEventListener('mouseleave', () => this.hide());
  }

  updatePosition(e) {
    this.x = e.clientX;
    this.y = e.clientY;
    this.cursor.style.left = (this.x - 10) + 'px';
    this.cursor.style.top = (this.y - 10) + 'px';
  }

  show() {
    this.cursor.style.display = 'block';
  }

  hide() {
    this.cursor.style.display = 'none';
  }
}

// Tilt Effect
class TiltEffect {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.elements.forEach(element => {
      element.addEventListener('mousemove', (e) => this.tilt(e));
      element.addEventListener('mouseleave', () => this.resetTilt(element));
    });
  }

  tilt(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  resetTilt(element) {
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  }
}

// Scroll Progress Bar
class ScrollProgressBar {
  constructor() {
    this.progressBar = document.querySelector('.progress-bar');
    if (!this.progressBar) return;

    window.addEventListener('scroll', () => this.updateProgress());
  }

  updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    this.progressBar.style.width = scrolled + '%';
  }
}

// Initialize Animations on Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Typing Animation
  const typingElement = document.querySelector('.typing-animation');
  if (typingElement) {
    const words = ['MERN Stack Developer', 'Web Developer', 'UI/UX Enthusiast', 'Problem Solver'];
    const typing = new TypingAnimation(typingElement, words);
    typing.start();
  }

  // Particle Background (if canvas exists)
  new ParticleBackground('particle-canvas', 50);

  // Mouse Cursor Effect
  new MouseCursor();

  // Tilt Effect
  new TiltEffect('.project-card');

  // Scroll Progress Bar
  new ScrollProgressBar();
});
