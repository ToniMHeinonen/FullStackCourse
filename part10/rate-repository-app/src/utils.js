/**
 * Converts number to provided decimal precision without trailing zeroes.
 * @param {number} num number to convert
 * @param {number} precision decimal precision
 * @returns Converted number to decimal precision without trailing zeroes
 */
const toFixedWithoutZeros = (num, precision) => `${1 * num.toFixed(precision)}`

/**
 * Converts number to thousands if value is over 1000.
 * @param {number} num number to convert
 * @returns value in thousands with k added to end (example: 1.6k)
 */
export const convertToThousands = (num) => {
  if (num < 1000) return num

  const thousands = num / 1000
  return `${toFixedWithoutZeros(thousands, 1)}k`
}
