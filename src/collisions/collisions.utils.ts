export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(squaredDistance(x1, y1, x2, y2));
}

export function squaredDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
}
