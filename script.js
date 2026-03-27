/* ============================================
   SR.IA — Landing Page Scripts
============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar scroll behavior --- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* --- Mobile menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* --- Scroll fade-in animations --- */
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  /* --- Screenshot carousel / lightbox --- */
  const thumbs = document.querySelectorAll('.screenshot-thumb');
  const mainImg = document.querySelector('.screenshot-main .screenshot-img');
  const mainPlaceholder = document.querySelector('.screenshot-main .screenshot-placeholder span');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const img = thumb.querySelector('.screenshot-img');
      const placeholder = thumb.querySelector('.screenshot-placeholder span');

      // If images are available (not placeholders)
      if (img && mainImg) {
        const srcTemp = mainImg.src;
        const altTemp = mainImg.alt;
        mainImg.src = img.src;
        mainImg.alt = img.alt;
        img.src = srcTemp;
        img.alt = altTemp;
      }

      // If placeholders
      if (placeholder && mainPlaceholder) {
        const textTemp = mainPlaceholder.textContent;
        mainPlaceholder.textContent = placeholder.textContent;
        placeholder.textContent = textTemp;
      }
    });
  });

  /* --- Smooth anchor scrolling --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- Step hover effect --- */
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, i) => {
    step.style.transitionDelay = `${i * 0.1}s`;
  });

  /* --- Pilar cards stagger animation --- */
  const pilarCards = document.querySelectorAll('.pilar-card');
  pilarCards.forEach((card, i) => {
    card.classList.add('fade-in');
    card.classList.add(`fade-in-delay-${i + 1}`);
  });

  /* --- Active nav link on scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));

});
