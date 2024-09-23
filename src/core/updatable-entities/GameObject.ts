import {IGameObject, IGameObjectComponent, IGameWorld} from '../core.types';
import {GameLifeCycleEntityContainer} from '../../utils/GameLifeCycleEntityContainer';
import {UnknownConstructor} from '../../types.utils';

export class GameObject extends GameLifeCycleEntityContainer<Function, IGameObjectComponent> implements IGameObject {
  /**
   * Мир, в котором находится игровой объект
   * Если он null, то почему-то не привязан к миру, возможно, из-за утечки памяти
   */
  private gameWorld: IGameWorld | null;
  /**
   * Тэг, по которому можно группировать игровые объекты (по смыслу, по похожести)
   */
  public tag: string;
  /**
   * флаг обозначающий, что этот объект нужно убрать из мира
   */
  public isMarkedAsDestroyed: boolean;

  constructor() {
    super();

    this.tag = 'untagged';
    this.isMarkedAsDestroyed = false;
    this.gameWorld = null;
  }

  get world(): IGameWorld {
    if (this.gameWorld === null) throw new Error('GameObject: GameWorld is null');

    return this.gameWorld;
  }

  /**
   * Добавление компонентов в игровой объект
   * @param componentList список инстансов игровых компонентов
   */
  public addComponent(...componentList: IGameObjectComponent[]): void {
    componentList.forEach((c) => {
      this.pushEntity(c.constructor, c);
    });
    componentList.forEach((c) => {
      this.createComponent(c);
    });
  }

  /**
   * Удалить компонент из игрового объекта
   * @param component класс компонента
   */
  public removeComponent(component: UnknownConstructor<IGameObjectComponent>): void {
    this.dropEntityByKey(component);
  }

  /**
   * Получить инстанс компонента игрового объекта
   * @param component ссылка на класс-компонент
   * @returns инстанс компонента либо undefined, если такого компонента нет в игровом объекте
   */
  public getComponent<T extends IGameObjectComponent>(
    component: UnknownConstructor<IGameObjectComponent>,
  ): T | undefined {
    return this.getEntityByKey(component) as T | undefined;
  }

  public getComponentByTag<T extends IGameObjectComponent>(tag: string): T | undefined {
    return this.entityList.find((e) => e.tag === tag) as T | undefined;
  }

  public onAddToWorld(world: IGameWorld): void {
    this.gameWorld = world;
    this.entityList.forEach((c) => c.onAddToWorld?.(world));
  }

  /**
   * Пометка о том, что игровой объект должен быть дропнут из мира
   */
  public setAsDestroyed(): void {
    this.isMarkedAsDestroyed = true;
    if (this.gameWorld) {
      this.gameWorld.isNeedClearWorld = true;
    }
  }

  /**
   * Создание игрового компонента и привязка его к игровому объекту
   * @param c компонент
   */
  private createComponent(c: IGameObjectComponent): void {
    c.bindGameObject(this);
    c.onAddToGameObject?.(this);
  }
}
