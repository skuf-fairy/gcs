import {EventEmitter} from 'eventemitter3';

export class ObservableData<Data> {
  public data: Data;
  private readonly emitter: EventEmitter;
  private readonly eventName = 'dataChanged';

  constructor(initialData: Data) {
    this.emitter = new EventEmitter();
    this.data = initialData;
  }

  public getData = (): Data => {
    return this.data;
  };

  public setData = (data: Data): void => {
    this.data = data;
    this.emitData();
  };

  public setValue = <K extends keyof Data>(key: K, value: Data[K]): void => {
    this.data[key] = value;
    this.emitData();
  };

  public subscribeOnDataChanged = (cb: (data: Data) => void): VoidFunction => {
    const handleEmit = (): void => {
      cb(this.data);
    };

    this.emitter.on(this.eventName, handleEmit);

    return () => this.emitter.off(this.eventName, handleEmit);
  };

  public emitData(): void {
    if (Array.isArray(this.data)) {
      this.data = [...this.data] as Data;
    } else {
      this.data = {...this.data};
    }

    this.emitter.emit(this.eventName);
  }
}
