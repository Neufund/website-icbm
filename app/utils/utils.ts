/**
 * Strictly parses string to number.
 * White spaces are removed, "," replaced by "." is there is more than 1 dot or other chars NaN is returned.
 * @param {string} source
 * @returns {number}
 */
export const parseStrToNumStrict = (source: string): number => {
  let transform = source.replace(/\s/g, "");
  transform = transform.replace(/,/g, ".");

  // we allow only digits dots and minus
  if (/[^.\-\d]/.test(transform)) {
    return NaN;
  }

  // we allow only one dot
  if ((transform.match(/\./g) || []).length > 1) {
    return NaN;
  }

  return parseFloat(transform);
};

export const estimateNeufromEth = (coefficient: number) => (eth: number): number => {
  return eth * coefficient;
};
