export interface Point2d {
  x: number;
  y: number;
}

export interface IVector2 extends Point2d {
  clone(): IVector2;
}

export interface IVector3 extends Point2d {
  z: number;
  clone(): IVector3;
}
