import {IGameScript, IGameScripts} from '../../core/core.types';
import {GameLifeCycleEntityContainer} from '../../utils/GameLifeCycleEntityContainer';

export class GameScripts extends GameLifeCycleEntityContainer<string, IGameScript> implements IGameScripts {
  public addScript(...scripts: IGameScript[]): void {
    scripts.forEach((s) => {
      s.onCreate?.();
      this.pushEntity(s.constructor.name, s);
    });
  }

  public clear(): void {
    this.onDestroy();
  }
}
