const downloadjs = require("downloadjs") as any;

/**
 * Strictly parses string to number.
 * White spaces are removed, "," replaced by "." is there is more than 1 dot or other chars NaN is returned.
 */
export const parseStrToNumStrict = (source: string): number => {
  if (source === undefined) {
    return NaN;
  }

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

export const parseMoneyStrToStrStrict = (source: string): string => {
  if (source === undefined) {
    return null;
  }

  let transform = source.replace(/\s/g, "");
  transform = transform.replace(/,/g, ".");

  // we allow only digits dots and minus
  if (/[^.\-\d]/.test(transform)) {
    return null;
  }

  // we allow only one dot
  if ((transform.match(/\./g) || []).length > 1) {
    return null;
  }

  return transform;
};

/**
 * Triggers downloading a file directly to user browser
 */
export const userDownloadFile = async (
  url: string,
  fetchOptions: RequestInit,
  filename: string
) => {
  const response = await fetch(url, fetchOptions);
  if (response.status > 299) {
    throw new Error("Error during downloading.");
  }
  const blob = await response.blob();

  downloadjs(blob, `${filename}.pdf`);
};
