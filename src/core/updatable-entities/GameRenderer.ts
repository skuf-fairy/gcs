import {IDimensions, IGameWorldContainer, IRenderer, IGameRenderer, IAsyncRenderer} from '../../core/core.types';

export class GameRenderer<
  Container extends IGameWorldContainer,
  Renderer extends IAsyncRenderer<Container> | IRenderer<Container>,
> implements IGameRenderer<Container, Renderer>
{
  constructor(public readonly renderer: Renderer) {}

  public async asyncCreate(containerNode: HTMLElement): Promise<void> {
    await this.renderer.create(containerNode);
  }

  public create(containerNode: HTMLElement): void {
    this.renderer.create(containerNode);
  }

  public stop(): void {
    this.renderer.stop?.();
  }

  public start(): void {
    this.renderer.start?.();
  }

  public update(delta: number): void {
    this.renderer.update?.(delta);
  }

  public destroy(): void {
    this.renderer?.destroy?.();
  }

  public pause(): void {
    this.renderer.stop?.();
  }

  public resume(): void {
    this.renderer.start?.();
  }

  get dimensions(): IDimensions {
    return this.renderer.getFrameDimensions();
  }

  get container(): Container {
    return this.renderer.rootContainer;
  }

  public clear(): void {
    this.renderer.rootContainer.removeChildren();
  }
}
