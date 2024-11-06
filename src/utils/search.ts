export function binarySearch<T extends object, K extends keyof T>(arr: T[], key: K, target: any): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midPocId = arr[mid][key];

    if (midPocId === target) {
      return mid; // Found the target, return the index
    } else if (midPocId < target) {
      left = mid + 1; // Target might be in the right half
    } else {
      right = mid - 1; // Target might be in the left half
    }
  }

  return -1; // TargetPocId not found
}

export function exponentialSearch<
  T extends { [key1: string]: any } | { [key1: string]: { [key2: string]: any } },
  K1 extends keyof T,
  K2 extends keyof T[K1],
>(arr: T[], target: any, key1: K1, key2: K2 | undefined = undefined): number {
  const length = arr.length;
  if (!length) return -1;

  // If the first element is the target
  if ((key2 ? arr[0][key1][key2] : arr[0][key1]) === target) {
    return 0;
  }

  // Find the range for binary search by doubling the index
  let i = 1;
  while (i < length && (key2 ? arr[i][key1][key2] : arr[i][key1]) <= target) {
    i *= 2;
  }

  // Perform binary search within the found range
  let left = Math.floor(i / 2);
  let right = Math.min(i, length - 1);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midPocId = key2 ? arr[mid][key1][key2] : arr[mid][key1];

    if (midPocId === target) {
      return mid; // Found the target, return the index
    } else if (midPocId < target) {
      left = mid + 1; // Target might be in the right half
    } else {
      right = mid - 1; // Target might be in the left half
    }
  }

  return -1; // TargetPocId not found
}
