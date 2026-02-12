// ===== PARTICLE ANIMATION =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }

  draw() {
    ctx.fillStyle = `rgba(124, 240, 61, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    
    // Connect particles
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 120) {
        ctx.strokeStyle = `rgba(124, 240, 61, ${0.15 * (1 - distance / 120)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
  
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// ===== TYPING EFFECT =====
const words = ["Frontend Developer", "Web Designer", "Creative Coder", "UI/UX Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.querySelector(".typing-text");
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;

function typeLoop() {
  const currentWord = words[wordIndex];
  
  if (!isDeleting) {
    typingEl.textContent = currentWord.slice(0, charIndex++);
    
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeLoop, pauseTime);
      return;
    }
  } else {
    typingEl.textContent = currentWord.slice(0, charIndex--);
    
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  
  setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
}

setTimeout(typeLoop, 1000);

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on load

// ===== SKILL BAR ANIMATION ON SCROLL =====
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
  skillBars.forEach(bar => {
    const barPosition = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (barPosition < windowHeight - 100 && !bar.classList.contains('animated')) {
      bar.classList.add('animated');
      const targetWidth = bar.getAttribute('data-progress');
      bar.style.width = '0%';
      
      setTimeout(() => {
        bar.style.transition = 'width 1.5s ease';
        bar.style.width = targetWidth + '%';
      }, 100);
    }
  });
};

window.addEventListener('scroll', animateSkills);
animateSkills();

// ===== FORM SUBMISSION (DEMO) =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    
    // Simulate sending
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('span').textContent;
    submitBtn.querySelector('span').textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.querySelector('span').textContent = 'Message Sent!';
      
      setTimeout(() => {
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// ===== CURSOR TRAIL EFFECT (OPTIONAL) =====
const cursorDot = document.createElement('div');
cursorDot.style.cssText = `
  position: fixed;
  width: 8px;
  height: 8px;
  background: #7cf03d;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.15s ease;
  display: none;
`;
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.style.cssText = `
  position: fixed;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(124, 240, 61, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.2s ease;
  display: none;
`;
document.body.appendChild(cursorOutline);

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursorDot.style.display = 'block';
  cursorOutline.style.display = 'block';
  
  cursorDot.style.left = mouseX - 4 + 'px';
  cursorDot.style.top = mouseY - 4 + 'px';
});

function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  
  cursorOutline.style.left = outlineX - 15 + 'px';
  cursorOutline.style.top = outlineY - 15 + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Scale cursor on hover
document.querySelectorAll('a, button, .project-card').forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursorDot.style.transform = 'scale(1.5)';
    cursorOutline.style.transform = 'scale(1.5)';
  });
  
  element.addEventListener('mouseleave', () => {
    cursorDot.style.transform = 'scale(1)';
    cursorOutline.style.transform = 'scale(1)';
  });
});

// Hide custom cursor on mobile
if (window.innerWidth < 768) {
  cursorDot.style.display = 'none';
  cursorOutline.style.display = 'none';
}

// ===== PARALLAX EFFECT ON SCROLL =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-content');
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== RANDOM GLITCH TRIGGER =====
setInterval(() => {
  const glitchEl = document.querySelector('.glitch');
  if (glitchEl && Math.random() > 0.7) {
    glitchEl.style.animation = 'none';
    setTimeout(() => {
      glitchEl.style.animation = '';
    }, 10);
  }
}, 3000);

console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #7cf03d; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion by Keyan', 'color: #888; font-size: 14px;');