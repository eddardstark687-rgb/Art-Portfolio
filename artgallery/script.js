const drawings = [
  "benedict_cumberbatch.jpeg", "captain_america.jpeg", "captainmarvel.jpeg",
  "cillian_murphy.jpeg", "daredevil.jpeg", "flash.jpeg", "homelander.jpeg",
  "johnshelby.jpeg", "leomessi.jpeg", "martha.jpeg", "melisandre.jpeg",
  "olivia_cooke.jpeg", "tony.jpeg", "wolverine.jpeg"
];

const pages = {
  home: `
    <section class="hero">
      <h1>LUMINARA</h1>
      <p>Welcome to my art space. Step into a world where color pencil strokes breathe life into portraits. Experience the precision and passion behind every piece.</p>
    </section>
  `,
  art: `
    <section class="art-section">
      <h2 style="font-family: var(--font-serif); font-size: 3rem; margin-bottom: 2rem; color: var(--accent-color);">Gallery</h2>
      <div class="gallery-grid" id="gallery">
        <!-- Images dynamically loaded -->
      </div>
    </section>
  `,
  about: `
    <section class="about-container">
      <div class="about-image reveal">
        <img src="assets/face/mydumbface.jpeg" alt="Pranav P R">
      </div>
      <div class="about-text">
        <h2 style="color: var(--accent-color);">Pranav P R</h2>
        <p>I am an aspiring color pencil portrait artist dedicated to capturing the soul behind the sketch. My journey is one of obsession with detail, texture, and the magic that happens when pigment meets paper.</p>
        <p>With every portrait, I aim to push the boundaries of realism, transforming a simple medium into a vivid expression of character and emotion.</p>
        <p>Join me as I refine my craft and document the faces and stories that inspire my artistic professional journey.</p>
      </div>
    </section>
  `,
  contact: `
    <section class="contact-container reveal active">
      <h2 style="font-family: var(--font-serif); font-size: 3rem; text-align: center; margin-bottom: 2rem; color: var(--accent-color);">Get in Touch</h2>
      <form class="contact-form" id="contact-form">
        <div class="form-group">
          <label>Name</label>
          <input type="text" id="name" placeholder="Your Name" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="email" placeholder="your@email.com" required>
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea id="message" rows="5" placeholder="Let's talk about art..."></textarea>
        </div>
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </section>
  `
};

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const subject = encodeURIComponent(`Art Inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.location.href = `mailto:pranavpr687@gmail.com?subject=${subject}&body=${body}`;
}

// Pixel Background Logic
class PixelBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.pixelSize = 40;
    this.mouse = { x: -1000, y: -1000 };

    window.addEventListener('resize', () => this.init());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.init();
    this.animate();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cols = Math.ceil(this.canvas.width / this.pixelSize);
    this.rows = Math.ceil(this.canvas.height / this.pixelSize);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const x = i * this.pixelSize;
        const y = j * this.pixelSize;
        const dist = Math.hypot(x + this.pixelSize / 2 - this.mouse.x, y + this.pixelSize / 2 - this.mouse.y);

        if (dist < 250) {
          const opacity = 1 - (dist / 250);
          this.ctx.fillStyle = `rgba(226, 177, 60, ${opacity * 0.12})`;
          this.ctx.fillRect(x + 1, y + 1, this.pixelSize - 2, this.pixelSize - 2);
        }

        this.ctx.strokeStyle = 'rgba(226, 177, 60, 0.02)';
        this.ctx.strokeRect(x, y, this.pixelSize, this.pixelSize);
      }
    }
    requestAnimationFrame(() => this.animate());
  }
}

function loadPage(pageName) {
  const root = document.getElementById('app-root');

  root.innerHTML = pages[pageName] || pages.home;
  root.style.opacity = '1';
  root.classList.remove('page-transitioning');
  root.classList.remove('page-entrance');

  if (pageName === 'art') {
    const gallery = document.getElementById('gallery');
    drawings.forEach((img, index) => {
      const title = img.split('.')[0].replace(/_/g, ' ');
      const card = document.createElement('div');
      card.className = 'art-card reveal active'; // Activate immediately
      card.innerHTML = `
        <div class="art-card-inner">
          <img src="assets/drawings/${img}" alt="${title}">
          <div class="art-overlay">
            <span class="art-title">${title}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openLightbox(`assets/drawings/${img}`, title));
      gallery.appendChild(card);
    });
  }

  root.querySelectorAll('section').forEach(s => s.classList.add('reveal', 'active'));
  initReveal();

  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageName);
  });

  if (pageName === 'contact') {
    const form = document.getElementById('contact-form');
    if (form) form.addEventListener('submit', handleContactSubmit);
  }
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function openLightbox(src, title) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  img.src = src;
  caption.textContent = title;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
  new PixelBackground('bg-canvas');

  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.querySelector('.close-lightbox');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  const page = window.location.hash.replace('#', '') || 'home';
  loadPage(page);
});

window.addEventListener('hashchange', () => {
  const page = window.location.hash.replace('#', '') || 'home';
  loadPage(page);
});
