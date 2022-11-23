// utils/formatAsCurrency.ts

/**
 * Formats a value returned as a double into currency
 * @param {number} cents
 * @param {string} currencySign
 * @param {boolean} onFront
 * @returns {string}
 */
export const formatAsCurrency = (
  cents: number,
  currencySign = '$',
  onFront = true
): string =>
  `${onFront ? currencySign : ''}${(cents / 100.0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}${!onFront ? ` ${currencySign}` : ''}`;

