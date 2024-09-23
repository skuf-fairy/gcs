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

  public onUpdate(): void {
    this.counter++;
  }

  public onDestroy(): void {
    this.isDestroyed = true;
  }
}
