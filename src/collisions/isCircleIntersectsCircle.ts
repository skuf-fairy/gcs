import {CollisionsCircle} from './collisions.types';

export function isCircleIntersectsCircle(circleA: CollisionsCircle, circleB: CollisionsCircle): boolean {
  const squareDistance =
    (circleA.x - circleB.x) * (circleA.x - circleB.x) + (circleA.y - circleB.y) * (circleA.y - circleB.y);

  return squareDistance <= (circleA.radius + circleB.radius) * (circleA.radius + circleB.radius);
}
