import {IVector2} from '../components/components.types';

export class Vector2 implements IVector2 {
  constructor(public x: number = 0, public y: number = 0) {}

  public static fromVector2d(v: IVector2): IVector2 {
    return new Vector2(v.x, v.y);
  }

  public clone(): IVector2 {
    return new Vector2(this.x, this.y);
  }
}
