export class Timeouts {
  private timeoutsMap: Map<
    VoidFunction,
    {
      cb: VoidFunction;
      time: number;
    }
  >;

  constructor() {
    this.timeoutsMap = new Map();
  }

  public clear(): void {
    this.timeoutsMap = new Map();
  }

  public updateTimeouts(elapsedTime: number): void {
    const newMap = new Map<
      VoidFunction,
      {
        cb: VoidFunction;
        time: number;
      }
    >();

    this.timeoutsMap.forEach((t) => {
      const time = t.time - elapsedTime;

      if (time <= 0) {
        t.cb();
      } else {
        newMap.set(t.cb, {
          cb: t.cb,
          time: time,
        });
      }
    });

    this.timeoutsMap = newMap;
  }

  public setTimeout(cb: VoidFunction, timeoutInMilliseconds: number): void {
    this.timeoutsMap.set(cb, {
      cb,
      time: timeoutInMilliseconds,
    });
  }

  public clearTimeout(cb: VoidFunction): void {
    this.timeoutsMap.delete(cb);
  }
}
