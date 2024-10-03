import {IGameLifeCycleEntity, GameLoopEvents, IGameWorldContainer, AnyRenderer} from '../../core/core.types';

import {Scope} from '../Scope';
import {CallbackCollector} from '../../utils/CallbacksCollector';

export class VisibilityChangeListener implements IGameLifeCycleEntity {
  private scope: Scope<IGameWorldContainer, AnyRenderer<IGameWorldContainer>>;
  private isPausedByVisibilityChangeEvent: boolean;
  private isSubscribeActive: boolean;

  constructor(private readonly callbackCollector: CallbackCollector) {
    this.isPausedByVisibilityChangeEvent = false;
    this.isSubscribeActive = false;
  }

  // todo resolution chain?
  public bindScope(scope: Scope<IGameWorldContainer, AnyRenderer<IGameWorldContainer>>): void {
    this.scope = scope;
  }

  public onStart(): void {
    this.isPausedByVisibilityChangeEvent = false;
    this.isSubscribeActive = false;

    this.subscribeOnVisibilityChange();

    this.callbackCollector.add(
      this.scope.gameLifeCycle.gameStateEvents.subscribeOnEvent(GameLoopEvents.Pause, this.handlePauseEvent),
    );
    this.callbackCollector.add(
      this.scope.gameLifeCycle.gameStateEvents.subscribeOnEvent(GameLoopEvents.Resume, this.handleResumeEvent),
    );
  }

  private handleVisibilityPageChange = (): void => {
    if (document.hidden) {
      this.isPausedByVisibilityChangeEvent = true;
      this.scope.pause();
    } else {
      this.isPausedByVisibilityChangeEvent = false;
      this.scope.resume();
    }
  };

  public onStop(): void {
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
