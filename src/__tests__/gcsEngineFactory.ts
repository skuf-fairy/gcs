import {GCSEngine} from '../core/GCSEngine';
import {IAsyncRenderer, IGameWorldContainer, IRenderer, AnyRenderer} from '../core/core.types';
import {createGCSEngineDIContainer} from './di/di.container';
import {GCS_DI_TOKENS} from './di/di.tokens';

export const createSingletonGCSEngine = (<
  Container extends IGameWorldContainer,
  Renderer extends AnyRenderer<Container>,
>() => {
  let instance: GCSEngine<Container, Renderer> | undefined;
  return (renderer: IRenderer<Container> | IAsyncRenderer<Container>) => {
    if (!instance) {
      const diContainer = createGCSEngineDIContainer(renderer);
      instance = diContainer.get(GCS_DI_TOKENS.gcsEngine) as GCSEngine<Container, Renderer>;
    }
    return instance;
  };
})();
