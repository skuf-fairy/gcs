import {IGameLifeCycle, GameLoopEvents, IGameLoop} from '../core.types';

import {GameLoopState, GameState} from './GameState';
import {GameStateEvents} from './GameStateEvents';

export class GameLifeCycle implements IGameLifeCycle {
  constructor(
    public readonly gameState: GameState,
    public readonly gameStateEvents: GameStateEvents,
    public readonly gameLoop: IGameLoop,
  ) {}

  public destroy(): void {
    this.gameLoop.destroy?.();
    this.gameState.setState(GameLoopState.Idle);
  }

  public pause(): void {
    if (this.gameState.isUpdatingState()) {
      this.gameState.setState(GameLoopState.Paused);
      this.gameStateEvents.emitEvent(GameLoopEvents.Pause);
      this.gameLoop.pause?.();
    }
  }

  public resume(): void {
    if (this.gameState.isPausedState()) {
      this.gameState.setState(GameLoopState.Updating);
      this.gameStateEvents.emitEvent(GameLoopEvents.Resume);
      this.gameLoop.resume?.();
    }
  }

  public start(): void {
    if (this.gameState.isIdleState() || this.gameState.isStoppedState()) {
      this.gameState.setState(GameLoopState.Updating);
      this.gameStateEvents.emitEvent(GameLoopEvents.Start);

      this.gameLoop.start?.();
    }
  }

  public stop(): void {
    if (this.gameState.isUpdatingState()) {
      this.gameState.setState(GameLoopState.Stopped);
      this.gameStateEvents.emitEvent(GameLoopEvents.Stop);
      this.gameLoop.stop?.();
    }
  }

  public reset(): void {
    this.gameLoop.stop?.();
    this.gameState.setState(GameLoopState.Idle);
  }
}
