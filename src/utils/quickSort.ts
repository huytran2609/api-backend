export function quickSort<T extends object | number | string | undefined>(
  arr: T[],
  compare: (a: T, b: T) => number,
): T[] {
  const stack = [{ left: 0, right: arr.length - 1 }];

  while (stack.length > 0) {
    const { left, right } = stack.pop()!;

    if (left >= right) {
      continue;
    }

    const pivotIndex = partition(arr, compare, left, right);
    stack.push({ left, right: pivotIndex - 1 });
    stack.push({ left: pivotIndex + 1, right });
  }

  return arr;
}

function partition<T>(
  arr: T[],
  compare: (a: T, b: T) => number,
  left: number,
  right: number,
): number {
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (compare(arr[j], pivot) <= 0) {
      i++;
      swap(arr, i, j);
    }
  }

  swap(arr, i + 1, right);
  return i + 1;
}

function swap<T>(arr: T[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
