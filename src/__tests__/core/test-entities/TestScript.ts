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

  public onCreate(): void {
    this.isCreated = true;
  }

  public onUpdate(): void {
    this.counter++;
  }

  public onDestroy(): void {
    this.isDestroyed = true;
  }
}
