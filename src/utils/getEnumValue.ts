export function getEnumValues(e) {
  const keys = Object.keys(e).filter((key) => isNaN(Number(key)));
  return keys.map((key) => e[key]);
}
