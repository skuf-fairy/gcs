/**
 * Выполняет работу сборщика мусора
 * Конкретно используется для сбора колбэков на отписку подписок на стороы и исполняет их в момент анмаунта класса
 */
export class CallbackCollector {
  private callbacks: Set<VoidFunction>;

  constructor() {
    this.callbacks = new Set();
  }

  public add(cb: VoidFunction): this {
    this.callbacks.add(cb);
    return this;
  }

  public execute(): void {
    Array.from(this.callbacks.values()).forEach((cb) => cb());
    this.callbacks = new Set();
  }
}
