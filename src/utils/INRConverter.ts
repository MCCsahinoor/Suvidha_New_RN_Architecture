export function formatNumberWithCommas(number: number) {
    // Convert the number to a string
    let formatter = new Intl.NumberFormat('en-IN', {
        // style: 'currency',
        currency: 'INR',
        // minimumFractionDigits: 2, // Ensure two decimal places
        // maximumFractionDigits: 2
    });

    // Format the number and return it
    return formatter.format(number);
}