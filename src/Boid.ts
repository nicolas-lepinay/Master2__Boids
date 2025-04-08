// Boid.ts
import { GlobalVars } from "./globals.js";
import { SimulationMode } from "./types.js";

/**
 * Classe représentant un boid, avec la logique
 * de flocking (cohésion, séparation, alignement)
 * intégrée dans ses méthodes.
 */
export class Boid {
  public x: number;
  public y: number;
  public dx: number;
  public dy: number;
  public history: Array<[number, number]> = [];

  constructor(x: number, y: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  private flyTowardsCenter(allBoids: Boid[]): void {
    let centerX = 0;
    let centerY = 0;
    let numNeighbors = 0;

    for (const other of allBoids) {
      if (other !== this) {
        if (this.distanceTo(other) < GlobalVars.visualRange) {
          centerX += other.x;
          centerY += other.y;
          numNeighbors++;
        }
      }
    }

    if (numNeighbors > 0) {
      centerX /= numNeighbors;
      centerY /= numNeighbors;
      this.dx += (centerX - this.x) * GlobalVars.cohesionFactor;
      this.dy += (centerY - this.y) * GlobalVars.cohesionFactor;
    }
  }

  private avoidOthers(allBoids: Boid[]): void {
    const minDistance = 20;
    let moveX = 0;
    let moveY = 0;

    for (const other of allBoids) {
      if (other !== this) {
        if (this.distanceTo(other) < minDistance) {
          moveX += this.x - other.x;
          moveY += this.y - other.y;
        }
      }
    }

    this.dx += moveX * GlobalVars.separationFactor;
    this.dy += moveY * GlobalVars.separationFactor;
  }

  private matchVelocity(allBoids: Boid[]): void {
    let avgDX = 0;
    let avgDY = 0;
    let numNeighbors = 0;

    for (const other of allBoids) {
      if (other !== this) {
        if (this.distanceTo(other) < GlobalVars.visualRange) {
          avgDX += other.dx;
          avgDY += other.dy;
          numNeighbors++;
        }
      }
    }

    if (numNeighbors > 0) {
      avgDX /= numNeighbors;
      avgDY /= numNeighbors;
      this.dx += (avgDX - this.dx) * GlobalVars.alignmentFactor;
      this.dy += (avgDY - this.dy) * GlobalVars.alignmentFactor;
    }
  }

  private avoidPredators(): void {
    // On parcourt GlobalVars.predators
    // et si un prédateur est trop proche, on s'en éloigne
    for (const predator of GlobalVars.predators) {
      const dist = this.distanceTo(predator);
      const safeDistance = 80; // distance à laquelle on fuit
      if (dist < safeDistance) {
        // On s’éloigne proportionnellement
        const fleeFactor = 0.05;
        this.dx += (this.x - predator.x) * fleeFactor;
        this.dy += (this.y - predator.y) * fleeFactor;
      }
    }
  }

  private moveTowardsMouse(): void {
    const { mouseX, mouseY } = GlobalVars;
    const dist = Math.hypot(mouseX - this.x, mouseY - this.y);
  
    if (dist < GlobalVars.visualRange) {
      this.dx += (mouseX - this.x) * GlobalVars.mouseAttractFactor;
      this.dy += (mouseY - this.y) * GlobalVars.mouseAttractFactor;
    }
  }

  protected distanceTo(other: Boid): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  protected limitSpeed(): void {
    const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    if (speed > GlobalVars.boidMaxSpeed) {
      this.dx = (this.dx / speed) * GlobalVars.boidMaxSpeed;
      this.dy = (this.dy / speed) * GlobalVars.boidMaxSpeed;
    }
  }

  protected keepWithinBounds(): void {
    const margin = 200;

    if (this.x < margin) {
      this.dx += GlobalVars.turnFactor;
    } else if (this.x > GlobalVars.width - margin) {
      this.dx -= GlobalVars.turnFactor;
    }

    if (this.y < margin) {
      this.dy += GlobalVars.turnFactor;
    } else if (this.y > GlobalVars.height - margin) {
      this.dy -= GlobalVars.turnFactor;
    }
  }

  protected recordHistory(): void {
    this.history.push([this.x, this.y]);
    this.history = this.history.slice(-GlobalVars.trailLength);
  }

    /**
   * Méthode principale pour mettre à jour ce boid :
   * - Applique successivement les règles (cohésion, etc.)
   * - Met à jour la position
   * - Gère l'historique
   */
    public update(allBoids: Boid[]): void {
        this.flyTowardsCenter(allBoids);
        this.avoidOthers(allBoids);
        this.matchVelocity(allBoids);
        this.limitSpeed();
        this.keepWithinBounds();
    
        if (GlobalVars.mode === SimulationMode.Predator) this.avoidPredators();
        if (GlobalVars.mode === SimulationMode.FollowMouse) this.moveTowardsMouse();
    
        // Mise à jour de la position
        this.x += this.dx;
        this.y += this.dy;
    
        // Mémorise la position (pour la traînée)
        if (GlobalVars.showTrail) this.recordHistory();
    }
}
