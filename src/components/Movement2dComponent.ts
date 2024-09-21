import {BaseComponent} from './BaseComponent';

import {Vector2Utils} from '../utils/Vector2Utils';
import {Transform2dComponent} from './Transform2dComponent';
import {IVector2} from './components.types';

export class Movement2dComponent extends BaseComponent {
  public velocity: number;
  public acceleration: number;
  private direction2d: IVector2;

  private transformComponent: Transform2dComponent;

  constructor(private readonly vector2dFactory: (x: number, y: number) => IVector2) {
    super();

    this.velocity = 0;
    this.acceleration = 0;
    this.direction2d = this.vector2dFactory(0, 0);
  }

  public onAddToGameObject(): void {
    this.transformComponent = this.gameObject.getComponent<Transform2dComponent>(Transform2dComponent)!;
  }

  /**
   * Обновление позиции игрового объекта в соответствующем направлении с заданной скоростью
   * @param delta время между кадрами
   */
  public update(delta: number): void {
    this.velocity += this.acceleration;
    this.transformComponent.x += this.direction2d.x * this.velocity * delta;
    this.transformComponent.y += this.direction2d.y * this.velocity * delta;
  }

  /**
   * Привязка внешнего вектора позиции. Нужно, чтобы привязать позицию из библиотеки рендера (например, pixi.js)
   *
   * @example
   * const direction = new Vector2();
   * movementComponent.bindDirection = direction;
   * direction.x = 1;
   * expect(movementComponent.dirX).toEqual(1);
   */
  set bindDirection(v: IVector2) {
    this.direction2d = v;
  }

  /**
   * Присвоить значения вектора позиции соответствующим координатам направления движения
   */
  set direction(d: IVector2) {
    this.direction2d.x = d.x;
    this.direction2d.y = d.y;
  }

  /**
   * Получить координату х направления движения
   */
  get dirX(): number {
    return this.direction2d.x;
  }

  /**
   * Присвоить координату х направления движения
   */
  set dirX(v: number) {
    this.direction2d.x = v;
  }

  /**
   * Получить координату y направления движения
   */
  get dirY(): number {
    return this.direction2d.y;
  }

  /**
   * Присвоить координату y направления движения
   */
  set dirY(v: number) {
    this.direction2d.y = v;
  }

  /**
   * Получить вектор направления.
   * Возвращается копия, чтобы не изменить значения полученного вектора по ссылке, тем самым изменив и позицию объекта
   */
  get direction(): IVector2 {
    return this.direction2d.clone();
  }

  /**
   * Изменение значения вектора направления через угол направления в радианах
   * @example
   *  const angleInRad = Math.PI / 2;
   *  movementComponent.directionFromAngle = angleInRad;
   *  expect(movementComponent.dirX).toEqual(Math.cos(angleInRad));
   *  expect(movementComponent.dirY).toEqual(Math.sin(angleInRad));
   */
  set directionFromAngle(angleInRad: number) {
    Vector2Utils.fromAngle(this.direction2d, angleInRad);
  }
}
