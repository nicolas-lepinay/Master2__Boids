// functions.ts
import { Boid } from "./Boid.js";
import { Predator } from "./Predator.js";
import { GlobalVars } from "./globals.js";

/**
 * Crée un certain nombre de boids et les stocke dans GlobalVars.boids.
 */
export function initBoids(count = 100): void {
  // On vide d'abord le tableau si besoin
  GlobalVars.boids = [];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * GlobalVars.width;
    const y = Math.random() * GlobalVars.height;
    const dx = Math.random() * 10 - 5;
    const dy = Math.random() * 10 - 5;
    const boid = new Boid(x, y, dx, dy);
    GlobalVars.boids.push(boid);
  }
}

/**
 * Ajuste la taille du canvas pour occuper toute la fenêtre.
 */
export function sizeCanvas(): void {
  const canvas = document.getElementById("boids") as HTMLCanvasElement;
  if (!canvas) return;

  // Met à jour GlobalVars
  GlobalVars.setCanvasSize(window.innerWidth, window.innerHeight);

  canvas.width = GlobalVars.width;
  canvas.height = GlobalVars.height;
}

/**
 * Dessine un boid sur le canvas.
 */
export function drawBoid(ctx: CanvasRenderingContext2D, boid: Boid): void {
  const angle = Math.atan2(boid.dy, boid.dx);

  ctx.save();
  ctx.translate(boid.x, boid.y);
  ctx.rotate(angle);
  ctx.translate(-boid.x, -boid.y);

  ctx.fillStyle = "#C8CCCEFF";
  ctx.beginPath();
  ctx.moveTo(boid.x, boid.y);
  ctx.lineTo(boid.x - 15, boid.y + 5);
  ctx.lineTo(boid.x - 15, boid.y - 5);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // Gestion de la traînée (history)
  if (GlobalVars.showTrail && boid.history.length > 1) {
    ctx.strokeStyle = "#C8CCCE69";
    ctx.beginPath();
    ctx.moveTo(boid.history[0][0], boid.history[0][1]);
    for (let i = 1; i < boid.history.length; i++) {
      ctx.lineTo(boid.history[i][0], boid.history[i][1]);
    }
    ctx.stroke();
  }
}

/**
 * Boucle d'animation principale.
 * - Pour chaque boid, on appelle boid.update(GlobalVars.boids).
 * - Puis on dessine.
 */
export function animationLoop(): void {
    // 1. Mise à jour boids
    for (const boid of GlobalVars.boids) {
      boid.update(GlobalVars.boids);
    }
  
    // 2. Mise à jour prédateurs
    for (const predator of GlobalVars.predators) {
      // Pour la cohérence, passons-lui aussi la liste de boids
      predator.update(GlobalVars.boids);
    }
  
    // 3. Dessin
    const canvas = document.getElementById("boids") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    ctx.clearRect(0, 0, GlobalVars.width, GlobalVars.height);
  
    // Dessine les boids
    for (const boid of GlobalVars.boids) {
      drawBoid(ctx, boid);
    }
  
    // Dessine les prédateurs (autre couleur ?)
    for (const predator of GlobalVars.predators) {
      drawPredator(ctx, predator);
    }
  
    requestAnimationFrame(animationLoop);
  }
  
  export function drawPredator(ctx: CanvasRenderingContext2D, predator: Predator) {
    const angle = Math.atan2(predator.dy, predator.dx);
    ctx.save();
    ctx.translate(predator.x, predator.y);
    ctx.rotate(angle);
    ctx.translate(-predator.x, -predator.y);
  
    ctx.fillStyle = "#6ACE66FF";
    ctx.beginPath();
    ctx.moveTo(predator.x, predator.y);
    ctx.lineTo(predator.x - 20, predator.y + 8);
    ctx.lineTo(predator.x - 20, predator.y - 8);
    ctx.closePath();
    ctx.fill();
  
    ctx.restore();
  
    // Éventuelle traînée du prédateur si souhaité
    if (GlobalVars.showTrail && predator.history.length > 1) {
      ctx.strokeStyle = "#7BD37883";
      ctx.beginPath();
      ctx.moveTo(predator.history[0][0], predator.history[0][1]);
      for (let i = 1; i < predator.history.length; i++) {
        ctx.lineTo(predator.history[i][0], predator.history[i][1]);
      }
      ctx.stroke();
    }
  }
  
