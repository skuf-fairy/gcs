import {EventEmitter} from 'eventemitter3';

export enum GameLoopState {
  Idle = 'Idle',
  Updating = 'Updating',
  Paused = 'Paused',
  Stopped = 'Stopped',
}

export class GameState {
  private state: GameLoopState;
  private readonly stateChangedEventName = 'stateChanged';

  constructor(private readonly eventEmitter: EventEmitter) {
    this.state = GameLoopState.Idle;
  }

  public isIdleState(): boolean {
    return this.state === GameLoopState.Idle;
  }

  public isUpdatingState(): boolean {
    return this.state === GameLoopState.Updating;
  }

  public isPausedState(): boolean {
    return this.state === GameLoopState.Paused;
  }

  public isStoppedState(): boolean {
    return this.state === GameLoopState.Stopped;
  }

  public getState = (): GameLoopState => {
    return this.state;
  };

  public setState = (state: GameLoopState): void => {
    this.state = state;
    this.emitData();
  };

  public subscribeOnStateChanged = (cb: (data: GameLoopState) => void): VoidFunction => {
    const handleEmit = (): void => {
      cb(this.state);
    };

    this.eventEmitter.on(this.stateChangedEventName, handleEmit);

    return () => this.eventEmitter.off(this.stateChangedEventName, handleEmit);
  };

  private emitData(): void {
    this.eventEmitter.emit(this.stateChangedEventName);
  }
}
