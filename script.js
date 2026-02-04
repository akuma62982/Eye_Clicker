let count = 0;
const counter = document.getElementById('counter');
const eye = document.getElementById('eye');
const pupil = document.getElementById('pupil');
const topLid = document.querySelector('.eyelid.top');
const bottomLid = document.querySelector('.eyelid.bottom');

// Suivi de la souris pour la pupille
document.addEventListener('mousemove', (e) => {
  const rect = eye.getBoundingClientRect();
  const eyeX = rect.left + rect.width / 2;
  const eyeY = rect.top + rect.height / 2;

  const dx = e.clientX - eyeX;
  const dy = e.clientY - eyeY;
  const angle = Math.atan2(dy, dx);

  const radius = 50; // distance max que la pupille peut bouger
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  pupil.style.transform = `translate(${x}px, ${y}px)`;
});

// Click sur l'œil
eye.addEventListener('click', () => {
  // Augmenter le compteur
  count++;
  counter.textContent = count;

  // Animation du clignement
  topLid.style.transform = 'translateY(0)';
  bottomLid.style.transform = 'translateY(0)';
  setTimeout(() => {
    topLid.style.transform = 'translateY(-100%)';
    bottomLid.style.transform = 'translateY(100%)';
  }, 100); // durée du clignement
});
