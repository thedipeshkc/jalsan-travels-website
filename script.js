/* ════════════════════════════════════════════════════════
   JALSAN TRAVELS & TOURS P. LTD.
   script.js — Main JavaScript
   ════════════════════════════════════════════════════════ */

/* ── STRIP MARQUEE DATA ──────────────────────────────────── */
const stripItems = [
  '✈ International Flights',
  '🛫 Domestic Flights',
  '💵 IME Remittance',
  '🌐 Western Union',
  '💸 Prabhu Money Transfer',
  '📱 eSewa Load',
  '📱 Khalti Load',
  '⚡ NEA Bill Payment',
  '💧 Water Bill',
  '🌐 Internet Payment',
  '🪪 Driving License Form',
  '🏦 Cash Deposit'
];

function buildStrip() {
  const track = document.getElementById('stripTrack');
  if (!track) return;

  // Build two sets for seamless infinite loop
  const all = [...stripItems, ...stripItems];
  track.innerHTML = all
    .map(item => `<span class="strip-item">${item}</span>`)
    .join('');
}

/* ── MOBILE MENU TOGGLE ──────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close menu when any mobile link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

/* ── SCROLL REVEAL ───────────────────────────────────────── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ── NAVBAR SHADOW ON SCROLL ─────────────────────────────── */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > 50) {
      navbar.style.boxShadow = '0 4px 24px rgba(10,26,59,0.13)';
    } else {
      navbar.style.boxShadow = '0 2px 16px rgba(10,26,59,0.07)';
    }
    lastScrollY = currentY;
  }, { passive: true });
}

/* ── ACTIVE NAV LINK ON SCROLL ───────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = '';
            link.style.background = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'var(--red)';
              link.style.background = 'var(--light)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));
}

/* ── CONTACT FORM ────────────────────────────────────────── */
function initContactForm() {
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg   = document.getElementById('formError');

  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const name    = document.getElementById('fname')?.value.trim();
    const phone   = document.getElementById('phone')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const service = document.getElementById('service')?.value;
    const message = document.getElementById('message')?.value.trim();

    // Hide previous messages
    successMsg && (successMsg.style.display = 'none');
    errorMsg   && (errorMsg.style.display   = 'none');

    // Basic validation
    if (!name || !phone) {
      errorMsg && (errorMsg.style.display = 'block');
      errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    // Simulate form submission (replace with real backend/EmailJS/etc.)
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      // Reset form
      ['fname', 'phone', 'email', 'message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      const sel = document.getElementById('service');
      if (sel) sel.selectedIndex = 0;

      // Show success
      successMsg && (successMsg.style.display = 'block');
      successMsg?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message ✉';
    }, 1200);
  });
}

/* ── FOOTER YEAR ─────────────────────────────────────────── */
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ── SMOOTH SCROLL POLYFILL ──────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── FLOATING BUTTONS LABEL TOGGLE ──────────────────────── */
function initFloatLabels() {
  // On mobile, we hide the text label via CSS class toggling
  // (handled purely in CSS for this version)
}

/* ══════════════════════════════════════════════════════════
   INIT — Run everything on DOM ready
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildStrip();
  initMobileMenu();
  initScrollReveal();
  initNavbarScroll();
  initActiveNav();
  initContactForm();
  setFooterYear();
  initSmoothScroll();
  initFloatLabels();
});