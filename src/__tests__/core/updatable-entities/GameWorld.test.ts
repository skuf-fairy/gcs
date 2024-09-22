import {describe, expect, it} from 'vitest';
import {createGCSEngineDIContainer} from '../../di/di.container';
import {FakeRenderer} from '../../FakeRenderer';
import {GCS_DI_TOKENS} from '../../di/di.tokens';
import {TestComponent} from '../test-entities/TestComponent';
import {GameObject} from '../../../core/updatable-entities/GameObject';

describe('GameWorld', () => {
  const diContainer = createGCSEngineDIContainer(new FakeRenderer());

  describe('Создание игрового мира с игровым объектом', () => {
    const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

    const testComponent = new TestComponent();
    go.addComponent(testComponent);
    world.addGameObject(go);

    it('Игровой объект есть в мире', () => {
      expect(world.size).toEqual(1);
    });

    it('Компонент игрового объекта создан', () => {
      expect(testComponent.isCreated).toEqual(true);
    });
  });

  describe('Удаление игрового объекта из мира', () => {
    const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

    const testComponent = new TestComponent();
    go.addComponent(testComponent);
    world.addGameObject(go);

    world.removeGameObject(GameObject);

    it('Игрового объекта нет в мире', () => {
      expect(world.size).toEqual(0);
    });

    it('Удаленный игровой объект деструктуризирован', () => {
      expect(testComponent.isDestroyed).toEqual(true);
    });
  });

  describe('Чистка игрового мира от игровых объектов, помеченных как уничтоженные', () => {
    const go1 = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const go2 = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const go3 = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const go4 = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

    const go1TestComponent = new TestComponent();
    go1.addComponent(go1TestComponent);

    const go2TestComponent = new TestComponent();
    go2.addComponent(go2TestComponent);

    const go3TestComponent = new TestComponent();
    go3.addComponent(go3TestComponent);

    const go4TestComponent = new TestComponent();
    go4.addComponent(go4TestComponent);

    world.addGameObject(go1, go2, go3, go4);

    go2.setAsDestroyed();

    world.clearDestroyedGameObjects();

    it('Игрового объекта нет в мире', () => {
      expect(world.size).toEqual(1);
      expect(world.getGameObjectCount(GameObject)).toEqual(3);
      expect(world.entityMap.getValueByKey(GameObject)?.length).toEqual(3);
      expect(world.entityList.findIndex((go) => go === go2)).toEqual(-1);
    });

    it('Удаленный игровой объект деструктуризирован', () => {
      expect(go2TestComponent.isDestroyed).toEqual(true);
    });
  });

  describe('Жизненный цикл игрового мира', () => {
    const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

    const testComponent = new TestComponent();
    go.addComponent(testComponent);
    world.addGameObject(go);

    it('Обновление игрового мира', () => {
      world.update(1);
      expect(testComponent.counter).toEqual(1);
    });

    it('Деструктуризация игрового мира', () => {
      world.destroy();
      expect(testComponent.isDestroyed).toEqual(true);
    });
  });

  describe('Получение игровых объектов, которые есть в мире', () => {
    const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

    const testComponent = new TestComponent();
    go.addComponent(testComponent);
    world.addGameObject(go);

    it('Получение игрового объекта по классу', () => {
      const worldGameObject = world.getGameObject<GameObject>(GameObject);
      expect(worldGameObject).toBe(go);
      expect(worldGameObject).toBeInstanceOf(GameObject);
    });

    it('Получение игрового объекта по тегу', () => {
      go.tag = 'test-tag';
      const worldGameObject = world.getGameObjectByTag(go.tag);
      expect(worldGameObject).toBe(go);
      expect(worldGameObject).toBeInstanceOf(GameObject);
    });
  });
});
