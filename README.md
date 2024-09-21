# GCS - движок для создания игр и анимаций на канвасе

## Описание

Движок основанный на реализации связки паттернов GameLoop, Update, Component.
Не привязан к реализации рендеринга на канвасе, то есть рендерер необходимо реализовывать и подключать в проекте. Не зависит от размерности пространства, поэтому можно использовать как с pixi.js, так и с three.js.
Реализация игры сводится к двум основным шагам

- описание игровых объектов
- описание взаимодействия этих объектов

### Как устроен

## Основные понятия

**Игровой цикл (GameLoop)** - основа для любой игры, так как в любой игре (кроме пошаговых, например, шахмат) существует множество игровых объектов и их взаимодействие на каждом кадре.
**Игровой жизненный цикл** - Основной интерфейс для компонентов игрового движка, от которого они наследуются

```
export interface GameLifeCycle {
  start?(): void; // старт игрового цикла
  stop?(): void; // остановка игрового цикла (окончание)
  update?(delta: number): void; // обновление игрового цикла
  destroy?(): void; // деструктуризация игры
  pause?(): void; // пауза в игре
  resume?(): void; // возобновление игры
}
```

**Метод Update** - В игровом мире есть набор объектов. В каждом из объектов реализован метод Update, который симулирует поведение объекта каждый кадр. Каждый кадр игра обновляет объект из набора.
**Компонент Component** - Класс для приватной логики или данных игрового объекта, например, позиционирование, отображение, управление. Отвечает принципу единой ответственности. Поддерживает методы жизненного цикла.
**Игровой объект (GameObject)** - Класс-контейнер для игровых компонентов. Если у игровой сущности есть позиционирование в пространстве и визуальное отображение, то это Игровой объект. Поддерживает методы жизненного цикла.
**Игровой мир (GameWorld)** - Класс-контейнер для игровых объектов. Поддерживает методы жизненного цикла.
**Игровые скрипты (GameScripts)** - Нужны для описания общеигровой логики, например для коллизий или управления группой игровых объектов. Поддерживают методы жизненного цикла

## Устройство GCSEngine

Класс **GCSEngine** - фасад движка, точка входа для всего доступного API. Доступное API:

- добавление в мир игровых объектов
- создание скриптов для игры
- управление игровым циклом (поддержка методов GameLifeCycle)
- управление игровым временем
- доступ к рендереру и его контейнеру

Класс **GameLifeCycle** - единая точка управления всеми игровыми сущностями, которые поддерживают GameLifeCycle (то есть наследуются от этого интерфейса). Это могут быть и игровые объекты, и время, и отрисовщик, и прочее. Это позволяет на каждый кадр обновлять все компоненты игры и ставить их единовременно на паузу.

### UML-Диаграммы

- **diagrams/GCSEngine.adoc** - Общая схема устройства GCSEngine
- **diagrams/GameLoop.adoc** - Схема для игрового цикла
- **diagrams/GameObject.adoc** - Схема для игрового объекта
- **diagrams/SpecificGameObject.adoc** - Схема для конкретного игрового объекта
- **diagrams/GameWorld.adoc** - Схема для игрового мира
- **diagrams/GameScripts.adoc** - Схема для игровых скриптов
- **diagrams/Renderer.adoc** - Схема для отрисовщика

## API

- **src/core/GCSEngine.ts** - GCSEngine фасад для API движка

## Основные сущности

- **src/gcsEngineFactory.ts** - создание инстанса GCSEngine
- **src/di/di.container.ts** - DI контейнер
- **src/components/index.ts** - компоненты для игровых объектов
- **src/core/updatable-entities/GameObject.ts** - игровой объект
- **src/core/updatable-entities/GameWorld.ts** - игровой мир - контейнер для игровых объектов
- **src/core/updatable-entities/GameScripts.ts** - игровые скрипты - набор исполняемых скриптов для общеигровой логики
- **src/core/updatable-entities/GameRenderer.ts** - отрисовщик на канвасе

### Алгоритм интеграции

Использование движка сводится к следующим действиям:

1. Создание рендерера и добавление игровых объектов в реальный рендерер
2. Создание игровых объектов и их компонентов
3. Создание игровых скриптов
4. Старт игровой сцены/уровня

### Пример интеграции на pixi.js

Пример реализации каждого из шагов, указанных выше, для pixi.js

### 1. Написание отрисовщика и компонентов отображения

Так как движок абстрактный и не знает о том, как рендерится игра, то нужно написать рендерер, который должен реализовывать интерфейс **IRenderer**. Пример такой реализации для **pixi.js**

```
import {Application, Container} from 'pixi.js';
import {IDimensions, IRenderer} from '@specials/gcs-engine';

export class PixiRenderer implements IRenderer {
  public app: Application;
  public rootContainer: Container;

  public create(containerNode: HTMLElement): void {
    const {width, height} = containerNode.getBoundingClientRect();

    this.app = new Application({
      width,
      height,
      antialias: true,
      resolution: this.getAppDPR(),
      autoStart: false,
    });
    this.app.ticker.autoStart = false;

    const canvas = this.app.view as HTMLCanvasElement;
    containerNode.appendChild(canvas);

    canvas.style.width = '100%';
    canvas.style.height = '100%';

    this.rootContainer = new Container();
    this.app.stage.addChild(this.rootContainer);
  }

  public getAppDPR(): number {
    return window.devicePixelRatio;
  }

  public getFrameDimensions(): IDimensions {
    const dpr = this.getAppDPR();

    return {
      width: this.app.renderer.width / dpr,
      height: this.app.renderer.height / dpr,
    };
  }

  public stop(): void {
    this.app.stop();
  }

  public start(): void {
    this.app.start();
  }

  public pause(): void {
    this.app.stop();
    this.app.stage.eventMode = 'none';
  }

  public resume(): void {
    this.app.start();
    this.app.stage.eventMode = 'auto';
  }

  public destroy(): void {
    if (this.app) {
      this.app.destroy();
    }
  }
}
```

Затем нужно передать инстанс **PixiRenderer** при создании инстанса движка через DI

```
container
  .bind(DI_TOKENS.gcsEngine)
  .toInstance(() => gcsEngineFactory(container.get(DI_TOKENS.pixiRenderer)))
  .inSingletonScope();
```

Следующая задача заключается в том, чтобы связать игровые объекты из движка с реальным рендерером. В pixi.js у объектов есть позиция и отображение, то есть нужно связать их с игровым объектом. Как вариант, это можно сделать с помощью компонента ViewRendererComponent.

```
import {BaseComponent, GCSEngine, Transform2dComponent} from '@specials/gcs-engine';

import {ViewComponent} from './ViewComponent';

export class ViewRendererComponent extends BaseComponent {
  private transformComponent: Transform2dComponent;
  private viewComponent: ViewComponent;

  constructor(private readonly engine: GCSEngine) {
    super();
  }

  public create(): void {
    this.viewComponent = this.gameObject.getComponentByTag<ViewComponent>('ViewComponent')!;
    this.transformComponent = this.gameObject.getComponent<Transform2dComponent>(Transform2dComponent)!;

    // связываем позицию, скейл, и поворот объекта в pixi.js с позицией игрового объекта
    this.transformComponent.bindPosition = this.viewComponent.view.position;
    this.transformComponent.bindScale = this.viewComponent.view.scale;
    this.transformComponent.bindRotation = this.viewComponent.view.rotation;

    // при добавлении игрового объекта в мир, отображения для pixi.js так же добавится в его контейнер
    this.engine.renderer.container.addChild(this.viewComponent.view);
  }

  public destroy(): void {
    // удаление из контейнера pixi при удалении игрового объекта из мира
    this.engine.renderer.container.removeChild(this.viewComponent.view);
  }
}
```

Компонент **ViewRendererComponent** использует другой компонент **ViewComponent**, который отвечает только за визуальное отображение объекта. Пример реализации **ViewComponent**, который является абстрактным и все конкретные компоненты отображения должны наследоваться от него, пример будет в следующем пункте.

```
import {BaseComponent, Transform2dComponent} from '@specials/gcs-engine';
import {Container} from 'pixi.js';

export abstract class ViewComponent<V extends Container = Container> extends BaseComponent {
  protected transformComponent: Transform2dComponent;
  public static componentName = 'ViewComponent';
  public name = ViewComponent.componentName;

  public view: V;

  public create(): void {
    this.transformComponent = this.gameObject.getComponent<Transform2dComponent>(Transform2dComponent)!;
    this.view = this.renderView();
  }

  protected abstract renderView(): V;
}
```

### 2. Пример написания игрового объекта

**Игровой объект** - это абстрактный контейнер для конкретных компонентов игрового объекта. Он должен собираться через набор компонентов.
Для примера рассмотрим игровой объект **"Шайба"**, которая может двигаться в пространстве.
Для такого игрового объекта понадобятся следующие компоненты:

- **Transform2dComponent** - позиционирование в двумерном пространстве
- **Movement2dComponent** - движение в двумерном пространстве
- **PuckViewComponent** - внешний вид фишки
- **ViewRendererComponent** - добавление и удаление в отрисовщик

Компоненты **Transform2dComponent** и **Movement2dComponent** уже есть в библиотеке компонентов, поэтому просто импортируем их `import {Movement2dComponent, Transform2dComponent} from '@specials/gcs-engine';`

Компонент **PuckViewComponent** нужно написать, так как отображение обычно уникальное для каждого игрового объекта. ViewComponent был написан в пункте 1

```
export class PuckViewComponent extends ViewComponent<Graphics> {
  public shapeType: ViewComponentShapeType = ViewComponentShapeType.GraphicsCircle;

  public renderView(): Graphics {
    return new Graphics().beginFill(0x000000).drawCircle(0, 0, 3.5).endFill();
  }
}
```

Компонент **ViewRendererComponent** уже был написан в пункте 1, импортируем его

Теперь можно собрать игровой объект **Puck**. Для этого можно импортировать GameObject из библиотеки и наследоваться от него

```
export class Puck extends GameObject {
  constructor(
    public readonly transformComponent: Transform2dComponent,
    public readonly viewComponent: PuckViewComponent,
    public readonly movementComponent: Movement2dComponent,
    private readonly viewRendererComponent: ViewRendererComponent,
  ) {
    super();

    this.tag = 'puck';

    this.addComponent(
      this.transformComponent,
      this.viewComponent,
      this.movementComponent,
      this.viewRendererComponent,
    );
  }
}
```

Этот вариант не совсем правильный с точки зрения принципа работы движка, потому что если удалить компонент из игрового объекта, то он все еще будет доступен как публичное свойство, что может привести к ошибке. Зато такой подход удобен в использовании, поэтому если есть уверенность, что компоненты не будут удалены в процессе игры, можно использовать его.

Второй вариант создания игрового объекта через класс-фабрику игровых объектов. Это правильный вариант, но не очень удобный,так как чтобы получить компонент игрового объекта, это нужно делать через метод getComponent, который может вернуть undefined, из-за чего придется делать множество проверок, что ослабить читабельность.

```
export class ProjectGameObjectFactory {
  constructor(
    private readonly gameObjectFactory: () => GameObject,
    private readonly transformComponentFactory: () => Transform2dComponent,
    private readonly puckViewComponentFactory: () => PuckViewComponent,
    private readonly movementComponentFactory: () => Movement2dComponent,
    private readonly viewRendererComponentFactory: () => ViewRendererComponent,
  ) {}

  public createPuck(): GameObject {
    const puck = this.gameObjectFactory();
    puck.tag = 'puck';
    puck.addComponent(
      this.transformComponentFactory(),
      this.puckViewComponentFactory(),
      this.movementComponentFactory(),
      this.viewRendererComponentFactory(),
    );

    return puck;
  }
}
```

Теперь нужно провести настройку движения, это обычно делается в классе Spawner (реализовывается отдельно в проекте, не входит в библиотеку)

```
export class GameObjectsSpawner {
  constructor(
    private readonly puckFactory: () => Puck,
    private readonly engine: GCSEngine,
  ) {}

  public spawnPuck(directionAngleInRad: number, velocity: number): Puck {
    const puck = this.puckFactory();
    this.engine.world.addGameObject(puck);

    puck.movementComponent.velocity = velocity;
    puck.movementComponent.directionFromAngle = directionAngleInRad;

    return puck;
  }
}
```

### 3. Пример скрипта

Игровой объект есть, теперь можно написать какой-нибудь скрипт по обработке общеигровой логике. Скрипт поддерживает все методы игрового цикла, поэтому с помощью него можно написать инициализацию игрового мира (то есть настроить уровень игры), а также обработку логики на каждый кадр
Обычно в каждой игре есть инициализация уровня и коллизии в нем, это можно сделать с помощью скриптов. Рассмотрим примеры реализации таких скриптов

** Инициализация уровня **

```

export class StartUpScript implements IGameScript {
  constructor(
    private readonly spawner: GameObjectsSpawner,
    private readonly engine: GCSEngine,
  ) {}

  public create(): void {
    const world = this.engine.world;
    this.spawner.spawnPuck(Math.PI / 2, 5);
    this.spawner.spawnPuck(3 * Math.PI / 2, 5);
    this.spawner.spawnPuck(-3 * Math.PI / 2, 5);
  }
}
```

** Коллизии **

```
export class CollisionsScript implements IGameScript {
  private gameFieldBounds: Rectangle;

  constructor(private readonly engine: GCSEngine) {}

  public create(): void {
    const {width, height} = this.engine.renderer.dimensions;
    this.gameFieldBounds = new Rectangle(0, 0, width, height);
  }

  public update(): void {
    const puckList = this.engine.world.getGameObjectList<Puck>(Puck);
    // либо const puckList = this.engine.world.getGameObjectListByTag<Puck>('puck');

    puckList.forEach(p => this.checkGameObjectInBounds(p))
  }

  // шайбы меняют направление на противоположное, если выходят за пределы игрового поля
  private checkGameObjectInBounds(puck: Puck): void {
    const halfWidth = puck.viewComponent.halfWidth;
    const halfHeight = puck.viewComponent.halfHeight;

    const x = puck.transformComponent.x;
    const y = puck.transformComponent.y;

    // у объекта центр координат совпадает с центром
    if (x - halfWidth <= this.gameFieldBounds.x && y + halfHeight < this.gameFieldBounds.height) {
      puck.movementComponent.dirX *= -1;
    }
    else if (x + halfWidth >= this.gameFieldBounds.width && y + halfHeight < this.gameFieldBounds.height) {
      puck.movementComponent.dirX *= -1;
    }
    else if (y - halfWidth <= this.gameFieldBounds.y) {
      puck.movementComponent.dirY *= -1;
    }
    else if (y + halfWidth >= this.gameFieldBounds.y) {
      puck.movementComponent.dirY *= -1;
    }
  }
}
```

### 4. Старт игровой сцены/уровня

Теперь когда есть рендерер, игровой объект и игровые скрипты, можно запускать игру. Для этого можно сделать так: написать класс сцены, который создаст канвас и добавит игровые скрипты

```
export class TimeAccuracyChallengeScene {
  constructor(
    private readonly engine: GCSEngine,
    private readonly startUpScript: StartUpScript,
    private readonly collisionsScript: CollisionsScript,
  ) {}

  public create(container: HTMLDivElement): void {
    this.engine.renderer.create(container);

    this.engine.scripts.addScript(
      this.startUpScript,
      this.collisionsScript,
    );

    // стартуем игровой цикл
    this.engine.start();
  }
}
```

И компонент на React, который использует эту сцену для добавления канваса в html-контейнер

```
export function GameContainer(): JSX.Element {
  const game = useGame(); // TimeAccuracyChallengeScene
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameContainerRef.current) {
      game.create(gameContainerRef.current)
      return game.destroy
    }
  });

  return <div ref={gameContainerRef} style={{width: window.innerWidth, height: window.innerHeight}} />;
}
```
