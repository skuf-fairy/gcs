import {IntRange} from '../types.utils';

export class NumberUtils {
  public static clamp<Min extends number, Max extends number>(
    min: number,
    max: number,
    value: number,
  ): IntRange<Min, Max> {
    return Math.min(Math.max(value, min), max) as IntRange<Min, Max>;
  }

  public static inRange(min: number, max: number, value: number): boolean {
    return value >= min && value <= max;
  }

  public static calcPercentage(value: number, max: number): number {
    return NumberUtils.clamp(0, 100, (value / Math.max(max, 1)) * 100);
  }

  public static lerp(v1: number, v2: number, progress: number): number {
    return (1 - progress) * v1 + progress * v2;
  }

  // обрезает число до 2 числе после запятой
  public static roundWith2Precision(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  public static getDecimalPart(n: number): number {
    if (Number.isInteger(n)) {
      return 0;
    }

    const decimalStr = n.toString().split('.')[1];
    return Number(decimalStr);
  }
}
