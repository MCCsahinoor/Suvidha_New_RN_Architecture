export function formatNumber(value: any) {
    const number = parseFloat(value);
    if (isNaN(number)) {
        return 'Invalid number';
    }
    return number.toFixed(1);
};