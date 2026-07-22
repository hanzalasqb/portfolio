// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.querySelector('.back-to-top');

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
  }
}

function toggleTheme() {
  body.classList.toggle('light-mode');
  const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Smooth Scrolling
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Back to Top Button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn?.classList.add('show');
  } else {
    backToTopBtn?.classList.remove('show');
  }
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Reveal Animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('reveal');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 100;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 30);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Intersection Observer for Counter Animation
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.classList.contains('statistics')) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const statisticsSection = document.querySelector('.statistics');
if (statisticsSection) {
  observer.observe(statisticsSection);
}

// Fetch Portfolio Data
async function fetchPortfolioData() {
  try {
    const response = await fetch('/api/hero');
    const data = await response.json();
    console.log('Hero data:', data);
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
  }
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  fetchPortfolioData();
  revealOnScroll();
});
