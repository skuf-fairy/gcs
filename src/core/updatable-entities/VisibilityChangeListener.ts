import {IGameLifeCycleEntity, GameLoopEvents, IGameWorldContainer, AnyRenderer} from '../../core/core.types';

import {GCSEngine} from '../../core/GCSEngine';
import {CallbackCollector} from '../../utils/CallbacksCollector';

export class VisibilityChangeListener implements IGameLifeCycleEntity {
  private engine: GCSEngine<IGameWorldContainer, AnyRenderer<IGameWorldContainer>>;
  private isPausedByVisibilityChangeEvent: boolean;
  private isSubscribeActive: boolean;

  constructor(private readonly callbackCollector: CallbackCollector) {
    this.isPausedByVisibilityChangeEvent = false;
    this.isSubscribeActive = false;
  }

  // todo resolution chain?
  public bindEngine(engine: GCSEngine<IGameWorldContainer, AnyRenderer<IGameWorldContainer>>): void {
    this.engine = engine;
  }

  public start(): void {
    this.isPausedByVisibilityChangeEvent = false;
    this.isSubscribeActive = false;

    this.subscribeOnVisibilityChange();

    this.callbackCollector.add(
      this.engine.gameLifeCycle.gameStateEvents.subscribeOnEvent(GameLoopEvents.Pause, this.handlePauseEvent),
    );
    this.callbackCollector.add(
      this.engine.gameLifeCycle.gameStateEvents.subscribeOnEvent(GameLoopEvents.Resume, this.handleResumeEvent),
    );
  }

  private handleVisibilityPageChange = (): void => {
    if (document.hidden) {
      this.isPausedByVisibilityChangeEvent = true;
      this.engine.pause();
    } else {
      this.isPausedByVisibilityChangeEvent = false;
      this.engine.resume();
    }
  };

  public stop(): void {
    this.unsubscribeOnVisibilityChange();
    this.callbackCollector.execute();
  }

  private handlePauseEvent = (): void => {
    if (this.isPausedByVisibilityChangeEvent) return;

    this.unsubscribeOnVisibilityChange();
  };

  private handleResumeEvent = (): void => {
    this.subscribeOnVisibilityChange();
  };

  private subscribeOnVisibilityChange(): void {
    if (!this.isSubscribeActive) {
      this.isSubscribeActive = true;
      document.addEventListener('visibilitychange', this.handleVisibilityPageChange);
    }
  }

  private unsubscribeOnVisibilityChange(): void {
    if (this.isSubscribeActive) {
      this.isSubscribeActive = false;
      document.removeEventListener('visibilitychange', this.handleVisibilityPageChange);
    }
  }
}
