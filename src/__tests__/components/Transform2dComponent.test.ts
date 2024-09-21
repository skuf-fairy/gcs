import {describe, expect, it} from 'vitest';
import {createGCSEngineDIContainer} from '../../di/di.container';
import {FakeRenderer} from '../FakeRenderer';
import {GCS_DI_TOKENS} from '../../di/di.tokens';

describe('Transform2dComponent', () => {
  const diContainer = createGCSEngineDIContainer(new FakeRenderer());

  describe('Init', () => {
    const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);

    it('Верная инициализация: векторы позиция, скейл и поворот созданы с нулевыми значениями', () => {
      expect(transformComponent.x).toEqual(0);
      expect(transformComponent.y).toEqual(0);
      expect(transformComponent.scaleX).toEqual(0);
      expect(transformComponent.scaleY).toEqual(0);
      expect(transformComponent.rotation).toEqual(0);
    });
  });

  describe('binding vectors', () => {
    it('Привязка инстанса вектора позиции', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);

      const position = diContainer.get(GCS_DI_TOKENS.gcsVector2);
      transformComponent.bindPosition = position;

      position.x = 1;

      expect(transformComponent.x).toEqual(1);
    });

    it('Привязка инстанса вектора скейла', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);

      const scale = diContainer.get(GCS_DI_TOKENS.gcsVector2);
      transformComponent.bindScale = scale;

      scale.x = 1;

      expect(transformComponent.scaleX).toEqual(1);
    });
  });

  describe('setters', () => {
    it('Изменение значения вектора позиции через сеттеры', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);

      transformComponent.x = 1;
      transformComponent.y = 2;

      expect(transformComponent.x).toEqual(1);
      expect(transformComponent.y).toEqual(2);

      const position = transformComponent.position;
      expect(position.x).toEqual(1);
      expect(position.y).toEqual(2);

      transformComponent.position = diContainer.get(GCS_DI_TOKENS.gcsVector2Factory)(10, 11);
      expect(transformComponent.x).toEqual(10);
      expect(transformComponent.y).toEqual(11);
    });

    it('Изменение значения вектора скейла через сеттеры', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);

      transformComponent.scaleX = 1;
      transformComponent.scaleY = 2;

      expect(transformComponent.scaleX).toEqual(1);
      expect(transformComponent.scaleY).toEqual(2);

      const scale = transformComponent.scale;
      expect(scale.x).toEqual(1);
      expect(scale.y).toEqual(2);

      transformComponent.scale = diContainer.get(GCS_DI_TOKENS.gcsVector2Factory)(10, 11);
      expect(transformComponent.scaleX).toEqual(10);
      expect(transformComponent.scaleY).toEqual(11);
    });
  });

  describe('getters', () => {
    it('Вектор позиции, полученный через геттер, - не инстанс приватного вектора позиции компонента', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);

      const position = diContainer.get(GCS_DI_TOKENS.gcsVector2);
      transformComponent.bindPosition = position;

      expect(transformComponent.position).not.toBe(position);
    });

    it('Вектор скейла, полученный через геттер, - не инстанс приватного вектора скейла компонента', () => {
      const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);

      const scale = diContainer.get(GCS_DI_TOKENS.gcsVector2);
      transformComponent.bindScale = scale;

      expect(transformComponent.scale).not.toBe(scale);
    });
  });
});
