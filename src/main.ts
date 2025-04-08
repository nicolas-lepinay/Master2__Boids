import { sizeCanvas, initBoids, animationLoop } from "./functions.js";
import { GlobalVars } from "./globals.js";
import { Predator } from "./Predator.js";
import { SimulationMode } from "./types.js";

window.onload = () => {
  // 1) Adapter la taille du canvas à la fenêtre
  window.addEventListener("resize", sizeCanvas, false);
  sizeCanvas();

  // 2) Créer les boids (par exemple 100)
  initBoids(100);

  // 3) Lancer l'animation
  window.requestAnimationFrame(animationLoop);

  // 4) Gérer le menu hamburger (bouton ☰ en haut à gauche)
  const hamburgerBtn = document.getElementById("hamburgerBtn") as HTMLButtonElement;
  const sidebar = document.getElementById("sidebar") as HTMLDivElement;

  hamburgerBtn?.addEventListener("click", () => {
    sidebar?.classList.toggle("open");
  });

  // 5) Récupérer les éléments du menu (sliders, checkbox, bouton Reset)
  const cohesionSlider = document.getElementById("cohesionSlider") as HTMLInputElement;
  const separationSlider = document.getElementById("separationSlider") as HTMLInputElement;
  const alignmentSlider = document.getElementById("alignmentSlider") as HTMLInputElement;
  const rangeSlider = document.getElementById("rangeSlider") as HTMLInputElement;
  const turnSlider = document.getElementById("turnSlider") as HTMLInputElement;
  const speedSlider = document.getElementById("speedSlider") as HTMLInputElement;
  const trailCheckbox = document.getElementById("trailCheckbox") as HTMLInputElement;
  const trailLengthSlider = document.getElementById("trailLengthSlider") as HTMLInputElement;
  const predatorSpeedSlider = document.getElementById("predatorSpeedSlider") as HTMLInputElement;
  const predatorChaseFactorSlider = document.getElementById("predatorChaseFactorSlider") as HTMLInputElement;

  const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
  const modeDefaultBtn = document.getElementById("modeDefaultBtn") as HTMLButtonElement;
  const modePredatorBtn = document.getElementById("modePredatorBtn") as HTMLButtonElement;
  const modeFollowMouseBtn = document.getElementById("modeFollowMouseBtn") as HTMLButtonElement;

  // 6) Initialiser l'UI à partir de GlobalVars
  if (cohesionSlider) cohesionSlider.value = String(GlobalVars.cohesionFactor);
  if (separationSlider) separationSlider.value = String(GlobalVars.separationFactor);
  if (alignmentSlider) alignmentSlider.value = String(GlobalVars.alignmentFactor);
  if (rangeSlider) rangeSlider.value = String(GlobalVars.visualRange);
  if (turnSlider) turnSlider.value = String(GlobalVars.turnFactor);
  if (trailCheckbox) trailCheckbox.checked = GlobalVars.showTrail;
  if (trailLengthSlider) trailLengthSlider.value = String(GlobalVars.trailLength);
  if (speedSlider) speedSlider.value = String(GlobalVars.boidMaxSpeed);
  if (predatorSpeedSlider) predatorSpeedSlider.value = String(GlobalVars.predatorMaxSpeed);
  if (predatorChaseFactorSlider) predatorChaseFactorSlider.value = String(GlobalVars.predatorChaseFactor);

  // 7) Écouter les événements de chaque slider/checkbox
  cohesionSlider?.addEventListener("input", () => {
    GlobalVars.cohesionFactor = parseFloat(cohesionSlider.value);
  });

  separationSlider?.addEventListener("input", () => {
    GlobalVars.separationFactor = parseFloat(separationSlider.value);
  });

  alignmentSlider?.addEventListener("input", () => {
    GlobalVars.alignmentFactor = parseFloat(alignmentSlider.value);
  });

  rangeSlider?.addEventListener("input", () => {
    GlobalVars.visualRange = parseFloat(rangeSlider.value);
  });

  turnSlider?.addEventListener("input", () => {
    GlobalVars.turnFactor = parseFloat(turnSlider.value);
  });

  trailCheckbox?.addEventListener("change", () => {
    GlobalVars.showTrail = trailCheckbox.checked;
  });

  trailLengthSlider?.addEventListener("input", () => {
    GlobalVars.trailLength = parseFloat(trailLengthSlider.value);
  });

  speedSlider?.addEventListener("input", () => {
    const val = parseFloat(speedSlider.value);
    GlobalVars.boidMaxSpeed = val;
  });

  predatorSpeedSlider?.addEventListener("input", () => {
    const val = parseFloat(predatorSpeedSlider.value);
    GlobalVars.predatorMaxSpeed = val;
  });

  predatorChaseFactorSlider?.addEventListener("input", () => {
    const val = parseFloat(predatorChaseFactorSlider.value);
    GlobalVars.predatorChaseFactor = val;
  });

  // 8) Bouton Reset pour revenir aux valeurs par défaut
  resetBtn?.addEventListener("click", () => {
    // a) Remet les variables globales aux valeurs de base
    GlobalVars.reset();

    // b) Redimensionne le canvas si besoin
    sizeCanvas();

    // c) Réinitialise le tableau des boids
    initBoids(100);

    // d) Met à jour l'UI (sliders, checkbox) pour refléter ces nouvelles valeurs
    if (cohesionSlider) cohesionSlider.value = String(GlobalVars.cohesionFactor);
    if (separationSlider) separationSlider.value = String(GlobalVars.separationFactor);
    if (alignmentSlider) alignmentSlider.value = String(GlobalVars.alignmentFactor);
    if (rangeSlider) rangeSlider.value = String(GlobalVars.visualRange);
    if (speedSlider) speedSlider.value = String(GlobalVars.boidMaxSpeed);
    if (turnSlider) turnSlider.value = String(GlobalVars.turnFactor);
    if (trailCheckbox) trailCheckbox.checked = GlobalVars.showTrail;
    if (trailLengthSlider) trailLengthSlider.value = String(GlobalVars.trailLength);
    if (predatorSpeedSlider) predatorSpeedSlider.value = String(GlobalVars.predatorMaxSpeed);
    if (predatorChaseFactorSlider) predatorChaseFactorSlider.value = String(GlobalVars.predatorChaseFactor);
  });

  modeDefaultBtn?.addEventListener("click", () => {
    // Repasse en mode Default
    GlobalVars.mode = SimulationMode.Default;
    // On vide les prédateurs
    GlobalVars.predators = [];
  });
  
  modePredatorBtn?.addEventListener("click", () => {
    // Passe en mode Predator
    GlobalVars.mode = SimulationMode.Predator;
    // On crée un prédateur, par ex. au centre
    const predator = new Predator(
      GlobalVars.width / 2,
      GlobalVars.height / 2,
      0, 0
    );
    // GlobalVars.predators = [predator];
    GlobalVars.predators.push(predator);
    })

    modeFollowMouseBtn?.addEventListener("click", () => {
        GlobalVars.mode = SimulationMode.FollowMouse;
        GlobalVars.predators = [];
    });

    window.addEventListener("mousemove", (e) => {
        GlobalVars.mouseX = e.clientX;
        GlobalVars.mouseY = e.clientY;
    });
};
