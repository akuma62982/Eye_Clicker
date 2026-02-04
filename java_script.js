let clicks = 0;
let bloodShown = false;
let warningChanged = false;

// éléments HTML
const eye = document.getElementById("eye");
const counter = document.getElementById("counter");
const blood = document.getElementById("blood");
const warning = document.getElementById("warning");

// fonction couleur sombre aléatoire
function randomDarkColor() {
  const r = Math.floor(Math.random() * 120);
  const g = Math.floor(Math.random() * 120);
  const b = Math.floor(Math.random() * 120);
  return `rgb(${r}, ${g}, ${b})`;
}

// clic sur l'œil
eye.addEventListener("click", () => {
  clicks++;
  counter.textContent = "Clics : " + clicks;

  // changement de fond
  document.body.style.backgroundColor = randomDarkColor();

  // sang à 100
  if (clicks >= 100 && !bloodShown) {
    blood.style.opacity = "1";
    bloodShown = true;
  }

  // changement de phrase à 100
  if (clicks >= 100 && !warningChanged) {
    warning.textContent = "arrete toi immédiatement !";
    warning.style.color = "#ff0000";
    warning.style.textShadow = "0 0 15px rgba(255, 0, 0, 0.9)";
    warningChanged = true;
  }
});
