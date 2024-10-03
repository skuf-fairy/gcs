export class TimeIntervals {
  private intervalsMap: Map<
    VoidFunction,
    {
      cb: VoidFunction;
      time: number;
      interval: number;
    }
  >;

  constructor() {
    this.intervalsMap = new Map();
  }

  public clear(): void {
    this.intervalsMap = new Map();
  }

  public setInterval(cb: VoidFunction, intervalInMilliseconds: number): void {
    this.intervalsMap.set(cb, {
      cb,
      time: intervalInMilliseconds,
      interval: intervalInMilliseconds,
    });
  }

  public clearInterval(cb: VoidFunction): void {
    this.intervalsMap.delete(cb);
  }

  public updateIntervals(elapsedTime: number): void {
    this.intervalsMap.forEach((i) => {
      i.time -= elapsedTime;

      if (i.time <= 0) {
        i.cb();
        i.time = i.interval;
      }
    });
  }
}
