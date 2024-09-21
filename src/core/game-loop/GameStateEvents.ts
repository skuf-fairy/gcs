import {EventEmitter} from 'eventemitter3';

import {GameLoopEvents} from '../core.types';

export class GameStateEvents {
  constructor(private readonly emitter: EventEmitter) {}

  public emitEvent(event: GameLoopEvents): void {
    this.emitter.emit(event);
  }

  public subscribeOnEvent = (event: GameLoopEvents, cb: VoidFunction): VoidFunction => {
    this.emitter.on(event, cb);

    return () => this.emitter.off(event, cb);
  };
}
