import {FormatUtils} from '../utils/FormatUtils';

import {BaseComponent} from './BaseComponent';
import {Scope} from '../core/Scope';
import {AnyRenderer, IGameWorldContainer} from '../core/core.types';

export class TimerComponent extends BaseComponent {
  private timeMS: number;
  private isStarted: boolean;

  constructor(private readonly scope: Scope<IGameWorldContainer, AnyRenderer<IGameWorldContainer>>) {
    super();

    this.isStarted = false;
    this.timeMS = 0;
  }

  public setTime(timeMS: number): void {
    this.timeMS = timeMS;
  }

  // старт таймера
  public startTimer(): void {
    this.isStarted = true;
  }

  // остановка текущего отсчета
  public stopTimer(): void {
    this.isStarted = false;
  }

  public update(): void {
    if (this.timeMS === 0 || !this.isStarted) return;

    this.timeMS = Math.max(0, this.timeMS - this.scope.time.getElapsedMS());

    if (this.timeMS === 0) {
      this.stopTimer();
    }
  }

  public getFormattedTime(): string {
    return FormatUtils.formatGameTime(this.timeMS);
  }

  public getTimeMS(): number {
    return this.timeMS;
  }
}
