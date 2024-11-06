export function getKey(list: Map<any, any>, value: any) {
  return [...list].find(([key, val]) => val == value)?.at(0);
}
