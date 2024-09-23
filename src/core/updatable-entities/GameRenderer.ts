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

  public onStop(): void {
    this.renderer.onStop?.();
  }

  public onStart(): void {
    this.renderer.onStart?.();
  }

  public onUpdate(delta: number): void {
    this.renderer.onUpdate?.(delta);
  }

  public onDestroy(): void {
    this.renderer?.onDestroy?.();
  }

  public onPause(): void {
    this.renderer.onPause?.();
  }

  public onResume(): void {
    this.renderer.onResume?.();
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
