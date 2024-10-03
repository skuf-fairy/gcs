import {IGameTime} from '../../core/core.types';
import {Ticker} from '../../utils/Ticker/Ticker';
import {Timeouts} from '../time-utils/Timeouts';
import {TimeIntervals} from '../time-utils/TimeIntervals';

export class GameTime implements IGameTime {
  private timeMs: number;

  constructor(
    private readonly ticker: Ticker,
    private readonly timeouts: Timeouts,
    private readonly intervals: TimeIntervals,
  ) {
    this.ticker.autoStart = false;
    this.timeMs = this.ticker.lastTime;
  }

  public setStartTimeMS(timeMS: number): void {
    this.timeMs = timeMS;
  }

  public start(): void {
    this.timeouts.clear();
    this.intervals.clear();
    this.timeMs = this.ticker.lastTime;
    this.ticker.start();
  }

  public update(): void {
    const elapsedTime = this.getElapsedMS();
    this.timeouts.updateTimeouts(elapsedTime);
    this.intervals.updateIntervals(elapsedTime);
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

  public setTimeout(cb: VoidFunction, timeoutInMilliseconds: number): void {
    this.timeouts.setTimeout(cb, timeoutInMilliseconds);
  }

  public clearTimeout(cb: VoidFunction): void {
    this.timeouts.clearTimeout(cb);
  }

  public setInterval(cb: VoidFunction, intervalInMilliseconds: number): void {
    this.intervals.setInterval(cb, intervalInMilliseconds);
  }

  public clearInterval(cb: VoidFunction): void {
    this.intervals.clearInterval(cb);
  }
}
