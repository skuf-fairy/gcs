import {describe, expect, it} from 'vitest';
import {createGCSDIContainer} from '../../../di/di.container';
import {FakeRenderer} from '../../FakeRenderer';
import {getDITokens} from '../../../di/di.tokens';

describe('GameTime', () => {
  const diContainer = createGCSDIContainer(new FakeRenderer());
  const GCS_DI_TOKENS = getDITokens();

  it('Инициализация', () => {
    const gt = diContainer.get(GCS_DI_TOKENS.gcsGameTime);

    // expect(gt.getElapsedMS()).toEqual(0);
    expect(gt.getTimeMs()).toEqual(-1);
  });

  it('Обновление времени', () => {
    const gt = diContainer.get(GCS_DI_TOKENS.gcsGameTime);

    gt.onStart();
    gt.onUpdate();
    gt.onStop();

    expect(gt.getElapsedMS()).not.toEqual(0);
    expect(gt.getTimeMs()).not.toEqual(0);
  });
});
