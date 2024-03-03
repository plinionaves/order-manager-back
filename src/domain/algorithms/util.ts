export type CompareFunction<T> = (a: T, b: T) => number;

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0,
}

export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS;
  }

  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export function swap<T>(array: T[], a: number, b: number) {
  [array[a], array[b]] = [array[b], array[a]];

  // alternative to destructuring assignment
  // const temp = array[a];
  // array[a] = array[b];
  // array[b] = temp;
}
