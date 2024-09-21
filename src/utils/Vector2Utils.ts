import {squaredDistance} from '../collisions/collisions.utils';
import {IVector2} from '../components/components.types';

export class Vector2Utils {
  public static distance(v1: IVector2, v2: IVector2): number {
    return Math.sqrt(Vector2Utils.squaredDistance(v1, v2));
  }

  public static squaredDistance(v1: IVector2, v2: IVector2): number {
    return squaredDistance(v1.x, v1.y, v2.x, v2.y);
  }

  public static add(v1: IVector2, v2: IVector2): IVector2 {
    const resultVector = v1.clone();
    resultVector.x += v2.x;
    resultVector.y += v2.y;
    return resultVector;
  }

  public static subtract(v1: IVector2, v2: IVector2): IVector2 {
    const resultVector = v1.clone();
    resultVector.x -= v2.x;
    resultVector.y -= v2.y;
    return resultVector;
  }

  public static fromAngle(v: IVector2, angleInRad: number): IVector2 {
    v.x = Math.cos(angleInRad);
    v.y = Math.sin(angleInRad);
    return v;
  }

  public static getAngleBetweenVectors(v1: IVector2, v2: IVector2): number {
    return Math.atan2(v2.y - v1.y, v2.x - v1.x);
  }
}
