import {describe, expect, it} from 'vitest';
import {createGCSEngineDIContainer} from '../di/di.container';
import {FakeRenderer} from '../FakeRenderer';
import {GCS_DI_TOKENS} from '../di/di.tokens';

describe('HealthComponent', () => {
  const diContainer = createGCSEngineDIContainer(new FakeRenderer());

  describe('Init', () => {
    const healthComponent = diContainer.get(GCS_DI_TOKENS.gcsHealthComponent);

    it('Верная инициализация: значения здоровья по 0', () => {
      expect(healthComponent.health).toEqual(0);
      expect(healthComponent.max).toEqual(0);
    });

    it('Инициализация через сеттеры', () => {
      healthComponent.max = 100;
      healthComponent.health = 10;

      expect(healthComponent.health).toEqual(10);
      expect(healthComponent.max).toEqual(100);
    });
  });

  describe('change', () => {
    const healthComponent = diContainer.get(GCS_DI_TOKENS.gcsHealthComponent);
    healthComponent.max = 100;
    healthComponent.health = 10;

    it('Прибавка и уменьшение здоровья', () => {
      healthComponent.addHealth(50);
      expect(healthComponent.health).toEqual(10 + 50);

      healthComponent.addHealth(-50);
      expect(healthComponent.health).toEqual(60 - 50);

      healthComponent.addHealth(150);
      expect(healthComponent.health).toEqual(healthComponent.max);

      healthComponent.addHealth(-150);
      expect(healthComponent.health).toEqual(0);
    });
  });

  describe('isDead', () => {
    const healthComponent = diContainer.get(GCS_DI_TOKENS.gcsHealthComponent);
    healthComponent.max = 100;
    healthComponent.health = 10;

    it('Проверка пустого здоровья', () => {
      expect(healthComponent.isDead()).toEqual(false);

      healthComponent.health = 0;
      expect(healthComponent.isDead()).toEqual(true);
    });
  });
});
