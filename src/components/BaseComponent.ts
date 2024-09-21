import {IGameObject, IGameObjectComponent, IGameWorld} from '../core/core.types';

export class BaseComponent implements IGameObjectComponent {
  public gameObject: IGameObject;
  public tag: string;

  constructor() {
    this.tag = 'untagged';
  }

  public bindGameObject(g: IGameObject): void {
    this.gameObject = g;
  }

  public onAddToGameObject(go: IGameObject): void {}

  public onAddToWorld(world: IGameWorld): void {}
}
