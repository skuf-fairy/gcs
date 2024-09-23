import {IDimensions, IRenderer} from '../core/core.types';

// болванка для отрисовщика, нужен для инициализации DI контейнера
export class FakeRenderer implements IRenderer<FakeContainer> {
  rootContainer: FakeContainer;

  constructor() {
    this.rootContainer = new FakeContainer();
  }

  public create(): void {}

  public getFrameDimensions(): IDimensions {
    return {width: 0, height: 0};
  }
}

class FakeContainer {
  container: any[];

  constructor() {
    this.container = [];
  }

  public removeChildren(): void {
    this.container = [];
  }

  public addChild(child: any): void {
    this.container.push(child);
  }

  public removeChild(child: any): void {
    this.container = this.container.filter((c) => c === child);
  }
}
