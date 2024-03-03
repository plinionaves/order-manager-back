import { quickSort } from '@/domain/algorithms/sorting';
import { Compare, CompareFunction } from '@/domain/algorithms/util';

describe('quick sort', () => {
  test('should works with non-sorted array', () => {
    const array = [3, 2, 1, 5, 4];

    const result = quickSort(array);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('should works with sorted array', () => {
    const array = [1, 2, 3, 4, 5];

    const result = quickSort(array);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('should works with empty arrays', () => {
    const array = [];

    const result = quickSort(array);

    expect(result).toEqual([]);
  });

  test('should works with array of strings', () => {
    const array = ['c', 'a', 'd', 'b'];

    const result = quickSort(array);

    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });

  test('should works with array of objects', () => {
    const array = [
      { name: 'c' },
      { name: 'a' },
      { name: 'e' },
      { name: 'd' },
      { name: 'b' },
    ];
    const compareFn: CompareFunction<{ name: string }> = (a, b) => {
      if (a.name === b.name) {
        return 0;
      }
      return a.name < b.name ? Compare.LESS_THAN : Compare.BIGGER_THAN;
    };

    const result = quickSort(array, compareFn);

    expect(result).toEqual([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' },
      { name: 'e' },
    ]);
  });
});
