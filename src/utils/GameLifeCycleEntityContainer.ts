import {KeyUniqValuesVault} from './Vault/KeyUniqValuesVault';
import {IGameLifeCycleEntity} from '../core/core.types';

/**
 * Обертка над обновляемыми сущностями
 * Содержит и синхронизирует два массива
 * entityList - весь список обновляемых сущностей
 * updatableEntityList - список только тех сущностей, у которых реализован метод update
 */
export class GameLifeCycleEntityContainer<K, E extends IGameLifeCycleEntity> implements IGameLifeCycleEntity {
  /**
   * весь список обновляемых сущностей
   */
  public entityMap: KeyUniqValuesVault<K, E>;
  /**
   * список только тех сущностей, у которых реализован метод update
   */
  public updatableEntityMap: KeyUniqValuesVault<K, E>;

  constructor() {
    this.entityMap = new KeyUniqValuesVault<K, E>();
    this.updatableEntityMap = new KeyUniqValuesVault<K, E>();
  }

  get size(): number {
    return this.entityMap.size;
  }

  get entityList(): E[] {
    return this.entityMap.valuesList;
  }

  public cloneMap(map: Map<K, E[]>): Map<K, E[]> {
    return new Map(map);
  }

  public getEntityByKey(key: K): E | undefined {
    return this.entityMap.getValue(key);
  }

  public getEntity(key: K, entity: E): E | undefined {
    return this.entityMap.getValue(key, entity);
  }

  public pushEntity(key: K, entity: E): void {
    this.entityMap.addValue(key, entity);
    if (entity.update) {
      this.updatableEntityMap.addValue(key, entity);
    }
  }

  public dropEntityByKey(key: K): void {
    this.entityMap.dropKey(key).forEach((e) => {
      e.destroy?.();
    });

    this.updatableEntityMap.dropKey(key);
  }

  public dropEntity(key: K, entity: E): void {
    this.entityMap.dropSetValue(key, entity).forEach((e) => {
      e.destroy?.();
    });

    this.updatableEntityMap.dropSetValue(key, entity);
  }

  public getEntityCount(key: K): number {
    return this.entityMap.getValueCountByKey(key);
  }

  public start(): void {
    this.entityList.forEach((c) => c.start?.());
  }

  public stop(): void {
    this.entityList.forEach((c) => c.stop?.());
  }

  public update(delta: number): void {
    this.updatableEntityMap.getVault().forEach((e) => e.forEach((e) => e.update?.(delta)));
  }

  public destroy(): void {
    this.entityList.forEach((c) => c.destroy?.());
    this.entityMap.clear();
    this.updatableEntityMap.clear();
    this.entityMap = new KeyUniqValuesVault<K, E>();
    this.updatableEntityMap = new KeyUniqValuesVault<K, E>();
  }

  public pause(): void {
    this.entityList.forEach((c) => c.pause?.());
  }

  public resume(): void {
    this.entityList.forEach((c) => c.resume?.());
  }
}
