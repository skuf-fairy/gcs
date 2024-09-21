import {describe, expect, it} from 'vitest';
import {createGCSEngineDIContainer} from '../../../di/di.container';
import {FakeRenderer} from '../../FakeRenderer';
import {GCS_DI_TOKENS} from '../../../di/di.tokens';
import {TestScript} from '../test-entities/TestScript';

describe('GameScripts', () => {
  const diContainer = createGCSEngineDIContainer(new FakeRenderer());

  describe('Добавление и инициализация игровых скриптов', () => {
    const gameScripts = diContainer.get(GCS_DI_TOKENS.gcsGameScripts);

    const script = new TestScript();

    gameScripts.addScript(script);

    it('Скрипт добавлен', () => {
      expect(gameScripts.size).toEqual(1);
      expect(gameScripts.entityList[0]).toBe(script);
    });

    it('Скрипт создан', () => {
      expect(script.isCreated).toEqual(true);
    });
  });

  describe('Жизненный цикл игровых скриптов', () => {
    const gameScripts = diContainer.get(GCS_DI_TOKENS.gcsGameScripts);

    const script = new TestScript();

    gameScripts.addScript(script);

    it('Обновление игровых скриптов', () => {
      gameScripts.update(1);
      expect(script.counter).toEqual(1);
    });

    it('Деструктуризация игровых скриптов', () => {
      gameScripts.destroy();
      expect(script.isDestroyed).toEqual(true);
    });
  });
});
