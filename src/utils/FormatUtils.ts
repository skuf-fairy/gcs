import {NumberUtils} from './NumberUtils';

const minCount = 60;
const secCount = 60;

export class FormatUtils {
  // метод для формата времени в играх mm:ss:ms
  static formatGameTime(timeInMs: number): string {
    const timeInSecs = timeInMs / 1000;
    const minutes = FormatUtils.pad(Math.trunc((timeInSecs / minCount) % minCount));
    const seconds = FormatUtils.pad(Math.trunc(timeInSecs % secCount));
    const mSeconds = FormatUtils.pad(NumberUtils.getDecimalPart(timeInMs / 1000)).slice(0, 2);

    return `${minutes}:${seconds}:${mSeconds}`;
  }

  static pad(n: number): string {
    if (n >= 10) {
      return n.toString();
    }

    if (n < 0) {
      return n.toString();
    }

    return '0' + n;
  }
}
