export const getKeyByValueEnum = <T extends { [key: number | string]: string | number }>(list: T, key: T[keyof T]) => {
  return Object.keys(list)[Object.values(list).indexOf(key)];
};
