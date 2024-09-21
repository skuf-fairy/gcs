import {BaseComponent} from './BaseComponent';
import {Transform3dComponent} from './Transform3dComponent';
import {IVector3} from './components.types';

export class Movement3dComponent extends BaseComponent {
  public velocity: number;
  public acceleration: number;
  private direction3d: IVector3;

  private transformComponent: Transform3dComponent;

  constructor(private readonly vector3dFactory: (x: number, y: number, z: number) => IVector3) {
    super();

    this.velocity = 0;
    this.acceleration = 0;
    this.direction3d = this.vector3dFactory(0, 0, 0);
  }

  public onAddToGameObject(): void {
    this.transformComponent = this.gameObject.getComponent<Transform3dComponent>(Transform3dComponent)!;
  }

  /**
   * Обновление позиции игрового объекта в соответствующем направлении с заданной скоростью
   * @param delta время между кадрами
   */
  public update(delta: number): void {
    this.velocity += this.acceleration;

    this.transformComponent.x += this.direction3d.x * this.velocity * delta;
    this.transformComponent.y += this.direction3d.y * this.velocity * delta;
    this.transformComponent.z += this.direction3d.z * this.velocity * delta;
  }

  /**
   * Привязка внешнего вектора позиции. Нужно, чтобы привязать позицию из библиотеки рендера (например, pixi.js)
   *
   * @example
   * const direction = new Vector3();
   * movementComponent.bindDirection = direction;
   * direction.x = 1;
   * expect(movementComponent.dirX).toEqual(1);
   */
  set bindDirection(v: IVector3) {
    this.direction3d = v;
  }

  /**
   * Присвоить значения вектора позиции соответствующим координатам направления движения
   */
  set direction(d: IVector3) {
    this.direction3d.x = d.x;
    this.direction3d.y = d.y;
    this.direction3d.z = d.z;
  }

  /**
   * Получить координату х направления движения
   */
  get dirX(): number {
    return this.direction3d.x;
  }

  /**
   * Присвоить координату x направления движения
   */
  set dirX(v: number) {
    this.direction3d.x = v;
  }

  /**
   * Получить координату y направления движения
   */
  get dirY(): number {
    return this.direction3d.y;
  }

  /**
   * Присвоить координату y направления движения
   */
  set dirY(v: number) {
    this.direction3d.y = v;
  }

  /**
   * Получить координату z направления движения
   */
  get dirZ(): number {
    return this.direction3d.z;
  }

  /**
   * Присвоить координату z направления движения
   */
  set dirZ(v: number) {
    this.direction3d.z = v;
  }

  /**
   * Получить вектор направления.
   * Возвращается копия, чтобы не изменить значения полученного вектора по ссылке, тем самым изменив и позицию объекта
   */
  get direction(): IVector3 {
    return this.direction3d.clone();
  }
}
