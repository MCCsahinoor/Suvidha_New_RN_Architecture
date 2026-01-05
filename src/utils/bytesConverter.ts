export function bytesToHumanReadable(byteValue: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  while (byteValue >= 1024 && unitIndex < units.length - 1) {
    byteValue /= 1024;
    unitIndex++;
  }
  return `${byteValue.toFixed(2)} ${units[unitIndex]}`;
}
