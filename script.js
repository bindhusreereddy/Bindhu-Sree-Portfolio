document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ===================================================================
  // THEME TOGGLE (Dark/Light with localStorage persistence)
  // ===================================================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const themeIcon = themeToggle.querySelector('i');

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon(next);
    // Reinitialize particles with new theme colors
    initParticles();
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // ===================================================================
  // HAMBURGER MENU (Mobile)
  // ===================================================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when clicking a nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ===================================================================
  // TYPED.JS — Hero Role Animation
  // ===================================================================
  if (document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: [
        "Software Engineer",
        "Full Stack Developer",
        "MS CS @ University of Florida",
        "AI & ML Enthusiast",
        "Cloud Practitioner",
        "Problem Solver"
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 2000,
    });
  }

  // ===================================================================
  // SMOOTH SCROLL — Nav Links
  // ===================================================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: target, offsetY: 72 },
          ease: 'power2.inOut'
        });
      }
    });
  });

  // ===================================================================
  // ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
  // ===================================================================
  const sections = document.querySelectorAll('.section');
  const allNavLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(link => link.classList.remove('active'));
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ===================================================================
  // SCROLL REVEAL ANIMATIONS (GSAP)
  // ===================================================================
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Animate experience items individually
  gsap.utils.toArray('.exp-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Animate skill categories
  gsap.utils.toArray('.skill-category').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Animate achievement cards
  gsap.utils.toArray('.achievement-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ===================================================================
  // PROJECT CAROUSEL — Navigation & Filtering
  // ===================================================================
  const carousel = document.getElementById('projectsCarousel');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (prevBtn && nextBtn && carousel) {
    const scrollAmount = 400;

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Category filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = card.dataset.category || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          gsap.fromTo(card,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
          );
        } else {
          card.style.display = 'none';
        }
      });

      // Reset scroll position
      if (carousel) carousel.scrollLeft = 0;
    });
  });

  // ===================================================================
  // PARTICLE SYSTEM — Canvas Background
  // ===================================================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];
  let animationId;

  function initParticles() {
    if (!canvas || !ctx) return;

    // Cancel previous animation
    if (animationId) cancelAnimationFrame(animationId);

    const heroSection = document.getElementById('home');
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;

    const theme = html.getAttribute('data-theme');
    const particleCount = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));

    particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3 - 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        type: Math.random() > 0.7 ? 'star' : 'circle'
      });
    }

    animateParticles();
  }

  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const theme = html.getAttribute('data-theme');

    particles.forEach(p => {
      ctx.save();

      if (theme === 'dark') {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.6})`;
      } else {
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity * 0.4})`;
      }

      if (p.type === 'star') {
        drawStar(ctx, p.x, p.y, 4, p.size * 2, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Move particles
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
    });

    animationId = requestAnimationFrame(animateParticles);
  }

  function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);

    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerR;
      y = cy + Math.sin(rot) * outerR;
      ctx.lineTo(x, y);
      rot += step;
      x = cx + Math.cos(rot) * innerR;
      y = cy + Math.sin(rot) * innerR;
      ctx.lineTo(x, y);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerR);
    ctx.closePath();
    ctx.fill();
  }

  // Initialize particles
  initParticles();

  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initParticles, 250);
  });

  // ===================================================================
  // NAVBAR BACKGROUND ON SCROLL
  // ===================================================================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

});