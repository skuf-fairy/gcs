import {IVector3} from '../components/components.types';

export class Vector3 implements IVector3 {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

  public static fromVector2d(v: IVector3): IVector3 {
    return new Vector3(v.x, v.y, v.z);
  }

  public clone(): IVector3 {
    return new Vector3(this.x, this.y, this.z);
  }
}
