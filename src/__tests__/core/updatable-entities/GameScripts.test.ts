import {describe, expect, it} from 'vitest';
import {FakeRenderer} from '../../FakeRenderer';
import {getDITokens} from '../../../di/di.tokens';
import {createGCSDIContainer} from '../../../di/di.container';
import {TestScript} from '../test-entities/TestScript';

describe('GameScripts', () => {
  const diContainer = createGCSDIContainer(new FakeRenderer());
  const GCS_DI_TOKENS = getDITokens();

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
      gameScripts.onUpdate(1);
      expect(script.counter).toEqual(1);
    });

    it('Деструктуризация игровых скриптов', () => {
      gameScripts.onDestroy();
      expect(script.isDestroyed).toEqual(true);
    });
  });
});
