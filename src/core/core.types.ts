import {UnknownConstructor} from '../types.utils';
import {GameState} from './game-loop/GameState';
import {GameStateEvents} from './game-loop/GameStateEvents';

export interface IGameLifeCycleEntity {
  onStart?(): void; // старт игры
  onStop?(): void; // остановка (окончание) игры
  onUpdate?(delta: number): void; // обновление в геймлупе
  onDestroy?(): void; // деструктуризация игры
  onPause?(): void; // пауза в игре
  onResume?(): void; // возобновление игры
}

export interface IGameLifeCycle extends IGameLifeCycleEntity {
  gameState: GameState;
  gameStateEvents: GameStateEvents;
  gameLoop: IGameLoop;
  reset(): void;
}

export interface IGameWorld extends IGameLifeCycleEntity {
  isNeedClearWorld: boolean;
  addGameObject(...gameObjectList: IGameObject[]): void;
  removeGameObject(gameObject: UnknownConstructor<IGameObject>): void;
  clearDestroyedGameObjects(): void;
  getGameObject<T extends IGameObject>(gameObject: UnknownConstructor<T>): T | undefined;
  getGameObjectByTag<T extends IGameObject>(tag: string): T | undefined;
  getGameObjectList<T extends IGameObject>(gameObject: UnknownConstructor<T>): T[];
  getGameObjectListByTag<T extends IGameObject>(tag: string): T[];
  getGameObjectCountByTag(tag: string): number;
  getGameObjectCount(gameObject: UnknownConstructor<IGameObject>): number;
  clear(): void;
}

export interface IGameLoop extends IGameLifeCycleEntity {
  addEntity(...entity: IGameLifeCycleEntity[]): void;
}

export interface IGameObject extends IGameLifeCycleEntity {
  tag: string;
  isMarkedAsDestroyed: boolean;
  world: IGameWorld;
  onAddToWorld(world: IGameWorld): void;
  addComponent(...componentList: IGameObjectComponent[]): void;
  removeComponent(component: UnknownConstructor<IGameObjectComponent>): void;
  getComponent<T extends IGameObjectComponent>(component: UnknownConstructor<T>): T | undefined;
  getComponentByTag<T extends IGameObjectComponent>(tag: string): T | undefined;
  setAsDestroyed(): void;
}

export interface IGameObjectComponent extends IGameLifeCycleEntity {
  tag: string;
  gameObject: IGameObject;
  bindGameObject(go: IGameObject): void;
  onAddToGameObject?(go: IGameObject): void;
  onAddToWorld?(world: IGameWorld): void;
}

export interface IGameTime extends IGameLifeCycleEntity {
  getElapsedMS(): number;
  getTimeMs(): number;
}

export interface IGameScript extends IGameLifeCycleEntity {
  onCreate?(): void;
}

export interface IGameScripts extends IGameLifeCycleEntity {
  addScript(...scripts: IGameScript[]): void;
  clear(): void;
}

export interface IDimensions {
  width: number;
  height: number;
}

export interface IGameWorldContainer {
  removeChildren(): void;
  addChild(child: any): void;
  removeChild(child: any): void;
}

export interface IBaseRenderer<Container extends IGameWorldContainer> extends IGameLifeCycleEntity {
  rootContainer: Container;
  getFrameDimensions(): IDimensions;
}

export interface IAsyncRenderer<Container extends IGameWorldContainer> extends IBaseRenderer<Container> {
  create(containerNode: HTMLElement): Promise<void>;
}

export interface IRenderer<Container extends IGameWorldContainer> extends IBaseRenderer<Container> {
  create(containerNode: HTMLElement): void;
}

export interface IGameRenderer<
  Container extends IGameWorldContainer,
  Renderer extends IAsyncRenderer<Container> | IRenderer<Container>,
> extends IGameLifeCycleEntity {
  renderer: Renderer;
  create(containerNode: HTMLElement): void;
  asyncCreate(containerNode: HTMLElement): Promise<void>;
  clear(): void;
  get dimensions(): IDimensions;
  get container(): Container;
}

export type AnyRenderer<Container extends IGameWorldContainer> = IAsyncRenderer<Container> | IRenderer<Container>;

export enum GameLoopEvents {
  Start = 'Start',
  Pause = 'Pause',
  Resume = 'Resume',
  Stop = 'Stop',
}
