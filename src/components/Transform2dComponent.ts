import {BaseComponent} from './BaseComponent';
import {IVector2} from './components.types';

export class Transform2dComponent extends BaseComponent {
  private position2d: IVector2;
  private scale2d: IVector2;
  private rotation2d: number;

  constructor(private readonly vector2dFactory: (x: number, y: number) => IVector2) {
    super();

    this.position2d = this.vector2dFactory(0, 0);
    this.scale2d = this.vector2dFactory(0, 0);
    this.rotation2d = 0;
  }

  /**
   * Привязка внешнего вектора позиции. Нужно, чтобы привязать позицию из библиотеки рендера (например, pixi.js)
   *
   * @example
   * const position = new Vector2();
   * transformComponent.bindPosition = position;
   * position.x = 1;
   * expect(transformComponent.x).toEqual(1);
   */
  set bindPosition(v: IVector2) {
    this.position2d = v;
  }

  /**
   * Присвоить значения вектора позиции соответствующим координатам
   */
  set position(v: IVector2) {
    this.position2d.x = v.x;
    this.position2d.y = v.y;
  }

  /**
   * Получить вектор позиции.
   * Возвращается копия, чтобы не изменить значения полученного вектора по ссылке, тем самым изменив и позицию объекта
   */
  get position(): IVector2 {
    return this.position2d.clone();
  }

  /**
   * Присвоить координату х
   */
  set x(v: number) {
    this.position2d.x = v;
  }

  /**
   * Получить координату х
   */
  get x(): number {
    return this.position2d.x;
  }

  /**
   * Присвоить координату y
   */
  set y(v: number) {
    this.position2d.y = v;
  }

  /**
   * Получить координату y
   */
  get y(): number {
    return this.position2d.y;
  }

  /**
   * Привязка внешнего вектора скейла. Нужно, чтобы привязать позицию из библиотеки рендера (например, pixi.js)
   *
   * @example
   * const scale = new Vector2();
   * transformComponent.bindScale = scale;
   * scale.x = 1;
   * expect(transformComponent.scaleX).toEqual(1);
   */
  set bindScale(v: IVector2) {
    this.scale2d = v;
  }

  /**
   * Присвоить значения вектора скейла соответствующим координатам
   */
  set scale(s: IVector2) {
    this.scale2d.x = s.x;
    this.scale2d.y = s.y;
  }

  /**
   * Получить вектор скейла.
   * Возвращается копия, чтобы не изменить значения полученного вектора по ссылке, тем самым изменив и позицию объекта
   */
  get scale(): IVector2 {
    return this.scale2d.clone();
  }

  /**
   * Присвоить значение скейла по x
   */
  set scaleX(v: number) {
    this.scale2d.x = v;
  }

  /**
   * Получить значение скейла по х
   */
  get scaleX(): number {
    return this.scale2d.x;
  }

  /**
   * Присвоить значение скейла по х
   */
  set scaleY(v: number) {
    this.scale2d.y = v;
  }

  /**
   * Получить значение скейла по х
   */
  get scaleY(): number {
    return this.scale2d.y;
  }

  /**
   * Получить значение поворота
   */
  get rotation(): number {
    return this.rotation2d;
  }

  /**
   * Присвоить значение поворота
   */
  set rotation(r: number) {
    this.rotation2d = r;
  }

  set bindRotation(r: number) {
    this.rotation2d = r;
  }
}
