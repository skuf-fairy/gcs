import {GCSEngine} from './core/GCSEngine';
import {IAsyncRenderer, IGameWorldContainer, IRenderer, AnyRenderer} from './core/core.types';
import {createGCSEngineDIContainer} from './di/di.container';
import {GCS_DI_TOKENS} from './di/di.tokens';

export const createSingletonGCSEngine = (<
  Container extends IGameWorldContainer,
  Renderer extends AnyRenderer<Container>,
>() => {
  let engine: GCSEngine<Container, Renderer> | undefined;
  return (renderer: IRenderer<Container> | IAsyncRenderer<Container>) => {
    if (!engine) {
      const diContainer = createGCSEngineDIContainer(renderer);
      engine = diContainer.get(GCS_DI_TOKENS.gcsEngine) as GCSEngine<Container, Renderer>;
    }
    return engine;
  };
})();
