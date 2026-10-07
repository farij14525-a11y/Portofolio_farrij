/**
 * ==========================================================================
 * PORTOFOLIO ANTI-GRAVITASI — FARRIJ.PSH
 * NEXT-GEN 0-G INTERACTIVE CORE ENGINE WITH MUSIC PLAYLIST STATION
 * ==========================================================================
 */

// Global physics & sound state
let currentGravityMode = 'zero'; // 'zero', 'moon', 'warp', 'inverted'
let isSfxEnabled = false;
let audioCtx = null;
let supernovaParticles = [];

// Music Playlist State
const playlist = [
  {
    title: 'blue',
    artist: 'yung kai',
    tag: 'Spotify Hit · 2024',
    src: 'assets/audio/blue_yung_kai.mp3',
    fallbackSrc: 'https://p.scdn.co/mp3-preview/4f9ec59f25eb7b2dbe9fc052d23957116a4d5ba5',
    cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273e3c060bdd41fed06a866c494',
    spotifyUrl: 'https://open.spotify.com/track/3be9ACTxtcL6Zm4vJRUiPG',
    synthChordFreqs: [220, 277.18, 329.63, 415.3]
  },
  {
    title: 'Salah Apa',
    artist: 'Ipank',
    tag: 'Pop Minang · Hit',
    src: 'assets/audio/salah_apa_ipank.mp3',
    fallbackSrc: 'https://p.scdn.co/mp3-preview/e0a0704c19cf8bfdcfecda6bdbe83ebcefe45f5d',
    cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273eeced4e78ef5a74e9805c9df',
    spotifyUrl: 'https://open.spotify.com/album/4Rg4WordQmANCPZIJ30LmP',
    synthChordFreqs: [220, 261.63, 329.63, 392.0]
  },
  {
    title: 'Takdir Memisahkan (Funkot)',
    artist: 'DJ Selly Semlehoy',
    tag: 'Funkot · Full Remix',
    src: 'assets/audio/takdir_memisahkan_funkot.mp4',
    cover: 'https://i.ytimg.com/vi/dUAE0xKRfaw/hqdefault.jpg',
    youtubeUrl: 'https://youtu.be/dUAE0xKRfaw',
    synthChordFreqs: [261.63, 329.63, 392.0, 523.25]
  },
  {
    title: 'Cinta Jangan Goyah (Funkot)',
    artist: 'DJ Selly Semlehoy',
    tag: 'Funkot · Full Remix',
    src: 'assets/audio/cinta_jangan_goyah_funkot.mp4',
    cover: 'https://i.ytimg.com/vi/xhv1wYbNPVE/hqdefault.jpg',
    youtubeUrl: 'https://youtu.be/xhv1wYbNPVE',
    synthChordFreqs: [220, 277.18, 329.63, 440]
  },
  {
    title: 'Lofi Cosmic Drift',
    artist: 'Chill Beats · Space Lofi',
    tag: 'Lofi 0-G',
    src: 'assets/audio/lofi_cosmic_drift.mp3',
    fallbackSrc: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80',
    synthChordFreqs: [220, 277.18, 329.63, 415.3]
  },
  {
    title: 'Neon Orbit Symphony',
    artist: 'Cyber Synthwave · Retro Dev',
    tag: 'Synthwave',
    src: 'assets/audio/neon_orbit_synthwave.mp3',
    fallbackSrc: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80',
    synthChordFreqs: [261.63, 311.13, 392.0, 466.16]
  },
  {
    title: 'Midnight Coding Odyssey',
    artist: 'Deep Focus · Ambient Beats',
    tag: 'Focus Flow',
    src: 'assets/audio/midnight_coding_odyssey.mp3',
    fallbackSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80',
    synthChordFreqs: [174.61, 220.0, 261.63, 329.63]
  },
  {
    title: 'Supernova Ascension',
    artist: 'Future Bass · Energetic',
    tag: 'Hyper Space',
    src: 'assets/audio/supernova_ascension.mp3',
    fallbackSrc: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3',
    cover: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&auto=format&fit=crop&q=80',
    synthChordFreqs: [293.66, 369.99, 440.0, 554.37]
  }
];

let currentTrackIndex = 0;
let isMusicPlaying = false;
let synthMusicInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMouseSpotlight();
  initTypingEffect();
  initLiveClock();
  initFpsCounter();
  initNavbar();
  initThemeAccentPicker();
  initSfxToggle();
  initAntiGravityCanvas();
  initGravitySimulator();
  initTerminalSimulator();
  initStatsCounter();
  initTiltEffect();
  initProjectFilter();
  initCopyEmail();
  initBackToTop();
  initSupernovaTrigger();
  initMusicPlayer();
});

/* --------------------------------------------------------------------------
   1. CUSTOM ZERO-G CURSOR FOLLOWER
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  const interactives = document.querySelectorAll('a, button, input, textarea, .tilt-card, .filter-btn, .orbit-item, .gravity-btn, .playlist-item');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('active');
      playCyberSfx(750, 0.04);
    });
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
}

/* --------------------------------------------------------------------------
   2. MOUSE SPOTLIGHT TORCH
   -------------------------------------------------------------------------- */
function initMouseSpotlight() {
  const spotlight = document.getElementById('mouseSpotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}

/* --------------------------------------------------------------------------
   3. TYPING EFFECT WITH ROTATING STRINGS
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  const words = [
    'Creative Web Developer',
    'Laravel & Vue Specialist',
    'UI/UX Design Artisan',
    'Digital Problem Solver',
    'Zero-Gravity Explorer'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeLoop() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 85;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1900;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(typeLoop, typeSpeed);
  }

  typeLoop();
}

/* --------------------------------------------------------------------------
   4. LIVE CLOCK (WIB / UTC+7) & LIVE FPS COUNTER
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeString = new Intl.DateTimeFormat('id-ID', options).format(now);
    clockEl.textContent = `${timeString} WIB`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

function initFpsCounter() {
  const fpsEl = document.getElementById('fpsCount');
  if (!fpsEl) return;

  let lastTime = performance.now();
  let frameCount = 0;

  function loop() {
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastTime));
      fpsEl.textContent = `${fps} FPS`;
      frameCount = 0;
      lastTime = now;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* --------------------------------------------------------------------------
   5. WEB AUDIO API SYNTHESIZER FOR CYBER SFX
   -------------------------------------------------------------------------- */
function playCyberSfx(freq = 440, duration = 0.06, type = 'sine') {
  if (!isSfxEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Ignore audio context errors
  }
}

function initSfxToggle() {
  const sfxBtn = document.getElementById('sfxToggle');
  const sfxIcon = document.getElementById('sfxIcon');

  if (!sfxBtn || !sfxIcon) return;

  sfxBtn.addEventListener('click', () => {
    isSfxEnabled = !isSfxEnabled;
    sfxBtn.classList.toggle('active', isSfxEnabled);
    if (isSfxEnabled) {
      sfxIcon.className = 'fa-solid fa-volume-high text-cyan';
      playCyberSfx(880, 0.15, 'triangle');
      showToast('Efek Suara Cyber Diaktifkan! 🔊');
    } else {
      sfxIcon.className = 'fa-solid fa-volume-xmark';
      showToast('Efek Suara Dimatikan. 🔇');
    }
  });
}

/* --------------------------------------------------------------------------
   6. THEME ACCENT COLOR SWITCHER
   -------------------------------------------------------------------------- */
function initThemeAccentPicker() {
  const buttons = document.querySelectorAll('.theme-accent-picker .accent-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const accent = btn.getAttribute('data-accent');
      document.body.setAttribute('data-theme-accent', accent);
      playCyberSfx(620, 0.08);
      showToast(`Tema Warna Nebula diubah ke: ${accent.toUpperCase()} ✨`);
    });
  });
}

/* --------------------------------------------------------------------------
   7. NAVBAR SCROLL & ACTIVE LINK SPY
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const navContainer = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && navContainer) {
    mobileToggle.addEventListener('click', () => {
      navContainer.classList.toggle('open');
      const isOpen = navContainer.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars-staggered"></i>';
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navContainer.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   8. ANTI-GRAVITY CANVAS & PHYSICS ENGINE
   -------------------------------------------------------------------------- */
function initAntiGravityCanvas() {
  const canvas = document.getElementById('antiGravityCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 16), 85);

  const mouse = {
    x: null,
    y: null,
    radius: 140
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.baseSpeedY = -(Math.random() * 0.7 + 0.25);
      this.baseSpeedX = (Math.random() - 0.5) * 0.4;
      this.speedY = this.baseSpeedY;
      this.speedX = this.baseSpeedX;
      this.baseAlpha = Math.random() * 0.5 + 0.25;
      this.alpha = this.baseAlpha;
      this.hue = Math.random() > 0.45 ? 185 : 275;
    }

    update() {
      if (currentGravityMode === 'moon') {
        this.y += this.baseSpeedY * 0.35;
        this.x += Math.sin(this.y * 0.02) * 0.4;
      } else if (currentGravityMode === 'warp') {
        this.y += this.baseSpeedY * 4.5;
        this.x += this.baseSpeedX * 2;
      } else if (currentGravityMode === 'inverted') {
        const centerX = width / 2;
        const centerY = height / 2;
        const angle = Math.atan2(this.y - centerY, this.x - centerX) + 0.04;
        const dist = Math.hypot(this.x - centerX, this.y - centerY);
        this.x = centerX + Math.cos(angle) * dist;
        this.y = centerY + Math.sin(angle) * dist - 0.5;
      } else {
        this.y += this.speedY;
        this.x += this.speedX;
      }

      if (this.y < 0) {
        this.y = height + 10;
        this.x = Math.random() * width;
      }
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 4;
          this.y -= Math.sin(angle) * force * 4;
          this.alpha = 0.95;
        } else {
          this.alpha = this.baseAlpha;
        }
      }
    }

    draw() {
      ctx.beginPath();
      if (currentGravityMode === 'warp') {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.size * 9);
        ctx.strokeStyle = `hsla(${this.hue}, 95%, 70%, ${this.alpha})`;
        ctx.lineWidth = this.size;
        ctx.stroke();
      } else {
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 95%, 68%, ${this.alpha})`;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    if (currentGravityMode === 'warp') return;

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 105) {
          const opacity = (1 - dist / 105) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function updateSupernova() {
    for (let i = supernovaParticles.length - 1; i >= 0; i--) {
      const p = supernovaParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.alpha -= 0.015;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.alpha})`;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, 1)`;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (p.alpha <= 0) {
        supernovaParticles.splice(i, 1);
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    connectParticles();
    updateSupernova();

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   9. SUPERNOVA TRIGGER ON PROFILE CLICK
   -------------------------------------------------------------------------- */
function initSupernovaTrigger() {
  const trigger = document.getElementById('avatarCardTrigger');
  if (!trigger) return;

  trigger.addEventListener('click', (e) => {
    const rect = trigger.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    playCyberSfx(950, 0.25, 'sawtooth');

    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      supernovaParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        alpha: 1,
        hue: Math.random() > 0.5 ? 185 : 45
      });
    }

    showToast('🚀 SUPERNOVA BURST ACTIVATED!');
  });
}

/* --------------------------------------------------------------------------
   10. GRAVITY CONTROLLER SIMULATOR
   -------------------------------------------------------------------------- */
function initGravitySimulator() {
  const buttons = document.querySelectorAll('.gravity-btn');
  const statusText = document.getElementById('gravityStatusText');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-gravity');
      currentGravityMode = mode;

      const descriptions = {
        zero: 'Gravitasi Aktif: 0.0 G (Anti-Gravity Protocol)',
        moon: 'Gravitasi Aktif: 0.16 G (Lunar Drift Orbit)',
        warp: 'Gravitasi Aktif: HYPER WARP SPEED (Light Velocity)',
        inverted: 'Gravitasi Aktif: INVERTED VORTEX (Centrifugal Pull)'
      };

      if (statusText) statusText.textContent = descriptions[mode] || mode;
      playCyberSfx(550, 0.1, 'square');
      showToast(`Mode Fisika Diubah: ${mode.toUpperCase()} 🌌`);
    });
  });
}

/* --------------------------------------------------------------------------
   11. INTERACTIVE TERMINAL SIMULATOR (CLI)
   -------------------------------------------------------------------------- */
function initTerminalSimulator() {
  const input = document.getElementById('termInput');
  const history = document.getElementById('termHistory');
  const screen = document.getElementById('terminalScreen');

  if (!input || !history || !screen) return;

  const commands = {
    help: () => `
      <div class="term-line output text-cyan">Perintah yang tersedia:</div>
      <div class="term-line output">- <span class="cmd-chip">skills</span> : Lihat ringkasan keahlian teknis</div>
      <div class="term-line output">- <span class="cmd-chip">projects</span> : Tampilkan studi kasus proyek</div>
      <div class="term-line output">- <span class="cmd-chip">music</span> : Putar / jeda pemutar musik lofi</div>
      <div class="term-line output">- <span class="cmd-chip">supernova</span> : Picu ledakan partikel antariksa</div>
      <div class="term-line output">- <span class="cmd-chip">whoami</span> : Ringkasan identitas Farrij</div>
      <div class="term-line output">- <span class="cmd-chip">contact</span> : Tampilkan saluran komunikasi</div>
      <div class="term-line output">- <span class="cmd-chip">clear</span> : Bersihkan layar terminal</div>
    `,
    skills: () => `
      <div class="term-line output text-cyan">⚡ Core Stack Matrix:</div>
      <div class="term-line output">▸ Frontend : HTML5, CSS3/Sass, JavaScript ES6+, Vue.js (94%)</div>
      <div class="term-line output">▸ Backend  : PHP, Laravel MVC, MySQL Relational DB (88%)</div>
      <div class="term-line output">▸ UI/UX    : Figma Design Systems, Micro-Interactions (90%)</div>
    `,
    projects: () => `
      <div class="term-line output text-cyan">🚀 Proyek Unggulan:</div>
      <div class="term-line output">1. <span class="text-primary">TugasFRQ</span> — Portal Postingan Pelajar (Laravel + Vue)</div>
      <div class="term-line output">2. <span class="text-primary">EduGravity</span> — Konsep Belajar 3D Hologram (Figma UI/UX)</div>
      <div class="term-line output">3. <span class="text-primary">Smart Presence</span> — Sistem Pemindai Presensi QR Code</div>
    `,
    music: () => {
      togglePlayPauseMusic();
      return `<div class="term-line output text-cyan">🎵 Pemutar musik cosmic dialihkan statusnya!</div>`;
    },
    whoami: () => `
      <div class="term-line output">Operator: <span class="text-cyan">Farid / Farrij</span> | Creative Developer</div>
      <div class="term-line output">Filosofi: <span class="text-gold">Anti-Gravitasi (Berpikir Melampaui Batas)</span></div>
      <div class="term-line output">Status: Terbuka untuk Kolaborasi & Proyek Teknologi</div>
    `,
    contact: () => `
      <div class="term-line output">Email: <span class="text-cyan">farrij.dev@example.com</span></div>
      <div class="term-line output">GitHub: <a href="https://github.com" target="_blank" class="text-cyan">github.com/farrij</a></div>
    `,
    supernova: () => {
      const avatar = document.getElementById('avatarCardTrigger');
      if (avatar) avatar.click();
      return `<div class="term-line output text-gold">💥 Supernova partikel berhasil diledakkan ke kanvas!</div>`;
    },
    clear: () => {
      history.innerHTML = '';
      return '';
    },
    cls: () => {
      history.innerHTML = '';
      return '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      if (!cmd) return;

      playCyberSfx(700, 0.05);

      const cmdLine = document.createElement('div');
      cmdLine.className = 'term-line';
      cmdLine.innerHTML = `<span class="term-prompt">farrij@zero-g:~$</span> <span>${input.value}</span>`;
      history.appendChild(cmdLine);

      if (commands[cmd]) {
        const result = commands[cmd]();
        if (result) {
          const resDiv = document.createElement('div');
          resDiv.innerHTML = result;
          history.appendChild(resDiv);
        }
      } else {
        const errorLine = document.createElement('div');
        errorLine.className = 'term-line output text-red';
        errorLine.innerHTML = `Perintah tidak dikenali: '${cmd}'. Ketik <span class="cmd-chip">help</span> untuk bantuan.`;
        history.appendChild(errorLine);
      }

      input.value = '';
      screen.scrollTop = screen.scrollHeight;
    }
  });
}

/* --------------------------------------------------------------------------
   12. COSMIC MUSIC PLAYER ENGINE & PLAYLIST DRAWER
   -------------------------------------------------------------------------- */
function initMusicPlayer() {
  const audio = document.getElementById('bgAudio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const volBtn = document.getElementById('volBtn');
  const playlistToggleBtn = document.getElementById('playlistToggleBtn');
  const progressBarContainer = document.getElementById('playerProgressContainer');

  if (audio) {
    audio.volume = 0.75;
    const initialTrack = playlist[currentTrackIndex];
    if (initialTrack && initialTrack.src) {
      audio.src = initialTrack.src;
    }
  }

  if (volumeSlider) {
    volumeSlider.value = 0.75;
    updateVolIcon(0.75);
  }

  renderPlaylistDrawer();
  updatePlayerUI();

  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPauseMusic);
  if (prevTrackBtn) prevTrackBtn.addEventListener('click', prevTrack);
  if (nextTrackBtn) nextTrackBtn.addEventListener('click', nextTrack);
  if (playlistToggleBtn) playlistToggleBtn.addEventListener('click', togglePlaylistDrawer);

  if (volumeSlider && audio) {
    volumeSlider.addEventListener('input', (e) => {
      audio.volume = parseFloat(e.target.value);
      updateVolIcon(audio.volume);
    });
  }

  if (volBtn && audio) {
    volBtn.addEventListener('click', () => {
      if (audio.volume > 0) {
        audio.dataset.prevVol = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
      } else {
        const restored = parseFloat(audio.dataset.prevVol) || 0.75;
        audio.volume = restored;
        volumeSlider.value = restored;
      }
      updateVolIcon(audio.volume);
    });
  }

  if (audio) {
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', nextTrack);
    audio.addEventListener('error', (e) => {
      console.warn('Audio element error encountered:', e);
      const current = playlist[currentTrackIndex];
      if (current && current.fallbackSrc && audio.src !== current.fallbackSrc) {
        audio.src = current.fallbackSrc;
        if (isMusicPlaying) audio.play().catch(() => playSynthCosmicChords(current));
      }
    });
  }

  if (progressBarContainer) {
    progressBarContainer.addEventListener('click', (e) => {
      const rect = progressBarContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      if (audio && audio.duration) {
        audio.currentTime = ratio * audio.duration;
      }
    });
  }
}

function renderPlaylistDrawer() {
  const list = document.getElementById('playlistItemsList');
  const countBadge = document.getElementById('playlistCountBadge');
  if (!list) return;

  if (countBadge) countBadge.textContent = playlist.length;
  list.innerHTML = '';

  playlist.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = `playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
    item.onclick = (e) => {
      if (e.target.closest('.spotify-track-link, .youtube-track-link')) return;
      selectTrack(index);
    };

    const coverHtml = track.cover
      ? `<img src="${track.cover}" alt="${track.title}" class="p-track-thumb" />`
      : `<span class="p-index">${index + 1}</span>`;

    let extLinkHtml = '';
    if (track.spotifyUrl) {
      extLinkHtml = `<a href="${track.spotifyUrl}" target="_blank" rel="noopener" class="spotify-track-link" title="Buka di Spotify" onclick="event.stopPropagation();"><i class="fa-brands fa-spotify text-emerald"></i></a>`;
    } else if (track.youtubeUrl) {
      extLinkHtml = `<a href="${track.youtubeUrl}" target="_blank" rel="noopener" class="youtube-track-link" title="Buka di YouTube" onclick="event.stopPropagation();"><i class="fa-brands fa-youtube text-red"></i></a>`;
    }

    item.innerHTML = `
      <div class="p-item-left">
        ${coverHtml}
        <div class="p-track-details">
          <span class="p-track-title">${track.title}</span>
          <span class="p-track-artist">${track.artist}</span>
        </div>
      </div>
      <div class="p-item-right">
        <span class="p-tag">${track.tag}</span>
        ${extLinkHtml}
        ${index === currentTrackIndex && isMusicPlaying ? '<i class="fa-solid fa-compact-disc fa-spin p-playing-icon"></i>' : ''}
      </div>
    `;

    list.appendChild(item);
  });
}

function updatePlayerUI() {
  const current = playlist[currentTrackIndex];
  if (!current) return;

  const titleEl = document.getElementById('trackTitle');
  const artistEl = document.getElementById('trackArtist');
  const playIcon = document.getElementById('playIcon');
  const disc = document.getElementById('vinylDisc');
  const eq = document.getElementById('equalizerBars');
  const vinylCenter = document.getElementById('vinylCenter');
  const extBtn = document.getElementById('dockExternalLink');

  if (titleEl) titleEl.textContent = current.title;
  if (artistEl) artistEl.textContent = current.artist;

  if (vinylCenter) {
    if (current.cover) {
      vinylCenter.innerHTML = `<img src="${current.cover}" alt="${current.title}" class="vinyl-cover-img" />`;
    } else {
      vinylCenter.innerHTML = `<i class="fa-solid fa-music text-cyan"></i>`;
    }
  }

  if (extBtn) {
    if (current.spotifyUrl) {
      extBtn.href = current.spotifyUrl;
      extBtn.className = 'btn-spotify-shortcut';
      extBtn.title = 'Buka di Spotify';
      extBtn.innerHTML = '<i class="fa-brands fa-spotify"></i>';
      extBtn.style.display = 'flex';
    } else if (current.youtubeUrl) {
      extBtn.href = current.youtubeUrl;
      extBtn.className = 'btn-youtube-shortcut';
      extBtn.title = 'Buka di YouTube';
      extBtn.innerHTML = '<i class="fa-brands fa-youtube"></i>';
      extBtn.style.display = 'flex';
    } else {
      extBtn.style.display = 'none';
    }
  }

  if (playIcon) {
    playIcon.className = isMusicPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  }

  if (disc) {
    disc.classList.toggle('playing', isMusicPlaying);
  }

  if (eq) {
    eq.classList.toggle('playing', isMusicPlaying);
  }

  renderPlaylistDrawer();
}

function playTrack(index) {
  currentTrackIndex = (index + playlist.length) % playlist.length;
  const audio = document.getElementById('bgAudio');
  const current = playlist[currentTrackIndex];
  if (!current || !audio) return;

  isMusicPlaying = true;
  stopSynthCosmicChords();

  const targetSrc = current.src || current.fallbackSrc;
  if (targetSrc) {
    audio.src = targetSrc;
    audio.load();
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Playback error on targetSrc, attempting fallback:', err);
        if (current.fallbackSrc && targetSrc !== current.fallbackSrc) {
          audio.src = current.fallbackSrc;
          audio.load();
          audio.play().catch(() => playSynthCosmicChords(current));
        } else {
          playSynthCosmicChords(current);
        }
      });
    }
  } else {
    playSynthCosmicChords(current);
  }

  showToast(`🎵 Memutar: ${current.title} — ${current.artist}`);
  updatePlayerUI();
}

function togglePlayPauseMusic() {
  const audio = document.getElementById('bgAudio');
  const current = playlist[currentTrackIndex];
  if (!audio || !current) return;

  if (!isMusicPlaying) {
    isMusicPlaying = true;
    stopSynthCosmicChords();

    const targetSrc = current.src || current.fallbackSrc;
    if (targetSrc) {
      if (!audio.src || !audio.src.includes(targetSrc.replace(/^assets\//, ''))) {
        audio.src = targetSrc;
        audio.load();
      }
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback retry:', err);
          if (current.fallbackSrc) {
            audio.src = current.fallbackSrc;
            audio.load();
            audio.play().catch(() => playSynthCosmicChords(current));
          } else {
            playSynthCosmicChords(current);
          }
        });
      }
    } else {
      playSynthCosmicChords(current);
    }
    showToast(`🎵 Memutar: ${current.title} — ${current.artist}`);
  } else {
    isMusicPlaying = false;
    audio.pause();
    stopSynthCosmicChords();
    showToast('⏸️ Musik Dijeda');
  }

  updatePlayerUI();
}

function selectTrack(index) {
  playTrack(index);
}

function nextTrack() {
  playTrack(currentTrackIndex + 1);
}

function prevTrack() {
  playTrack(currentTrackIndex - 1);
}

function updateProgress() {
  const audio = document.getElementById('bgAudio');
  const bar = document.getElementById('playerProgressBar');
  const timeEl = document.getElementById('currentTime');

  if (!audio || !bar) return;

  if (audio.duration && !isNaN(audio.duration)) {
    const pct = (audio.currentTime / audio.duration) * 100;
    bar.style.width = `${pct}%`;

    const curMins = Math.floor(audio.currentTime / 60);
    const curSecs = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    const totalMins = Math.floor(audio.duration / 60);
    const totalSecs = Math.floor(audio.duration % 60).toString().padStart(2, '0');

    if (timeEl) timeEl.textContent = `${curMins}:${curSecs} / ${totalMins}:${totalSecs}`;
  } else if (isMusicPlaying) {
    const now = Math.floor((Date.now() / 1000) % 180);
    const mins = Math.floor(now / 60);
    const secs = (now % 60).toString().padStart(2, '0');
    if (timeEl) timeEl.textContent = `${mins}:${secs}`;
    bar.style.width = `${(now / 180) * 100}%`;
  }
}

function updateVolIcon(vol) {
  const icon = document.getElementById('volIcon');
  if (!icon) return;
  if (vol === 0) icon.className = 'fa-solid fa-volume-xmark text-dim';
  else if (vol < 0.5) icon.className = 'fa-solid fa-volume-low';
  else icon.className = 'fa-solid fa-volume-high';
}

// Fallback Ambient Cosmic Synth Generator when mp3 file is not yet dropped
function playSynthCosmicChords(track) {
  stopSynthCosmicChords();
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const freqs = track.synthChordFreqs || [220, 277, 329, 415];
    let chordStep = 0;

    function triggerChord() {
      if (!isMusicPlaying) return;
      freqs.forEach((f, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f * (1 + (chordStep % 2) * 0.12), audioCtx.currentTime);

        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.8);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.08);
        osc.stop(audioCtx.currentTime + 4.2);
      });
      chordStep++;
    }

    triggerChord();
    synthMusicInterval = setInterval(triggerChord, 4000);
  } catch (e) {}
}

function stopSynthCosmicChords() {
  if (synthMusicInterval) {
    clearInterval(synthMusicInterval);
    synthMusicInterval = null;
  }
}

window.togglePlaylistDrawer = function () {
  const drawer = document.getElementById('playlistDrawerOverlay');
  if (!drawer) return;
  drawer.classList.toggle('active');
  playCyberSfx(780, 0.08);
};

window.handlePlaylistOutsideClick = function (e) {
  if (e.target.id === 'playlistDrawerOverlay') {
    togglePlaylistDrawer();
  }
};

window.handleCustomAudioUpload = function (e) {
  const files = e.target.files;
  if (!files || !files.length) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const objectUrl = URL.createObjectURL(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, '');

    playlist.push({
      title: cleanName,
      artist: 'Custom User Upload · Audio',
      tag: 'Local MP3',
      src: objectUrl
    });
  }

  showToast(`🎉 ${files.length} Lagu berhasil ditambahkan ke Playlist!`);
  renderPlaylistDrawer();
  // Play the newly added song
  selectTrack(playlist.length - files.length);
};

/* --------------------------------------------------------------------------
   13. ANIMATED STATS COUNTER
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let counted = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          statNumbers.forEach((counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 1600;
            const step = Math.ceil(target / (duration / 25));
            let current = 0;

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                counter.innerText = target;
                clearInterval(timer);
              } else {
                counter.innerText = current;
              }
            }, 25);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    observer.observe(heroStats);
  }
}

/* --------------------------------------------------------------------------
   14. 3D CARD TILT WITH PERSPECTIVE
   -------------------------------------------------------------------------- */
function initTiltEffect() {
  const cards = document.querySelectorAll('[data-tilt]');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   15. PROJECT FILTER SYSTEM
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('#projectFilter .filter-btn');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      playCyberSfx(600, 0.05);

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   16. COPY EMAIL & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBox = document.getElementById('copyEmailBox');
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');

  const copyAction = () => {
    if (!emailText) return;
    playCyberSfx(880, 0.1);
    navigator.clipboard.writeText(emailText.innerText.trim()).then(() => {
      showToast('Alamat email resmi berhasil disalin! 📋');
    }).catch(() => {
      showToast('Berhasil disalin: ' + emailText.innerText.trim());
    });
  };

  if (copyBox) copyBox.addEventListener('click', copyAction);
  if (copyBtn) copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    copyAction();
  });
}

window.showToast = function (message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
};

/* --------------------------------------------------------------------------
   17. CONTACT FORM SUBMISSION
   -------------------------------------------------------------------------- */
window.handleFormSubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById('senderName').value;
  const submitBtn = document.getElementById('submitMsgBtn');

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mentransmisikan Pesan...';
  playCyberSfx(520, 0.15, 'sawtooth');

  setTimeout(() => {
    playCyberSfx(1040, 0.2, 'triangle');
    showToast(`Terima kasih, ${name}! Pesan Anda telah terkirim.`);
    document.getElementById('contactForm').reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan Sekarang';
  }, 1200);
};

/* --------------------------------------------------------------------------
   18. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    playCyberSfx(1200, 0.25, 'triangle');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
