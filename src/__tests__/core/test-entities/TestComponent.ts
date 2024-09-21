import {BaseComponent} from '../../../components/BaseComponent';

export class TestComponent extends BaseComponent {
  public counter: number;
  public isCreated: boolean;
  public isDestroyed: boolean;

  constructor() {
    super();

    this.counter = 0;
    this.isCreated = false;
    this.isDestroyed = false;
  }

  public onAddToGameObject(): void {
    this.isCreated = true;
  }

  public update(): void {
    this.counter++;
  }

  public destroy(): void {
    this.isDestroyed = true;
  }
}
