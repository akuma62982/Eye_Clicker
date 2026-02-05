// VARIABLES
let count = 0;
let autoClick = 0;
let doubleClick = false;

const counter = document.getElementById("counter");
const eye = document.getElementById("eye");
const pupil = document.getElementById("pupil");
const topLid = document.querySelector(".eyelid.top");
const bottomLid = document.querySelector(".eyelid.bottom");

const doubleClickBtn = document.getElementById("doubleClickBtn");
const autoClickBtn = document.getElementById("autoClickBtn");

// PUPILLE QUI SUIT LA SOURIS
document.addEventListener("mousemove", (e) => {
  const rect = eye.getBoundingClientRect();
  const eyeX = rect.left + rect.width / 2;
  const eyeY = rect.top + rect.height / 2;

  const dx = e.clientX - eyeX;
  const dy = e.clientY - eyeY;
  const angle = Math.atan2(dy, dx);

  const radius = 50;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  pupil.style.transform = `translate(${x}px, ${y}px)`;
});

// FONCTION POUR LA GICLÉE DE SANG
function createBlood() {
  const blood = document.createElement("div");
  blood.classList.add("blood");

  const rect = eye.getBoundingClientRect();
  blood.style.left = `${rect.width / 2}px`;
  blood.style.top = `${rect.height / 2}px`;

  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * 80 + 20;
  const finalX = Math.cos(angle) * distance + "px";
  const finalY = Math.sin(angle) * distance + "px";
  blood.style.setProperty("--x", finalX);
  blood.style.setProperty("--y", finalY);

  eye.appendChild(blood);
  setTimeout(() => blood.remove(), 500);
}

// FONCTION DE CLIC
eye.addEventListener("click", () => {
  count += doubleClick ? 2 : 1;
  counter.textContent = count;

  // Mise à jour de la couleur
  updatePupilColor();

  // Clignement rapide
  topLid.style.transform = "translateY(0)";
  bottomLid.style.transform = "translateY(0)";
  setTimeout(() => {
    topLid.style.transform = "translateY(-100%)";
    bottomLid.style.transform = "translateY(100%)";
  }, 100);

  // Pupille se dilate un peu
  pupil.style.width = "70px";
  pupil.style.height = "70px";
  setTimeout(() => {
    pupil.style.width = "50px";
    pupil.style.height = "50px";
  }, 150);

  // Giclée de sang
  for (let i = 0; i < 5; i++) createBlood();

  // Fond qui change selon le score
  if (count > 50) document.body.style.background = "#440000";
  if (count > 100) document.body.style.background = "#330000";
});

// UPGRADES
doubleClickBtn.addEventListener("click", () => {
  if (count >= 10) {
    count -= 10;
    doubleClick = true;
    counter.textContent = count;
    // Mise à jour de la couleur
    updatePupilColor();
    doubleClickBtn.disabled = true;
  }
});

autoClickBtn.addEventListener("click", () => {
  if (count >= 20) {
    count -= 20;
    autoClick++;
    counter.textContent = count;
    // Mise à jour de la couleur
    updatePupilColor();

    autoClickBtn.disabled = true;
    setInterval(() => {
      count += autoClick;
      counter.textContent = count;
    }, 1000);
  }
});

// BONUS ALÉATOIRE (mini œil à cliquer)
function spawnBonus() {
  const bonus = document.createElement("div");
  bonus.style.position = "absolute";
  bonus.style.width = "30px";
  bonus.style.height = "30px";
  bonus.style.background = "yellow";
  bonus.style.borderRadius = "50%";
  bonus.style.top = Math.random() * (window.innerHeight - 50) + "px";
  bonus.style.left = Math.random() * (window.innerWidth - 50) + "px";
  bonus.style.cursor = "pointer";
  bonus.style.zIndex = "5";
  document.body.appendChild(bonus);

  bonus.addEventListener("click", () => {
    count += 5;
    counter.textContent = count;
    // Mise à jour de la couleur
    updatePupilColor();
    bonus.remove();
  });

  setTimeout(() => {
    bonus.remove();
  }, 5000);
}

// Spawn bonus aléatoire toutes les 10 secondes
setInterval(spawnBonus, 10000);

// FONCTION POUR CHANGER LA COULEUR DE LA PUPILLE SELON LE SCORE
function updatePupilColor() {
  let color = "black"; // couleur par défaut

  if (count >= 0 && count <= 999) color = "black";
  else if (count >= 1000 && count <= 1999) color = "blue";
  else if (count >= 2000 && count <= 2999) color = "green";
  else if (count >= 3000 && count <= 3999) color = "violet";
  else if (count >= 4000 && count <= 4999) color = "red";
  else if (count >= 5000 && count <= 5999) color = "cyan";
  else if (count >= 6000 && count <= 7999) color = "gold";
  else if (count >= 8000 && count <= 12999) color = "hotpink";

  pupil.style.backgroundColor = color;

  // Glow pour couleurs "prestigieuses"
  if (["cyan", "gold", "hotpink"].includes(color)) {
    pupil.style.boxShadow = `0 0 20px ${color}`;
  } else {
    pupil.style.boxShadow = "none";
  }
}
