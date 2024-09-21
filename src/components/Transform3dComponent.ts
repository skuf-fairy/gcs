import {BaseComponent} from './BaseComponent';
import {IVector3} from './components.types';

export class Transform3dComponent extends BaseComponent {
  private position3d: IVector3;
  private scale3d: IVector3;
  private rotation3d: IVector3;

  constructor(private readonly vector3dFactory: (x: number, y: number, z: number) => IVector3) {
    super();

    this.position3d = this.vector3dFactory(0, 0, 0);
    this.scale3d = this.vector3dFactory(0, 0, 0);
    this.rotation3d = this.vector3dFactory(0, 0, 0);
  }

  /**
   * Привязка внешнего вектора позиции. Нужно, чтобы привязать позицию из библиотеки рендера (например, three.js)
   *
   * @example
   * const position = new Vector3();
   * transformComponent.bindPosition = position;
   * position.x = 1;
   * expect(transformComponent.x).toEqual(1);
   */
  set bindPosition(v: IVector3) {
    this.position3d = v;
  }

  /**
   * Присвоить значения вектора позиции соответствующим координатам
   */
  set position(v: IVector3) {
    this.position3d.x = v.x;
    this.position3d.y = v.y;
    this.position3d.z = v.z;
  }

  /**
   * Получить вектор позиции.
   * Возвращается копия, чтобы не изменить значения полученного вектора по ссылке, тем самым изменив и позицию объекта
   */
  get position(): IVector3 {
    return this.position3d.clone();
  }

  /**
   * Присвоить координату х
   */
  set x(v: number) {
    this.position3d.x = v;
  }

  /**
   * Получить координату х
   */
  get x(): number {
    return this.position3d.x;
  }

  /**
   * Присвоить координату y
   */
  set y(v: number) {
    this.position3d.y = v;
  }

  /**
   * Получить координату y
   */
  get y(): number {
    return this.position3d.y;
  }

  /**
   * Присвоить координату z
   */
  set z(v: number) {
    this.position3d.z = v;
  }

  /**
   * Получить координату z
   */
  get z(): number {
    return this.position3d.z;
  }

  /**
   * Привязка внешнего вектора позиции. Нужно, чтобы привязать позицию из библиотеки рендера (например, three.js)
   *
   * @example
   * const scale = new Vector3();
   * transformComponent.bindScale = scale;
   * scale.x = 1;
   * expect(transformComponent.scaleX).toEqual(1);
   */
  set bindScale(v: IVector3) {
    this.scale3d = v;
  }

  /**
   * Присвоить значения вектора скейла соответствующим координатам
   */
  set scale(s: IVector3) {
    this.scale3d.x = s.x;
    this.scale3d.y = s.y;
    this.scale3d.z = s.z;
  }

  /**
   * Получить вектор скейла.
   * Возвращается копия, чтобы не изменить значения полученного вектора по ссылке, тем самым изменив и позицию объекта
   */
  get scale(): IVector3 {
    return this.scale3d.clone();
  }

  /**
   * Присвоить значение скейла по x
   */
  set scaleX(v: number) {
    this.scale3d.x = v;
  }

  /**
   * Получить значение скейла по х
   */
  get scaleX(): number {
    return this.scale3d.x;
  }

  /**
   * Присвоить значение скейла по y
   */
  set scaleY(v: number) {
    this.scale3d.y = v;
  }

  /**
   * Получить значение скейла по y
   */
  get scaleY(): number {
    return this.scale3d.y;
  }

  /**
   * Присвоить значение скейла по z
   */
  set scaleZ(v: number) {
    this.scale3d.z = v;
  }

  /**
   * Получить значение скейла по z
   */
  get scaleZ(): number {
    return this.scale3d.z;
  }

  /**
   * Получить вектор поворота.
   * Возвращается копия, чтобы не изменить значения полученного вектора по ссылке, тем самым изменив и позицию объекта
   */
  get rotation(): IVector3 {
    return this.rotation3d.clone();
  }

  /**
   * Присвоить значения вектора поворота соответствующим координатам
   */
  set rotation(r: IVector3) {
    this.rotation3d.x = r.x;
    this.rotation3d.y = r.y;
    this.rotation3d.z = r.z;
  }

  /**
   * Присвоить значение поворота по x
   */
  set rotationX(v: number) {
    this.rotation3d.x = v;
  }

  /**
   * Получить значение поворота по x
   */
  get rotationX(): number {
    return this.rotation3d.x;
  }

  /**
   * Присвоить значение поворота по y
   */
  set rotationY(v: number) {
    this.rotation3d.y = v;
  }

  /**
   * Получить значение поворота по y
   */
  get rotationY(): number {
    return this.rotation3d.y;
  }

  /**
   * Присвоить значение поворота по z
   */
  set rotationZ(v: number) {
    this.rotation3d.z = v;
  }

  /**
   * Получить значение поворота по z
   */
  get rotationZ(): number {
    return this.rotation3d.z;
  }

  /**
   * Привязка внешнего вектора позиции. Нужно, чтобы привязать позицию из библиотеки рендера (например, three.js)
   *
   * @example
   * const rotation = new Vector3();
   * transformComponent.bindRotation = rotation;
   * rotation.x = 1;
   * expect(transformComponent.rotationX).toEqual(1);
   */
  set bindRotation(v: IVector3) {
    this.rotation3d = v;
  }
}
