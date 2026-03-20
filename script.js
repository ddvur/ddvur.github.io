/* =============================================
   LIAM LARACINE PORTFOLIO — SCRIPT.JS
   ============================================= */

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Nav toggle mobile ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Reveal on scroll ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

// ---- Skill bars ----
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); });
}, { threshold: 0.5 });
document.querySelectorAll('.skill-fill').forEach(f => skillObserver.observe(f));

// ---- Particle canvas ----
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');

function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
resize();
window.addEventListener('resize', resize);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.r  = Math.random() * 1.2 + 0.4;
        this.alpha = Math.random() * 0.45 + 0.05;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 65, ${this.alpha})`;
        ctx.fill();
    }
}

const particles = Array.from({ length: 70 }, () => new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(); particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d  = Math.sqrt(dx*dx + dy*dy);
            if (d < 110) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0,255,65,${(1 - d/110) * 0.1})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ---- Terminal typing ----
const heroSub = document.querySelector('.hero-sub');
const phrases = [
    'Développeur passionné · Game Dev',
    'BUT Informatique · 2ème année',
    "En recherche d'alternance en informatique",
    'Python · C++ · Java · SQL · HTML/CSS'
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeEffect() {
    const cur = phrases[phraseIdx];
    if (!deleting) {
        heroSub.textContent = cur.substring(0, ++charIdx);
        if (charIdx === cur.length) { deleting = true; setTimeout(typeEffect, 2400); return; }
    } else {
        heroSub.textContent = cur.substring(0, --charIdx);
        if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
    }
    setTimeout(typeEffect, deleting ? 35 : 55);
}
setTimeout(typeEffect, 1000);

// ---- Active nav ----
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
            });
        }
    });
}, { threshold: 0.4 });
document.querySelectorAll('section[id], header[id]').forEach(s => sectionObserver.observe(s));
