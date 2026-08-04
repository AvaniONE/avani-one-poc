const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal content as it enters the viewport.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

// Connect the sticky story to scroll position.
const engine = document.querySelector('.engine');
const items = [...document.querySelectorAll('.progress-item')];
const cards = [...document.querySelectorAll('.stage-card')];
let currentStep = 0;
function setStep(step) {
  currentStep = Math.max(0, Math.min(5, step));
  items.forEach((item, index) => item.classList.toggle('active', index === currentStep));
  cards.forEach((card, index) => card.classList.toggle('active', index === currentStep));
  document.documentElement.style.setProperty('--story-progress', currentStep / 5);
}
function updateStory() {
  const rect = engine.getBoundingClientRect();
  const distance = engine.offsetHeight - window.innerHeight;
  const progress = Math.max(0, Math.min(1, -rect.top / distance));
  setStep(Math.min(5, Math.floor(progress * 6)));
}
items.forEach((item) => item.addEventListener('click', () => {
  const step = Number(item.dataset.step);
  const target = engine.offsetTop + ((engine.offsetHeight - innerHeight) * step / 5);
  window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
}));
window.addEventListener('scroll', updateStory, { passive: true });
window.addEventListener('resize', updateStory);
updateStory();

// Lightweight signal network background. No external animation library required.
const canvas = document.getElementById('signalCanvas');
const context = canvas.getContext('2d');
let points = [];
function sizeCanvas() {
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = Math.min(65, Math.floor(innerWidth / 22));
  points = Array.from({ length: count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - .5) * .18,
    vy: (Math.random() - .5) * .18
  }));
}
function draw() {
  context.clearRect(0, 0, innerWidth, innerHeight);
  context.fillStyle = 'rgba(52,139,233,.55)';
  context.strokeStyle = 'rgba(52,139,233,.12)';
  points.forEach((point, index) => {
    point.x += point.vx; point.y += point.vy;
    if (point.x < 0 || point.x > innerWidth) point.vx *= -1;
    if (point.y < 0 || point.y > innerHeight) point.vy *= -1;
    context.beginPath(); context.arc(point.x, point.y, 1.25, 0, Math.PI * 2); context.fill();
    for (let j = index + 1; j < points.length; j++) {
      const other = points[j]; const dx = point.x - other.x; const dy = point.y - other.y;
      if (dx * dx + dy * dy < 10500) {
        context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(other.x, other.y); context.stroke();
      }
    }
  });
  if (!reduced) requestAnimationFrame(draw);
}
sizeCanvas(); draw();
window.addEventListener('resize', sizeCanvas);
