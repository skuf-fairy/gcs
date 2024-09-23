import {IGameLifeCycleEntity, IGameLoop} from '../core.types';
import {Ticker} from '../../utils/Ticker/Ticker';
import {GameLifeCycleEntityContainer} from '../../utils/GameLifeCycleEntityContainer';

export class GameLoop extends GameLifeCycleEntityContainer<Function, IGameLifeCycleEntity> implements IGameLoop {
  constructor(private readonly ticker: Ticker) {
    super();
  }

  public addEntity(...entityList: IGameLifeCycleEntity[]): void {
    entityList.forEach((e) => {
      this.pushEntity(e.constructor, e);
    });
  }

  // старт игры
  public onStart(): void {
    super.onStart();
    this.ticker.add(this.tickerUpdate);
    this.ticker.start();
  }

  // возобновление игры
  public onResume(): void {
    super.onResume();
    this.ticker.add(this.tickerUpdate);
    this.ticker.start();
  }

  // пауза в игре
  public onPause(): void {
    super.onPause();
    this.ticker.remove(this.tickerUpdate);
    this.ticker.stop();
  }

  // выход из игры
  public stop(): void {
    super.onStop();
    this.ticker.remove(this.tickerUpdate);
    this.ticker.stop();
  }

  public destroy(): void {
    super.onDestroy();
    this.ticker.stop();
    this.ticker.remove(this.tickerUpdate);
  }

  private tickerUpdate = (ticker: Ticker): void => {
    this.onUpdate(ticker.deltaTime);
  };
}
