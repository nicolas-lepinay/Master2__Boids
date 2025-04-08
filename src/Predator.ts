import { Boid } from "./Boid.js";
import { GlobalVars } from "./globals.js";
import { SimulationMode } from "./types.js";

/**
 * Un prédateur est un boid qui cherche à se rapprocher
 * des boids les plus proches pour les "chasser".
 */
export class Predator extends Boid {
  constructor(x: number, y: number, dx: number, dy: number) {
    super(x, y, dx, dy);
  }

  /**
   * Le prédateur cherche la position moyenne des boids
   * ou le boid le plus proche, puis s'en approche.
   */
  private chaseBoids(allBoids: Boid[]): void {
    if (!allBoids.length) return;
    let targetX = 0;
    let targetY = 0;
    let count = 0;

    // EXEMPLE 1 : se diriger vers le centre de tous les boids
    /*
    for (const b of allBoids) {
      targetX += b.x;
      targetY += b.y;
      count++;
    }
    targetX /= count;
    targetY /= count;

    // On se rapproche du centre
    const chaseFactor = 0.01;
    this.dx += (targetX - this.x) * chaseFactor;
    this.dy += (targetY - this.y) * chaseFactor;
    */

    // EXEMPLE 2 : se diriger vers le boid le plus proche
    let closest: Boid | null = null;
    let minDist = Infinity;
    for (const b of allBoids) {
       const d = this.distanceTo(b);
       if (d < minDist) {
         minDist = d;
         closest = b;
       }
     }
     if (closest) {
       this.dx += (closest.x - this.x) * GlobalVars.predatorChaseFactor;
       this.dy += (closest.y - this.y) * GlobalVars.predatorChaseFactor;
     }
  }

  // Le prédateur fait disparaître les boids touchés
  private killBoid(): void {
    const hitbox = 30;
    GlobalVars.boids = GlobalVars.boids.filter(boid => {
    const d = this.distanceTo(boid);
        return d > hitbox;
    });
  }

  protected override limitSpeed(): void {
    const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    if (speed > GlobalVars.predatorMaxSpeed) {
      this.dx = (this.dx / speed) * GlobalVars.predatorMaxSpeed;
      this.dy = (this.dy / speed) * GlobalVars.predatorMaxSpeed;
    }
  }

   /**
   * On surcharge la méthode update pour un comportement différent.
   * Si tu veux, tu peux reprendre des méthodes boid, ou en ignorer certaines.
   */
    public override update(allBoids: Boid[]): void {
        // Le prédateur va se rapprocher de la position moyenne des boids (ou du boid le plus proche) pour les chasser.
        this.chaseBoids(allBoids);
        this.limitSpeed();
        this.keepWithinBounds();
        this.killBoid();
    
        // Mise à jour position
        this.x += this.dx;
        this.y += this.dy;
    
        // Mise à jour historique (si on veut voir sa traînée)
        if (GlobalVars.showTrail) this.recordHistory();
    }
}
