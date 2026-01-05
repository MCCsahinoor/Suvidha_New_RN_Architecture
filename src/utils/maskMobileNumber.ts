export function maskMobileNumber(mobile: string, visibleDigits: number = 3, maskChar: string = '*'): string {
    if (!mobile) return '';
    const effectiveVisibleDigits = visibleDigits > 7 ? 2 : Math.max(3, Math.min(visibleDigits, mobile.length));
    const visiblePart = mobile.slice(-effectiveVisibleDigits);
    const maskedPart = maskChar.repeat(mobile.length - effectiveVisibleDigits);
    return maskedPart + visiblePart;
}