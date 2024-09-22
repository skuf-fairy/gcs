import {describe, expect, it} from 'vitest';
import {createGCSEngineDIContainer} from '../di/di.container';
import {FakeRenderer} from '../FakeRenderer';
import {GCS_DI_TOKENS} from '../di/di.tokens';
import {TestScript} from './test-entities/TestScript';
import {TestComponent} from './test-entities/TestComponent';
import {GameLoopState} from '../../core/game-loop/GameState';

describe('GCSEngine', () => {
  const diContainer = createGCSEngineDIContainer(new FakeRenderer());

  const GCSEngine = diContainer.get(GCS_DI_TOKENS.gcsEngine);

  describe('Описание игры через заполнение игрового мира и написания скриптов', () => {
    it('Добавление игрового объекта в мир', () => {
      const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
      const component = new TestComponent();
      go.addComponent(component);

      GCSEngine.world.addGameObject(go);

      expect(GCSEngine.world.size).toEqual(1);
      expect(component.isCreated).toEqual(true);
    });

    it('Добавление скрипта', () => {
      const script = new TestScript();
      GCSEngine.scripts.addScript(script);
      expect(GCSEngine.scripts.size).toEqual(1);
      expect(script.isCreated).toEqual(true);
    });
  });

  it('Сброс к дефолтному состоянию', () => {
    GCSEngine.clear();

    expect(GCSEngine.scripts.size).toEqual(0);
    expect(GCSEngine.world.size).toEqual(0);
    expect(GCSEngine.gameLifeCycle.gameState.getState()).toEqual(GameLoopState.Idle);
  });

  it('Деструктуризация', () => {
    const go = diContainer.get(GCS_DI_TOKENS.gcsGameObject);
    const component = new TestComponent();
    go.addComponent(component);

    GCSEngine.world.addGameObject(go);

    GCSEngine.destroy();

    expect(GCSEngine.scripts.size).toEqual(0);
    expect(GCSEngine.world.size).toEqual(0);
    expect(GCSEngine.gameLifeCycle.gameState.getState()).toEqual(GameLoopState.Idle);
  });
});
