import {isRectIntersectsRect} from './isRectIntersectsRect';
import {isCircleIntersectsCircle} from './isCircleIntersectsCircle';
import {isRectIntersectsCircle} from './isRectIntersectsCircle';
import {isCircleIntersectLine} from './isCircleIntersectLine';
import {isPointIntersectCircle} from './isPointIntersectCircle';

export class CollisionsDetector {
  public static isRectIntersectsRect = isRectIntersectsRect;
  public static isCircleIntersectsCircle = isCircleIntersectsCircle;
  public static isRectIntersectsCircle = isRectIntersectsCircle;
  public static isCircleIntersectLine = isCircleIntersectLine;
  public static isPointIntersectCircle = isPointIntersectCircle;
}
