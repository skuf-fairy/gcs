import {describe, expect, it} from 'vitest';
import {createGCSEngineDIContainer} from '../../../di/di.container';
import {FakeRenderer} from '../../FakeRenderer';
import {GCS_DI_TOKENS} from '../../../di/di.tokens';
import {TestComponent} from '../test-entities/TestComponent';
import {Transform2dComponent} from '../../../components/Transform2dComponent';
import {Movement2dComponent} from '../../../components/Movement2dComponent';

describe('GameObject', () => {
  const diContainer = createGCSEngineDIContainer(new FakeRenderer());

  describe('Создание игрового объекта с компонентом', () => {
    const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

    const testComponent = new TestComponent();
    go.addComponent(testComponent);

    it('Компонент добавлен и создан, но игровой объект еще не добавлен в мир', () => {
      expect(go.size).toEqual(1);
      expect(go.getComponent<TestComponent>(TestComponent)).toBe(testComponent);
      expect(testComponent.isCreated).toEqual(true);
      expect(() => go.world).toThrowError();
    });

    it('Игровой объект добавлен в мир', () => {
      world.addGameObject(go);
      expect(go.world).toBe(world);
    });

    it('Добавление компонентов не зависит от последовательности их добавления', () => {
      const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
      const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);
      const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement2dComponent);
      const testComponent = new TestComponent();
      go.addComponent(movementComponent, transformComponent, testComponent);
      world.addGameObject(go);

      expect(() => go.update(1)).not.toThrowError();
    });
  });

  it('Получение компонентов из игрового объекта', () => {
    const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

    const testComponent = new TestComponent();
    go.addComponent(testComponent);
    world.addGameObject(go);

    const goTransformComponent = go.getComponent<TestComponent>(TestComponent);
    expect(goTransformComponent).toBeInstanceOf(TestComponent);
    expect(goTransformComponent).toBe(testComponent);
  });

  it('Удаление компонентов из игрового объекта', () => {
    const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

    const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);
    const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement2dComponent);
    const testComponent = new TestComponent();
    go.addComponent(transformComponent, testComponent, movementComponent);
    world.addGameObject(go);

    expect(go.size).toEqual(3);

    go.removeComponent(TestComponent);

    expect(go.size).toEqual(2);
    expect(go.getComponent<Transform2dComponent>(Transform2dComponent)).toBe(transformComponent);
    expect(go.getComponent<Movement2dComponent>(Movement2dComponent)).toBe(movementComponent);
    expect(testComponent.isDestroyed).toEqual(true);
  });

  describe('Жизненный цикл игровых объектов', () => {
    const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

    const testComponent = new TestComponent();

    go.addComponent(testComponent);
    world.addGameObject(go);

    it('Обновление компонентов игрового объекта', () => {
      go.update(1);
      expect(testComponent.counter).toEqual(1);
    });

    it('Деструктуризация игровых компонентов', () => {
      go.destroy();
      expect(testComponent.isDestroyed).toEqual(true);
    });
  });
});
