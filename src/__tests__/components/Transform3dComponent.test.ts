import {describe, expect, it} from 'vitest';
import {FakeRenderer} from '../FakeRenderer';
import {createGCSDIContainer} from '../../di/di.container';
import {getDITokens} from '../../di/di.tokens';

describe('Transform3dComponent', () => {
  const diContainer = createGCSDIContainer(new FakeRenderer());
  const GCS_DI_TOKENS = getDITokens();

  describe('Init', () => {
    const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);

    it('Верная инициализация: векторы позиция, скейл и поворот созданы с нулевыми значениями', () => {
      expect(transformComponent.x).toEqual(0);
      expect(transformComponent.y).toEqual(0);
      expect(transformComponent.z).toEqual(0);
      expect(transformComponent.scaleX).toEqual(0);
      expect(transformComponent.scaleY).toEqual(0);
      expect(transformComponent.scaleZ).toEqual(0);
      expect(transformComponent.rotationX).toEqual(0);
      expect(transformComponent.rotationY).toEqual(0);
      expect(transformComponent.rotationZ).toEqual(0);
    });
  });

  describe('binding vectors', () => {
    it('Привязка инстанса вектора позиции', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);

      const position = diContainer.get(GCS_DI_TOKENS.gcsVector3);
      transformComponent.bindPosition = position;

      position.x = 1;

      expect(transformComponent.x).toEqual(1);
    });

    it('Привязка инстанса вектора скейла', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);

      const scale = diContainer.get(GCS_DI_TOKENS.gcsVector3);
      transformComponent.bindScale = scale;

      scale.x = 1;

      expect(transformComponent.scaleX).toEqual(1);
    });

    it('Привязка инстанса вектора поворота', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);

      const rotation = diContainer.get(GCS_DI_TOKENS.gcsVector3);
      transformComponent.bindRotation = rotation;

      rotation.x = 1;

      expect(transformComponent.rotationX).toEqual(1);
    });
  });

  describe('setters', () => {
    it('Изменение значения вектора позиции через сеттеры', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);

      transformComponent.x = 1;
      transformComponent.y = 2;
      transformComponent.z = 3;

      expect(transformComponent.x).toEqual(1);
      expect(transformComponent.y).toEqual(2);
      expect(transformComponent.z).toEqual(3);

      const position = transformComponent.position;
      expect(position.x).toEqual(1);
      expect(position.y).toEqual(2);
      expect(position.z).toEqual(3);

      transformComponent.position = diContainer.get(GCS_DI_TOKENS.gcsVector3Factory)(10, 11, 12);
      expect(transformComponent.x).toEqual(10);
      expect(transformComponent.y).toEqual(11);
      expect(transformComponent.z).toEqual(12);
    });

    it('Изменение значения вектора скейла через сеттеры', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);

      transformComponent.scaleX = 1;
      transformComponent.scaleY = 2;
      transformComponent.scaleZ = 3;

      expect(transformComponent.scaleX).toEqual(1);
      expect(transformComponent.scaleY).toEqual(2);
      expect(transformComponent.scaleZ).toEqual(3);

      const scale = transformComponent.scale;
      expect(scale.x).toEqual(1);
      expect(scale.y).toEqual(2);
      expect(scale.z).toEqual(3);

      transformComponent.scale = diContainer.get(GCS_DI_TOKENS.gcsVector3Factory)(10, 11, 12);
      expect(transformComponent.scaleX).toEqual(10);
      expect(transformComponent.scaleY).toEqual(11);
      expect(transformComponent.scaleZ).toEqual(12);
    });

    it('Изменение значения вектора поворота через сеттеры', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);

      transformComponent.rotationX = 1;
      transformComponent.rotationY = 2;
      transformComponent.rotationZ = 3;

      expect(transformComponent.rotationX).toEqual(1);
      expect(transformComponent.rotationY).toEqual(2);
      expect(transformComponent.rotationZ).toEqual(3);

      const rotation = transformComponent.rotation;
      expect(rotation.x).toEqual(1);
      expect(rotation.y).toEqual(2);
      expect(rotation.z).toEqual(3);

      transformComponent.rotation = diContainer.get(GCS_DI_TOKENS.gcsVector3Factory)(10, 11, 12);
      expect(transformComponent.rotationX).toEqual(10);
      expect(transformComponent.rotationY).toEqual(11);
      expect(transformComponent.rotationZ).toEqual(12);
    });
  });

  describe('getters', () => {
    it('Вектор позиции, полученный через геттер, - не инстанс приватного вектора позиции компонента', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);

      const position = diContainer.get(GCS_DI_TOKENS.gcsVector3);
      transformComponent.bindPosition = position;

      expect(transformComponent.position).not.toBe(position);
    });

    it('Вектор скейла, полученный через геттер, - не инстанс приватного вектора скейла компонента', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);

      const scale = diContainer.get(GCS_DI_TOKENS.gcsVector3);
      transformComponent.bindScale = scale;

      expect(transformComponent.scale).not.toBe(scale);
    });

    it('Вектор поворота, полученный через геттер, - не инстанс приватного вектора скейла компонента', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform3dComponent);

      const rotation = diContainer.get(GCS_DI_TOKENS.gcsVector3);
      transformComponent.bindRotation = rotation;

      expect(transformComponent.rotation).not.toBe(rotation);
    });
  });
});
