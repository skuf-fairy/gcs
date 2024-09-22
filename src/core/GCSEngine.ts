import {Vector2Utils} from '../utils/Vector2Utils';
import {GameLifeCycle} from './game-loop/GameLifeCycle';
import {GameScripts} from './updatable-entities/GameScripts';
import {GameTime} from './updatable-entities/GameTime';
import {GameWorld} from './updatable-entities/GameWorld';
import {EventEmitter} from 'eventemitter3';

import {VisibilityChangeListener} from './updatable-entities/VisibilityChangeListener';
import {Directions} from '../constants';
import {AnyRenderer, IGameRenderer, IGameWorldContainer} from './core.types';

export class GCSEngine<Container extends IGameWorldContainer, Renderer extends AnyRenderer<Container>> {
  static Vector2Utils = Vector2Utils;
  static EventEmitter = EventEmitter;
  static Directions = Directions;

  constructor(
    public readonly world: GameWorld,
    public readonly time: GameTime,
    public readonly scripts: GameScripts,
    public readonly renderer: IGameRenderer<Container, Renderer>,
    public readonly gameLifeCycle: GameLifeCycle,
    // todo добавлять как плагин?
    private readonly visibilityChangeListener: VisibilityChangeListener,
  ) {
    this.visibilityChangeListener.bindEngine(this);
  }

  public destroy(): void {
    this.gameLifeCycle.destroy?.();
    this.scripts.destroy?.();
    this.world.destroy?.();
    this.renderer.destroy?.();
  }

  public clear(): void {
    this.world.clear();
    this.scripts.clear();
    this.renderer.clear();
    this.gameLifeCycle.reset();
  }

  public pause(): void {
    this.gameLifeCycle.pause?.();
  }

  public resume = (): void => {
    this.gameLifeCycle.resume?.();
  };

  public start = (): void => {
    this.gameLifeCycle.gameLoop.destroy?.();
    this.gameLifeCycle.gameLoop.addEntity(
      this.visibilityChangeListener,
      this.time,
      this.world,
      this.scripts,
      this.renderer,
    );
    this.gameLifeCycle.start?.();
  };

  public stop = (): void => {
    this.gameLifeCycle.stop?.();
  };
}
