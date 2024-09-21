import {IGameScript} from '../../../core/core.types';

export class TestScript implements IGameScript {
  public counter: number;
  public isCreated: boolean;
  public isDestroyed: boolean;

  constructor() {
    this.counter = 0;
    this.isCreated = false;
    this.isDestroyed = false;
  }

  public create(): void {
    this.isCreated = true;
  }

  public update(): void {
    this.counter++;
  }

  public destroy(): void {
    this.isDestroyed = true;
  }
}
