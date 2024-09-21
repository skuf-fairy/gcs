import {IGameObject, IGameWorld} from '../../core/core.types';
import {UnknownConstructor} from '../../types.utils';
import {GameLifeCycleEntityContainer} from '../../utils/GameLifeCycleEntityContainer';

/**
 * Контейнер для игровых объектов,
 * в которой можно добавлять и удалять игровые объекты
 * а так же получать их из контейнера
 */
export class GameWorld extends GameLifeCycleEntityContainer<Function, IGameObject> implements IGameWorld {
  // флаг для оптимизации очистки мира от объектов, которые нужно из него дропнуть
  // проставляется в GameObjects.setAsDestroyed()
  public isNeedClearWorld: boolean;

  constructor() {
    super();

    this.isNeedClearWorld = false;
  }

  /**
   * Обновление игровых объектов + чистка от уничтоженных
   * @param delta Время между кадрами
   */
  public update(delta: number): void {
    super.update(delta);
    this.clearDestroyedGameObjects();
  }

  /**
   * Добавление игрового объекта
   * @param gameObject инстанс игрового объекта
   */
  public addGameObject(...gameObjectList: IGameObject[]): void {
    gameObjectList.forEach((go) => {
      go.addToWorld(this);

      this.pushEntity(go.constructor, go);
    });
  }

  /**
   * Удаление игрового объекта
   * @param gameObject инстанс игрового объекта
   */
  public removeGameObject(go: UnknownConstructor<IGameObject>): void {
    this.dropEntityByKey(go);
  }

  /**
   * Чистка от игровых объектов, которые помечены как уничтоженные
   */
  public clearDestroyedGameObjects(): void {
    if (!this.isNeedClearWorld) return;

    // создаем копию текущего списка объектов
    // это нужно, тк на destroy может что-то заспавниться в entities
    const tempGameObjectMap = this.entityMap.clone();

    tempGameObjectMap.forEach((gameObjectList, key) => {
      gameObjectList.forEach((go) => {
        if (go.isMarkedAsDestroyed) {
          this.dropEntity(key, go);
        }
      });
    });

    this.isNeedClearWorld = false;
  }

  /**
   * Получение игрового объекта по его классу
   * @param gameObject класс игрового объекта
   * @returns игровой объект, если есть в мире
   */
  public getGameObject<T extends IGameObject>(gameObject: UnknownConstructor<T>): T | undefined {
    const go = this.getEntityByKey(gameObject);
    return go?.isMarkedAsDestroyed ? undefined : (go as T);
  }

  /**
   * Получение игрового объекта по его тегу
   * @param gameObject класс игрового объекта
   * @returns игровой объект, если есть в мире
   */
  public getGameObjectByTag<T extends IGameObject>(tag: string): T | undefined {
    return this.entityList.find((go) => go.tag === tag && !go.isMarkedAsDestroyed) as T | undefined;
  }

  /**
   * Получение списка игрового объекта по его классу
   * @param gameObject класс игрового объекта
   * @returns список инстансов игрового объекта
   */
  public getGameObjectList<T extends IGameObject>(gameObject: UnknownConstructor<T>): T[] {
    return (this.entityMap.getValueByKey(gameObject) || []).filter((go) => !go.isMarkedAsDestroyed) as T[];
  }

  /**
   * Получение списка игрового объекта по его тегу
   * @param gameObject тег игрового объекта
   * @returns список инстансов игрового объекта
   */
  public getGameObjectListByTag<T extends IGameObject>(tag: string): T[] {
    return this.entityList.filter((go) => go.tag === tag && !go.isMarkedAsDestroyed) as T[];
  }

  /**
   * Получение количества списка игрового объекта по его тегу
   * @param gameObject тег игрового объекта
   * @returns количество инстансов игровых объектов в мире
   */
  public getGameObjectCountByTag(tag: string): number {
    return this.entityList.filter((go) => go.tag === tag && !go.isMarkedAsDestroyed).length;
  }

  /**
   * Получение количества списка игрового объекта по его классу
   * @param gameObject класс игрового объекта
   * @returns количество инстансов игровых объектов в мире
   */
  public getGameObjectCount(gameObject: UnknownConstructor<IGameObject>): number {
    return (this.entityMap.getValueByKey(gameObject) || []).filter((go) => !go.isMarkedAsDestroyed).length;
  }

  public getAllGameObjectList(): IGameObject[] {
    return this.entityList;
  }

  public clear(): void {
    this.destroy();
  }
}
