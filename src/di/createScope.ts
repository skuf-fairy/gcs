import {Container} from 'brandi';
import {AnyRenderer, IGameWorldContainer} from '../core/core.types';
import {Scope} from '../core/Scope';
import {createGCSDIContainer} from './di.container';
import {getDITokens} from './di.tokens';

export function createScope<Container extends IGameWorldContainer, Renderer extends AnyRenderer<Container>>(
  renderer: Renderer,
): Scope<Container, Renderer> {
  const container = createGCSDIContainer<Container>(renderer, new Container());
  const scope = container.get(getDITokens().gcsScope);

  return scope as Scope<Container, Renderer>;
}
