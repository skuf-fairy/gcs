import {IGameTime} from '../../core/core.types';
import {Ticker} from '../../utils/Ticker/Ticker';

export class GameTime implements IGameTime {
  private timeMs: number;

  constructor(private readonly ticker: Ticker) {
    this.ticker.autoStart = false;
    this.timeMs = this.ticker.lastTime;
  }

  public setStartTimeMS(timeMS: number): void {
    this.timeMs = timeMS;
  }

  public onStart(): void {
    this.ticker.start();
  }

  public onUpdate(): void {
    this.timeMs += this.getElapsedMS();
  }

  public onPause(): void {
    this.ticker.stop();
  }

  public onStop(): void {
    this.ticker.stop();
  }

  public onDestroy(): void {
    this.ticker.stop();
  }

  // может вернуть -1
  public getTimeMs(): number {
    return this.timeMs;
  }

  public getElapsedMS(): number {
    return this.ticker.elapsedMS;
  }
}
