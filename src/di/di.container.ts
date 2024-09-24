import {EventEmitter} from 'eventemitter3';
import {Container, injected} from 'brandi';
import {getDITokens} from './di.tokens';
import {IAsyncRenderer, IGameWorldContainer, IRenderer} from '../core/core.types';
import {GameObject} from '../core/updatable-entities/GameObject';
import {GameLifeCycle} from '../core/game-loop/GameLifeCycle';
import {Ticker} from '../utils/Ticker/Ticker';
import {GameLoop} from '../core/game-loop/GameLoop';
import {GameRenderer} from '../core/updatable-entities/GameRenderer';
import {GameState} from '../core/game-loop/GameState';
import {GameStateEvents} from '../core/game-loop/GameStateEvents';
import {GameTime} from '../core/updatable-entities/GameTime';
import {GameWorld} from '../core/updatable-entities/GameWorld';
import {Scope} from '../core/Scope';
import {VisibilityChangeListener} from '../core/updatable-entities/VisibilityChangeListener';
import {HealthComponent} from '../components/HealthComponent';
import {Movement2dComponent} from '../components/Movement2dComponent';
import {Movement3dComponent} from '../components/Movement3dComponent';
import {Transform2dComponent} from '../components/Transform2dComponent';
import {Transform3dComponent} from '../components/Transform3dComponent';
import {TimerComponent} from '../components/TimerComponent';
import {Vector2} from '../utils/Vector2';
import {Vector3} from '../utils/Vector3';
import {GameScripts} from '../core/updatable-entities/GameScripts';
import {CallbackCollector} from '../utils/CallbacksCollector';
import once from 'lodash.once';

export const createGCSDIContainer = <GameWorldContainer extends IGameWorldContainer>(
  renderer: IRenderer<GameWorldContainer> | IAsyncRenderer<GameWorldContainer>,
  container: Container,
): Container => {
  const GCS_DI_TOKENS = getDITokens();

  container.bind(GCS_DI_TOKENS.gcsGameObject).toInstance(GameObject).inTransientScope();
  container.bind(GCS_DI_TOKENS.gcsGameObjectFactory).toFactory(GameObject);

  injected(GameLifeCycle, GCS_DI_TOKENS.gcsGameState, GCS_DI_TOKENS.gcsGameStateEvents, GCS_DI_TOKENS.gcsGameLoop);
  container.bind(GCS_DI_TOKENS.gcsGameLifeCycle).toInstance(GameLifeCycle).inTransientScope();

  injected(GameLoop, GCS_DI_TOKENS.gcsTicker);
  container.bind(GCS_DI_TOKENS.gcsGameLoop).toInstance(GameLoop).inTransientScope();

  container
    .bind(GCS_DI_TOKENS.gcsGameRenderer)
    .toInstance(() => new GameRenderer(renderer))
    .inTransientScope();

  injected(GameState, GCS_DI_TOKENS.gcsEventEmitter);
  container.bind(GCS_DI_TOKENS.gcsGameState).toInstance(GameState).inTransientScope();

  injected(GameStateEvents, GCS_DI_TOKENS.gcsEventEmitter);
  container.bind(GCS_DI_TOKENS.gcsGameStateEvents).toInstance(GameStateEvents).inTransientScope();

  injected(GameTime, GCS_DI_TOKENS.gcsTicker);
  container.bind(GCS_DI_TOKENS.gcsGameTime).toInstance(GameTime).inTransientScope();
  container.bind(GCS_DI_TOKENS.gcsGameWorld).toInstance(GameWorld).inTransientScope();

  container.bind(GCS_DI_TOKENS.gcsGameScripts).toInstance(GameScripts).inTransientScope();

  injected(
    Scope,
    GCS_DI_TOKENS.gcsGameWorld,
    GCS_DI_TOKENS.gcsGameTime,
    GCS_DI_TOKENS.gcsGameScripts,
    GCS_DI_TOKENS.gcsGameRenderer,
    GCS_DI_TOKENS.gcsGameLifeCycle,
    GCS_DI_TOKENS.gcsVisibilityChangeListener,
  );
  container.bind(GCS_DI_TOKENS.gcsScope).toInstance(Scope).inSingletonScope();

  injected(VisibilityChangeListener, GCS_DI_TOKENS.gcsCallbackCollector);
  container.bind(GCS_DI_TOKENS.gcsVisibilityChangeListener).toInstance(VisibilityChangeListener).inTransientScope();

  // utils
  container.bind(GCS_DI_TOKENS.gcsEventEmitter).toInstance(EventEmitter).inTransientScope();
  container.bind(GCS_DI_TOKENS.gcsTicker).toInstance(Ticker).inTransientScope();
  container.bind(GCS_DI_TOKENS.gcsVector2).toInstance(Vector2).inTransientScope();
  container.bind(GCS_DI_TOKENS.gcsVector3).toInstance(Vector3).inTransientScope();
  container.bind(GCS_DI_TOKENS.gcsVector2Factory).toFactory(Vector2, (instance, x, y) => {
    instance.x = x;
    instance.y = y;
  });
  container.bind(GCS_DI_TOKENS.gcsVector3Factory).toFactory(Vector3, (instance, x, y, z) => {
    instance.x = x;
    instance.y = y;
    instance.z = z;
  });
  container.bind(GCS_DI_TOKENS.gcsCallbackCollector).toInstance(CallbackCollector).inTransientScope();

  // components
  container.bind(GCS_DI_TOKENS.gcsHealthComponent).toInstance(HealthComponent).inTransientScope();
  injected(Movement2dComponent, GCS_DI_TOKENS.gcsVector2Factory);
  container.bind(GCS_DI_TOKENS.gcsMovement2dComponent).toInstance(Movement2dComponent).inTransientScope();

  injected(Movement3dComponent, GCS_DI_TOKENS.gcsVector3Factory);
  container.bind(GCS_DI_TOKENS.gcsMovement3dComponent).toInstance(Movement3dComponent).inTransientScope();

  injected(Transform2dComponent, GCS_DI_TOKENS.gcsVector2Factory);
  container.bind(GCS_DI_TOKENS.gcsTransform2dComponent).toInstance(Transform2dComponent).inTransientScope();

  injected(Transform3dComponent, GCS_DI_TOKENS.gcsVector3Factory);
  container.bind(GCS_DI_TOKENS.gcsTransform3dComponent).toInstance(Transform3dComponent).inTransientScope();

  injected(TimerComponent, GCS_DI_TOKENS.gcsScope);
  container.bind(GCS_DI_TOKENS.gcsTimerComponent).toInstance(TimerComponent).inTransientScope();

  return container;
};

export const createSingletonGCSDIContainer = once(createGCSDIContainer);
