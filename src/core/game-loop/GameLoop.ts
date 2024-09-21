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
  public start(): void {
    super.start();
    this.ticker.add(this.tickerUpdate);
    this.ticker.start();
  }

  // возобновление игры
  public resume(): void {
    super.resume();
    this.ticker.add(this.tickerUpdate);
    this.ticker.start();
  }

  // пауза в игре
  public pause(): void {
    super.pause();
    this.ticker.remove(this.tickerUpdate);
    this.ticker.stop();
  }

  // выход из игры
  public stop(): void {
    super.stop();
    this.ticker.remove(this.tickerUpdate);
    this.ticker.stop();
  }

  public destroy(): void {
    super.destroy();
    this.ticker.stop();
    this.ticker.remove(this.tickerUpdate);
  }

  private tickerUpdate = (ticker: Ticker): void => {
    this.update(ticker.deltaTime);
  };
}
