// functions.ts
import { Boid } from "./Boid.js";
import { GlobalVars } from "./globals.js";

export function initBoids(): void {
  // On crée 100 boids, comme avant
  for (let i = 0; i < 100; i++) {
    GlobalVars.boids.push({
      x: Math.random() * GlobalVars.width,
      y: Math.random() * GlobalVars.height,
      dx: Math.random() * 10 - 5,
      dy: Math.random() * 10 - 5,
      history: [],
    });
  }
}

export function distance(boid1: Boid, boid2: Boid): number {
  return Math.sqrt(
    (boid1.x - boid2.x) ** 2 + (boid1.y - boid2.y) ** 2
  );
}

export function nClosestBoids(boid: Boid, n: number): Boid[] {
  const sorted = GlobalVars.boids.slice();
  sorted.sort((a, b) => distance(boid, a) - distance(boid, b));
  return sorted.slice(1, n + 1);
}

/**
 * Redimensionne le canvas pour occuper toute la fenêtre.
 */
export function sizeCanvas(): void {
  const canvas = document.getElementById("boids") as HTMLCanvasElement;
  if (!canvas) return;

  // Met à jour GlobalVars (width, height)
  GlobalVars.setCanvasSize(window.innerWidth, window.innerHeight);

  canvas.width = GlobalVars.width;
  canvas.height = GlobalVars.height;
}

export function keepWithinBounds(boid: Boid): void {
  const margin = 200;
  const turnFactor = 1;

  if (boid.x < margin) {
    boid.dx += turnFactor;
  }
  if (boid.x > GlobalVars.width - margin) {
    boid.dx -= turnFactor;
  }
  if (boid.y < margin) {
    boid.dy += turnFactor;
  }
  if (boid.y > GlobalVars.height - margin) {
    boid.dy -= turnFactor;
  }
}

export function flyTowardsCenter(boid: Boid): void {
  let centerX = 0;
  let centerY = 0;
  let numNeighbors = 0;

  for (const other of GlobalVars.boids) {
    if (distance(boid, other) < GlobalVars.visualRange) {
      centerX += other.x;
      centerY += other.y;
      numNeighbors += 1;
    }
  }

  if (numNeighbors > 0) {
    centerX /= numNeighbors;
    centerY /= numNeighbors;
    // On utilise GlobalVars.cohesionFactor
    boid.dx += (centerX - boid.x) * GlobalVars.cohesionFactor;
    boid.dy += (centerY - boid.y) * GlobalVars.cohesionFactor;
  }
}

export function avoidOthers(boid: Boid): void {
  const minDistance = 20;
  let moveX = 0;
  let moveY = 0;

  for (const other of GlobalVars.boids) {
    if (other !== boid) {
      if (distance(boid, other) < minDistance) {
        moveX += boid.x - other.x;
        moveY += boid.y - other.y;
      }
    }
  }

  boid.dx += moveX * GlobalVars.separationFactor;
  boid.dy += moveY * GlobalVars.separationFactor;
}

export function matchVelocity(boid: Boid): void {
  let avgDX = 0;
  let avgDY = 0;
  let numNeighbors = 0;

  for (const other of GlobalVars.boids) {
    if (distance(boid, other) < GlobalVars.visualRange) {
      avgDX += other.dx;
      avgDY += other.dy;
      numNeighbors += 1;
    }
  }

  if (numNeighbors > 0) {
    avgDX /= numNeighbors;
    avgDY /= numNeighbors;
    boid.dx += (avgDX - boid.dx) * GlobalVars.alignmentFactor;
    boid.dy += (avgDY - boid.dy) * GlobalVars.alignmentFactor;
  }
}

export function limitSpeed(boid: Boid): void {
  const speedLimit = 15;
  const speed = Math.sqrt(boid.dx ** 2 + boid.dy ** 2);
  if (speed > speedLimit) {
    boid.dx = (boid.dx / speed) * speedLimit;
    boid.dy = (boid.dy / speed) * speedLimit;
  }
}

export function drawBoid(ctx: CanvasRenderingContext2D, boid: Boid): void {
  const angle = Math.atan2(boid.dy, boid.dx);

  ctx.translate(boid.x, boid.y);
  ctx.rotate(angle);
  ctx.translate(-boid.x, -boid.y);

  ctx.fillStyle = "#F455A4FF";
  ctx.beginPath();
  ctx.moveTo(boid.x, boid.y);
  ctx.lineTo(boid.x - 15, boid.y + 5);
  ctx.lineTo(boid.x - 15, boid.y - 5);
  ctx.lineTo(boid.x, boid.y);
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (GlobalVars.showTrail && boid.history.length > 1) {
    ctx.strokeStyle = "#F455A48F";
    ctx.beginPath();
    ctx.moveTo(boid.history[0][0], boid.history[0][1]);
    for (const point of boid.history) {
      ctx.lineTo(point[0], point[1]);
    }
    ctx.stroke();
  }
}

export function animationLoop(): void {
  // Met à jour chaque boid
  for (const boid of GlobalVars.boids) {
    flyTowardsCenter(boid);
    avoidOthers(boid);
    matchVelocity(boid);
    limitSpeed(boid);
    keepWithinBounds(boid);

    boid.x += boid.dx;
    boid.y += boid.dy;

    boid.history.push([boid.x, boid.y]);
    boid.history = boid.history.slice(-GlobalVars.trailLength);
  }

  const canvas = document.getElementById("boids") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, GlobalVars.width, GlobalVars.height);

  for (const boid of GlobalVars.boids) {
    drawBoid(ctx, boid);
  }

  // Replanifie la frame suivante
  window.requestAnimationFrame(animationLoop);
}
