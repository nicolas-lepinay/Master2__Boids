import {
    sizeCanvas,
    initBoids,
    animationLoop
  } from "./functions.js";
  import { GlobalVars } from "./globals.js";
  
  window.onload = () => {
    // Ajuste la taille du canvas
    window.addEventListener("resize", sizeCanvas, false);
    sizeCanvas();
  
    // Initialise les boids
    initBoids();
  
    // Lance l'animation
    window.requestAnimationFrame(animationLoop);
  
    // --- GESTION DU MENU HAMBURGER ---
    const hamburgerBtn = document.getElementById("hamburgerBtn") as HTMLButtonElement;
    const sidebar = document.getElementById("sidebar") as HTMLDivElement;
  
    hamburgerBtn?.addEventListener("click", () => {
      sidebar?.classList.toggle("open");
    });
  
    // --- RECUPERATION DES ELEMENTS INTERACTIFS ---
    const cohesionSlider = document.getElementById("cohesionSlider") as HTMLInputElement;
    const separationSlider = document.getElementById("separationSlider") as HTMLInputElement;
    const alignmentSlider = document.getElementById("alignmentSlider") as HTMLInputElement;
    const rangeSlider = document.getElementById("rangeSlider") as HTMLInputElement;
    const trailCheckbox = document.getElementById("trailCheckbox") as HTMLInputElement;
    const trailLengthSlider = document.getElementById("trailLengthSlider") as HTMLInputElement;
    const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
  
    // --- INITIALISATION DES VALEURS DES SLIDERS/UI (optionnel) ---
    // Au cas où tu veux partir des valeurs par défaut stockées dans GlobalVars
    if (cohesionSlider) {
      cohesionSlider.value = String(GlobalVars.cohesionFactor);
    }
    if (separationSlider) {
      separationSlider.value = String(GlobalVars.separationFactor);
    }
    if (alignmentSlider) {
      alignmentSlider.value = String(GlobalVars.alignmentFactor);
    }
    if (rangeSlider) {
      rangeSlider.value = String(GlobalVars.visualRange);
    }
    if (trailCheckbox) {
      trailCheckbox.checked = GlobalVars.showTrail;
    }
    if (trailLengthSlider) {
      trailLengthSlider.value = String(GlobalVars.trailLength);
    }
  
    // --- ECOUTEURS D'EVENEMENTS ---
    // Cohesion
    cohesionSlider?.addEventListener("input", () => {
      GlobalVars.cohesionFactor = parseFloat(cohesionSlider.value);
    });
  
    // Separation
    separationSlider?.addEventListener("input", () => {
      GlobalVars.separationFactor = parseFloat(separationSlider.value);
    });
  
    // Alignment
    alignmentSlider?.addEventListener("input", () => {
      GlobalVars.alignmentFactor = parseFloat(alignmentSlider.value);
    });
  
    // Visual Range
    rangeSlider?.addEventListener("input", () => {
      GlobalVars.visualRange = parseFloat(rangeSlider.value);
    });
  
    // Show Trail
    trailCheckbox?.addEventListener("change", () => {
      GlobalVars.showTrail = trailCheckbox.checked;
    });
  
    // Trail Length
    trailLengthSlider?.addEventListener("input", () => {
      GlobalVars.trailLength = parseFloat(trailLengthSlider.value);
    });
  
    // --- BOUTON RESET ---
    resetBtn?.addEventListener("click", () => {
      // 1) Remettre tout dans GlobalVars à zéro
      GlobalVars.reset();
  
      // 2) Re-générer le canvas
      // sizeCanvas();
  
      // 3) Réinitialiser le tableau des boids
      // initBoids();
  
      // 4) Synchroniser l'UI (sliders, checkbox)
      if (cohesionSlider) {
        cohesionSlider.value = String(GlobalVars.cohesionFactor);
      }
      if (separationSlider) {
        separationSlider.value = String(GlobalVars.separationFactor);
      }
      if (alignmentSlider) {
        alignmentSlider.value = String(GlobalVars.alignmentFactor);
      }
      if (rangeSlider) {
        rangeSlider.value = String(GlobalVars.visualRange);
      }
      if (trailCheckbox) {
        trailCheckbox.checked = GlobalVars.showTrail;
      }
      if (trailLengthSlider) {
        trailLengthSlider.value = String(GlobalVars.trailLength);
      }
    });
  };
  