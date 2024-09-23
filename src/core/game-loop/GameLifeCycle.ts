import {IGameLifeCycle, GameLoopEvents, IGameLoop} from '../core.types';

import {GameLoopState, GameState} from './GameState';
import {GameStateEvents} from './GameStateEvents';

export class GameLifeCycle implements IGameLifeCycle {
  constructor(
    public readonly gameState: GameState,
    public readonly gameStateEvents: GameStateEvents,
    public readonly gameLoop: IGameLoop,
  ) {}

  public onDestroy(): void {
    this.gameLoop.onDestroy?.();
    this.gameState.setState(GameLoopState.Idle);
  }

  public onPause(): void {
    if (this.gameState.isUpdatingState()) {
      this.gameState.setState(GameLoopState.Paused);
      this.gameStateEvents.emitEvent(GameLoopEvents.Pause);
      this.gameLoop.onPause?.();
    }
  }

  public onResume(): void {
    if (this.gameState.isPausedState()) {
      this.gameState.setState(GameLoopState.Updating);
      this.gameStateEvents.emitEvent(GameLoopEvents.Resume);
      this.gameLoop.onResume?.();
    }
  }

  public onStart(): void {
    if (this.gameState.isIdleState() || this.gameState.isStoppedState()) {
      this.gameState.setState(GameLoopState.Updating);
      this.gameStateEvents.emitEvent(GameLoopEvents.Start);

      this.gameLoop.onStart?.();
    }
  }

  public onStop(): void {
    if (this.gameState.isUpdatingState()) {
      this.gameState.setState(GameLoopState.Stopped);
      this.gameStateEvents.emitEvent(GameLoopEvents.Stop);
      this.gameLoop.onStop?.();
    }
  }

  public reset(): void {
    this.gameLoop.onStop?.();
    this.gameState.setState(GameLoopState.Idle);
  }
}
