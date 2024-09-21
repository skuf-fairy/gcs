import {describe, expect, it} from 'vitest';
import {createGCSEngineDIContainer} from '../../di/di.container';
import {FakeRenderer} from '../FakeRenderer';
import {GCS_DI_TOKENS} from '../../di/di.tokens';

describe('Movement3dComponent', () => {
  const diContainer = createGCSEngineDIContainer(new FakeRenderer());

  describe('Init', () => {
    const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement3dComponent);

    it('Верная инициализация: векторы направления движения и скорость проинициализированы изначальными значениями', () => {
      expect(movementComponent.velocity).toEqual(0);
      expect(movementComponent.dirX).toEqual(0);
      expect(movementComponent.dirY).toEqual(0);
      expect(movementComponent.dirZ).toEqual(0);
    });
  });

  describe('setters', () => {
    it('Изменение значения вектора направления через сеттеры', () => {
      const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement3dComponent);

      movementComponent.dirX = 1;
      movementComponent.dirY = 2;
      movementComponent.dirZ = 3;

      expect(movementComponent.dirX).toEqual(1);
      expect(movementComponent.dirY).toEqual(2);
      expect(movementComponent.dirZ).toEqual(3);

      const direction = movementComponent.direction;
      expect(direction.x).toEqual(1);
      expect(direction.y).toEqual(2);
      expect(direction.z).toEqual(3);

      movementComponent.direction = diContainer.get(GCS_DI_TOKENS.gcsVector3Factory)(10, 11, 12);
      expect(movementComponent.dirX).toEqual(10);
      expect(movementComponent.dirY).toEqual(11);
      expect(movementComponent.dirZ).toEqual(12);
    });

    it('Изменение значения скорости через сеттер', () => {
      const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement3dComponent);

      movementComponent.velocity = 1;
      expect(movementComponent.velocity).toEqual(1);
    });
  });

  describe('getters', () => {
    it('Вектор направления, полученный через геттер, - не инстанс приватного вектора позиции компонента', () => {
      const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement3dComponent);

      const direction = diContainer.get(GCS_DI_TOKENS.gcsVector3);
      movementComponent.bindDirection = direction;

      expect(movementComponent.direction).not.toBe(direction);
    });
  });

  describe('Работа компонента в игровом объекте', () => {
    it('Обновление в игровом объекте', () => {
      const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement3dComponent);
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);
      const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

      const gameObject = diContainer.get(GCS_DI_TOKENS.gcsGameObjectFactory)();
      gameObject.addComponent(transformComponent, movementComponent);
      world.addGameObject(gameObject);

      movementComponent.velocity = 1;
      movementComponent.direction = diContainer.get(GCS_DI_TOKENS.gcsVector3);
      movementComponent.dirX = 1;
      movementComponent.dirY = 1;
      movementComponent.dirZ = 1;
      movementComponent.update(1);

      expect(transformComponent.x).not.toEqual(0);
      expect(transformComponent.y).not.toEqual(0);
      expect(transformComponent.z).not.toEqual(0);
    });
  });
});
