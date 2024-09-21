import {CollisionsCircle, CollisionsLine} from './collisions.types';
import {isPointIntersectCircle} from './isPointIntersectCircle';

export function isCircleIntersectLine(line: CollisionsLine, circle: CollisionsCircle): boolean {
  //check to see if start or end points lie within circle
  if (isPointIntersectCircle(line.p1, circle)) {
    return true;
  }
  if (isPointIntersectCircle(line.p2, circle)) {
    return true;
  }

  const x1 = line.p1.x,
    y1 = line.p1.y,
    x2 = line.p2.x,
    y2 = line.p2.y,
    cx = circle.x,
    cy = circle.y;

  //vector d
  const dx = x2 - x1;
  const dy = y2 - y1;

  //vector lc
  const lcx = cx - x1;
  const lcy = cy - y1;

  //project lc onto d, resulting in vector p
  const dLen2 = dx * dx + dy * dy; //len2 of d
  let px = dx;
  let py = dy;
  if (dLen2 > 0) {
    const dp = (lcx * dx + lcy * dy) / dLen2;
    px *= dp;
    py *= dp;
  }

  const nearest = {
    x: x1 + px,
    y: y1 + py,
  };

  //len2 of p
  const pLen2 = px * px + py * py;

  //check collision
  return isPointIntersectCircle(nearest, circle) && pLen2 <= dLen2 && px * dx + py * dy >= 0;
}
