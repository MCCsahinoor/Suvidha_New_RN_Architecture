/* eslint-disable prettier/prettier */
/* eslint-disable no-bitwise */
export function generateRandomColorNumber(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the numeric value to a hexadecimal color code
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();

  // Add leading zeros if necessary
  return '#' + '00000'.substring(0, 6 - color.length) + color;
}
export function generatePlaceholderName(name: string) {
  //Split name by the space
  if (name) {
    let splitUsername = name.split(' '),
    /* we validate if the data comes correctly with optional chaining. In the worst case, we
      return a empty string*/

      firstLetter = splitUsername[0]?.charAt(0) ?? '',
      secondletter = splitUsername[splitUsername.length - 1]?.charAt(0) ?? '';
    return `${firstLetter}${secondletter}`;
  }

}

export function getContrastTextColor(colorCode: string) {
  // Convert the hexadecimal color code to RGB
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  // Calculate the luminance of the color
  const calculateLuminance = (rgb: number[]) => {
    const [r, g, b] = rgb.map((value: number) => {
      value /= 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const rgb = hexToRgb(colorCode);
  const luminance = calculateLuminance(rgb);

  // Use white text for dark backgrounds and black text for light backgrounds
  return luminance > 0.5 ? 'black' : 'white';
}
