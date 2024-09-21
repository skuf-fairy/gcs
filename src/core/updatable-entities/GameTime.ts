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

  public start(): void {
    this.ticker.start();
  }

  public update(): void {
    this.timeMs += this.getElapsedMS();
  }

  public pause(): void {
    this.ticker.stop();
  }

  public stop(): void {
    this.ticker.stop();
  }

  public destroy(): void {
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
