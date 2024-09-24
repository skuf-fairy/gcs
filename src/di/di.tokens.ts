import {Factory, token} from 'brandi';
import {GameLoop} from '../core/game-loop/GameLoop';
import {GameObject} from '../core/updatable-entities/GameObject';
import {GameScripts} from '../core/updatable-entities/GameScripts';
import {GameState} from '../core/game-loop/GameState';
import {GameStateEvents} from '../core/game-loop/GameStateEvents';
import {GameTime} from '../core/updatable-entities/GameTime';
import {VisibilityChangeListener} from '../core/updatable-entities/VisibilityChangeListener';
import {CallbackCollector} from '../utils/CallbacksCollector';
import {Scope} from '../core/Scope';
import {GameRenderer} from '../core/updatable-entities/GameRenderer';
import {EventEmitter} from 'eventemitter3';
import {Ticker} from '../utils/Ticker/Ticker';
import {GameWorld} from '../core/updatable-entities/GameWorld';
import {GameLifeCycle} from '../core/game-loop/GameLifeCycle';
import {HealthComponent} from '../components/HealthComponent';
import {Movement2dComponent} from '../components/Movement2dComponent';
import {Movement3dComponent} from '../components/Movement3dComponent';
import {TimerComponent} from '../components/TimerComponent';
import {Transform2dComponent} from '../components/Transform2dComponent';
import {Transform3dComponent} from '../components/Transform3dComponent';
import {Vector2} from '../utils/Vector2';
import {Vector3} from '../utils/Vector3';
import {AnyRenderer, IGameWorldContainer} from '../core/core.types';
import once from 'lodash.once';

export const getDITokens = once(<
  GameWorldContainer extends IGameWorldContainer,
  Renderer extends AnyRenderer<GameWorldContainer>,
>() => ({
  gcsScope: token<Scope<GameWorldContainer, Renderer>>('gcsEngine'),
  gcsGameLifeCycle: token<GameLifeCycle>('gcsGameLifeCycle'),
  gcsGameLoop: token<GameLoop>('gcsGameLoop'),
  gcsGameObject: token<GameObject>('gcsGameObject'),
  gcsGameObjectFactory: token<Factory<GameObject>>('gcsGameObjectFactory'),
  gcsGameRenderer: token<GameRenderer<IGameWorldContainer, AnyRenderer<IGameWorldContainer>>>('gcsGameRenderer'),
  gcsGameScripts: token<GameScripts>('gcsGameScripts'),
  gcsGameState: token<GameState>('gcsGameState'),
  gcsGameStateEvents: token<GameStateEvents>('gcsGameStateEvents'),
  gcsGameTime: token<GameTime>('gcsGameTime'),
  gcsGameWorld: token<GameWorld>('gcsGameWorld'),
  gcsVisibilityChangeListener: token<VisibilityChangeListener>('gcsVisibilityChangeListener'),
  // utils
  gcsCallbackCollector: token<CallbackCollector>('gcsCallbackCollector'),
  gcsEventEmitter: token<EventEmitter>('gcsEventEmitter'),
  gcsTicker: token<Ticker>('gcsTicker'),
  gcsVector2: token<Vector2>('gcsVector2'),
  gcsVector3: token<Vector3>('gcsVector3'),
  gcsVector2Factory: token<Factory<Vector2, [x: number, y: number]>>('gcsVector2Factory'),
  gcsVector3Factory: token<Factory<Vector3, [x: number, y: number, z: number]>>('gcsVector3Factory'),
  // components
  gcsHealthComponent: token<HealthComponent>('gcsHealthComponent'),
  gcsMovement2dComponent: token<Movement2dComponent>('gcsMovement2dComponent'),
  gcsMovement3dComponent: token<Movement3dComponent>('gcsMovement3dComponent'),
  gcsTimerComponent: token<TimerComponent>('gcsTimerComponent'),
  gcsTransform2dComponent: token<Transform2dComponent>('gcsTransform2dComponent'),
  gcsTransform3dComponent: token<Transform3dComponent>('gcsTransform3dComponent'),
}));
