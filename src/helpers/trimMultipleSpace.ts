export function trim(value: string) {
  return value.replace(/ +(?= )/g, "").trim();
}
