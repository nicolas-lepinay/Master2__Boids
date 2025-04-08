// globals.ts
import { Boid } from "./Boid.js";
import { Predator } from "./Predator.js";
import { SimulationMode } from "./types.js";

class GlobalVarsClass {
  // Variables "privées" modifiables via getters/setters
  private _width = 150;
  private _height = 150;
  private _visualRange = 75;
  private _cohesionFactor = 0.005;
  private _separationFactor = 0.05;
  private _alignmentFactor = 0.05;
  private _turnFactor = 1;
  private _showTrail = false;
  private _trailLength = 50;
  private _boidMaxSpeed = 15;
  private _predatorMaxSpeed = 15;
  private _predatorChaseFactor = 0.02;
  private _mouseAttractFactor = 0.01;
  private _killMode = true;
  public mode: SimulationMode = SimulationMode.Default;

  // Tableau global de boids
  public boids: Boid[] = [];

  // Tableau des prédateurs
  public predators: Predator[] = [];

  // Position de la souris
  public mouseX = 0;
  public mouseY = 0;

  // ---- GETTERS/SETTERS ----
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

  get predatorMaxSpeed(): number {
    return this._predatorMaxSpeed;
  }
  set predatorMaxSpeed(value: number) {
    this._predatorMaxSpeed = value;
  }

  get predatorChaseFactor(): number {
    return this._predatorChaseFactor;
  }
  set predatorChaseFactor(value: number) {
    this._predatorChaseFactor = value;
  }

  get boidMaxSpeed(): number {
    return this._boidMaxSpeed;
  }
  set boidMaxSpeed(value: number) {
    this._boidMaxSpeed = value;
  }

  get mouseAttractFactor(): number {
    return this._mouseAttractFactor;
  }
  set mouseAttractFactor(value: number) {
    this._mouseAttractFactor = value;
  }

  get turnFactor(): number {
    return this._turnFactor;
  }
  set turnFactor(value: number) {
    this._turnFactor = value;
  }

  get killMode(): boolean {
    return this._killMode;
  }
  set killMode(value: boolean) {
    this._killMode = value;
  }


  // ---- MÉTHODES ----
  public setCanvasSize(w: number, h: number) {
    this._width = w;
    this._height = h;
  }

  public reset(): void {
    // Remet toutes les valeurs par défaut
    this._width = 150;
    this._height = 150;
    this._visualRange = 75;
    this._cohesionFactor = 0.005;
    this._separationFactor = 0.05;
    this._alignmentFactor = 0.05;
    this._turnFactor = 1;
    //this._showTrail = false;
    this._trailLength = 50;
    this._boidMaxSpeed = 15;
    this._predatorMaxSpeed = 15;
    this._predatorChaseFactor = 0.02;
    this._mouseAttractFactor = 0.01;
    //this._killMode = true;
    
    // Vide et réinitialise le tableau de boids
    this.boids = [];
  }
}

// On exporte une instance unique
export const GlobalVars = new GlobalVarsClass();
