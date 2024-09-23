import {describe, expect, it} from 'vitest';
import {createGCSDIContainer} from '../../di/di.container';
import {FakeRenderer} from '../FakeRenderer';
import {getDITokens} from '../../di/di.tokens';

describe('Movement2dComponent', () => {
  const diContainer = createGCSDIContainer(new FakeRenderer());
  const GCS_DI_TOKENS = getDITokens();

  describe('Инициализация', () => {
    const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement2dComponent);

    it('Верная инициализация: векторы направления движения и скорость проинициализированы изначальными значениями', () => {
      expect(movementComponent.velocity).toEqual(0);
      expect(movementComponent.dirX).toEqual(0);
      expect(movementComponent.dirY).toEqual(0);
    });
  });

  describe('setters', () => {
    it('Изменение значения вектора направления через сеттеры', () => {
      const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement2dComponent);

      movementComponent.dirX = 1;
      movementComponent.dirY = 2;

      expect(movementComponent.dirX).toEqual(1);
      expect(movementComponent.dirY).toEqual(2);

      const direction = movementComponent.direction;
      expect(direction.x).toEqual(1);
      expect(direction.y).toEqual(2);

      movementComponent.direction = diContainer.get(GCS_DI_TOKENS.gcsVector2Factory)(10, 11);
      expect(movementComponent.dirX).toEqual(10);
      expect(movementComponent.dirY).toEqual(11);
    });

    it('Изменение значения скорости через сеттер', () => {
      const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement2dComponent);

      movementComponent.velocity = 1;
      expect(movementComponent.velocity).toEqual(1);
    });

    it('Изменение значения вектора направления через угол направления в радианах', () => {
      const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement2dComponent);

      const angleInRad = Math.PI / 2;
      movementComponent.directionFromAngle = angleInRad;
      expect(movementComponent.dirX).toEqual(Math.cos(angleInRad));
      expect(movementComponent.dirY).toEqual(Math.sin(angleInRad));
    });
  });

  describe('getters', () => {
    it('Вектор направления, полученный через геттер, - не инстанс приватного вектора позиции компонента', () => {
      const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement2dComponent);

      const direction = diContainer.get(GCS_DI_TOKENS.gcsVector2);
      movementComponent.bindDirection = direction;

      expect(movementComponent.direction).not.toBe(direction);
    });
  });

  describe('Работа компонента в игровом объекте', () => {
    it('Обновление в игровом объекте', () => {
      const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement2dComponent);
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);
      const world = diContainer.get(GCS_DI_TOKENS.gcsGameWorld);

      const gameObject = diContainer.get(GCS_DI_TOKENS.gcsGameObjectFactory)();
      gameObject.addComponent(transformComponent, movementComponent);
      world.addGameObject(gameObject);

      movementComponent.velocity = 1;
      movementComponent.directionFromAngle = Math.PI / 2;
      movementComponent.onUpdate(1);

      expect(transformComponent.x).not.toEqual(0);
      expect(transformComponent.y).not.toEqual(0);
    });
  });
});
