export const calculateExchange =(amount, fromRate, toRate) => {
    // If input is empty or 0, return 0
    if (!amount || !amount <= 0 )    return 0;
    // The Math calculation
    const result = (amount / fromRate) * toRate;
    // Formatting: Returns a string with 2 decimal places (e.g. "1,450.50")
    return result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};