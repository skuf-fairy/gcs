import {IGameScript} from '../core.types';

interface IGameLevel {
  startUp(...script: IGameScript[]): void;
  destroy(): void;
}

export class LevelManager {
  private currentLevel: IGameLevel | null;
  private levelQueue: IGameLevel[];

  constructor() {
    this.levelQueue[0];
  }

  public addLevel(level: IGameLevel): void {
    this.levelQueue.push(level);
  }

  public nextLevel(): void {
    this.currentLevel?.destroy();
    this.currentLevel = this.levelQueue.shift() || null;
    this.currentLevel?.startUp();
  }

  public startLevel(): void {
    this.currentLevel?.startUp();
  }
}
