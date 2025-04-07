// globals.ts
import { Boid } from "./Boid.js";

class GlobalVarsClass {
  private _width = 150;
  private _height = 150;
  private _visualRange = 75;
  private _cohesionFactor = 0.005;
  private _separationFactor = 0.05;
  private _alignmentFactor = 0.05;
  private _showTrail = false;
  private _trailLength = 50;

  // On stocke directement les boids ici
  public boids: Boid[] = [];

  // --- GETTERS/SETTERS ---

  get width(): number {
    return this._width;
  }
  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }
  set height(value: number) {
    this._height = value;
  }

  get visualRange(): number {
    return this._visualRange;
  }
  set visualRange(value: number) {
    this._visualRange = value;
  }

  get cohesionFactor(): number {
    return this._cohesionFactor;
  }
  set cohesionFactor(value: number) {
    this._cohesionFactor = value;
  }

  get separationFactor(): number {
    return this._separationFactor;
  }
  set separationFactor(value: number) {
    this._separationFactor = value;
  }

  get alignmentFactor(): number {
    return this._alignmentFactor;
  }
  set alignmentFactor(value: number) {
    this._alignmentFactor = value;
  }

  get showTrail(): boolean {
    return this._showTrail;
  }
  set showTrail(value: boolean) {
    this._showTrail = value;
  }

  get trailLength(): number {
    return this._trailLength;
  }
  set trailLength(value: number) {
    this._trailLength = value;
  }

  // --- MÉTHODES ---

  // Permet d'ajuster la taille du canvas
  public setCanvasSize(w: number, h: number): void {
    this._width = w;
    this._height = h;
  }

  // Permet de tout remettre par défaut
  public reset(): void {
    this._width = 150;
    this._height = 150;
    this._visualRange = 75;
    this._cohesionFactor = 0.005;
    this._separationFactor = 0.05;
    this._alignmentFactor = 0.05;
    this._showTrail = false;
    this._trailLength = 50;

    this.boids = [];
  }
}

// On exporte une instance unique
export const GlobalVars = new GlobalVarsClass();
