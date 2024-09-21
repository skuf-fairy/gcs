import {CollisionsRectangle, CollisionsCircle} from './collisions.types';
import {squaredDistance} from './collisions.utils';

// https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
export function isRectIntersectsCircle(rect: CollisionsRectangle, circle: CollisionsCircle): boolean {
  const circleDistanceX = Math.abs(circle.x - (rect.x + rect.width / 2));
  const circleDistanceY = Math.abs(circle.y - (rect.y + rect.height / 2));

  if (circleDistanceX > rect.width / 2 + circle.radius) return false;

  if (circleDistanceY > rect.height / 2 + circle.radius) return false;

  if (circleDistanceX <= rect.width / 2) return true;

  if (circleDistanceY <= rect.height / 2) return true;

  const squaredCornerDistance = squaredDistance(circleDistanceX, rect.width / 2, circleDistanceY, rect.height / 2);

  return squaredCornerDistance <= Math.pow(circle.radius, 2);
}
