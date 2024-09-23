import {GameLifeCycle} from './game-loop/GameLifeCycle';
import {GameScripts} from './updatable-entities/GameScripts';
import {GameTime} from './updatable-entities/GameTime';
import {GameWorld} from './updatable-entities/GameWorld';

import {VisibilityChangeListener} from './updatable-entities/VisibilityChangeListener';
import {AnyRenderer, IGameRenderer, IGameWorldContainer} from './core.types';

export class Scope<Container extends IGameWorldContainer, Renderer extends AnyRenderer<Container>> {
  constructor(
    public readonly world: GameWorld,
    public readonly time: GameTime,
    public readonly scripts: GameScripts,
    public readonly renderer: IGameRenderer<Container, Renderer>,
    public readonly gameLifeCycle: GameLifeCycle,
    // todo добавлять как плагин?
    private readonly visibilityChangeListener: VisibilityChangeListener,
  ) {
    this.visibilityChangeListener.bindScope(this);
  }

  public destroy(): void {
    this.gameLifeCycle.onDestroy?.();
    this.scripts.onDestroy?.();
    this.world.onDestroy?.();
    this.renderer.onDestroy?.();
  }

  public clear(): void {
    this.world.clear();
    this.scripts.clear();
    this.renderer.clear();
    this.gameLifeCycle.reset();
  }

  public pause = (): void => {
    this.gameLifeCycle.onPause?.();
  };

  public resume = (): void => {
    this.gameLifeCycle.onResume?.();
  };

  public start = (): void => {
    this.gameLifeCycle.gameLoop.onDestroy?.();
    this.gameLifeCycle.gameLoop.addEntity(
      this.visibilityChangeListener,
      this.time,
      this.world,
      this.scripts,
      this.renderer,
    );
    this.gameLifeCycle.onStart?.();
  };

  public stop = (): void => {
    this.gameLifeCycle.onStop?.();
  };
}
