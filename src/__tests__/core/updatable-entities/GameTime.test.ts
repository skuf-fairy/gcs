import {describe, expect, it} from 'vitest';
import {createGCSEngineDIContainer} from '../../../di/di.container';
import {FakeRenderer} from '../../FakeRenderer';
import {GCS_DI_TOKENS} from '../../../di/di.tokens';

describe('GameTime', () => {
  const diContainer = createGCSEngineDIContainer(new FakeRenderer());

  it('Инициализация', () => {
    const gt = diContainer.get(GCS_DI_TOKENS.gcsGameTime);

    // expect(gt.getElapsedMS()).toEqual(0);
    expect(gt.getTimeMs()).toEqual(-1);
  });

  it('Обновление времени', () => {
    const gt = diContainer.get(GCS_DI_TOKENS.gcsGameTime);

    gt.start();
    gt.update();
    gt.stop();

    expect(gt.getElapsedMS()).not.toEqual(0);
    expect(gt.getTimeMs()).not.toEqual(0);
  });
});
