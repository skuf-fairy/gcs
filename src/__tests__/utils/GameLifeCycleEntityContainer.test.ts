import {describe, expect, it} from 'vitest';
import {createGCSEngineDIContainer} from '../di/di.container';
import {FakeRenderer} from '../FakeRenderer';
import {GCS_DI_TOKENS} from '../di/di.tokens';
import {GameLifeCycleEntityContainer} from '../../utils/GameLifeCycleEntityContainer';
import {IGameObjectComponent} from '../../core/core.types';
import {Transform2dComponent} from '../../components/Transform2dComponent';
import {Movement2dComponent} from '../../components/Movement2dComponent';

describe('GameLifeCycleEntityContainer', () => {
  const diContainer = createGCSEngineDIContainer(new FakeRenderer());

  describe('Добавление объекта', () => {
    const container = new GameLifeCycleEntityContainer<Function, IGameObjectComponent>();
    const transformComponent = diContainer.get(GCS_DI_TOKENS.gcsTransform2dComponent);
    const movementComponent = diContainer.get(GCS_DI_TOKENS.gcsMovement2dComponent);

    container.pushEntity(Transform2dComponent, transformComponent);
    container.pushEntity(Movement2dComponent, movementComponent);

    it('Списки заполнены правильно количественно', () => {
      expect(container.entityMap.size).toEqual(2);
      expect(container.updatableEntityMap.size).toEqual(1);
    });

    it('Списки заполнены правильно инстансами', () => {
      expect(container.getEntityByKey(Transform2dComponent)).toBe(transformComponent);
      expect(container.getEntityByKey(Movement2dComponent)).toBe(movementComponent);
      expect(container.updatableEntityMap.getValue(Movement2dComponent)).toBe(movementComponent);
    });
  });
});
