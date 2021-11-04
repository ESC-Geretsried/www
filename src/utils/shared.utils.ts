/**
 * escapes special chars in a string to use it for a regex
 * @param str input string
 */
const escapeRegex = (str: string): string =>
  str.replace(/[$()*+./?[\\\]^{|}-]/g, "\\$&");

/**
 * removes specific characters from the beginning and/or end of a string
 * cf. https://www.php.net/manual/en/function.trim.php
 *
 * @param str input string
 * @param chars characters to be trimmed
 */
export const trimChars = (
  str: string,
  chars: string | Array<string> = ""
): string => {
  // trim whitespace if not otherwise defined
  if (typeof chars === "string" && chars.trim() === "") {
    return str.trim();
  }

  chars =
    typeof chars === "string"
      ? [...new Set(chars.split(""))]
      : [...new Set(chars)];

  const searchGroup = escapeRegex(chars.join(""));

  const reStart = new RegExp(`^[${searchGroup}]+`, "g");
  const reEnd = new RegExp(`[${searchGroup}]+$`, "g");

  return str.replace(reStart, "").replace(reEnd, "");
};

export const getPropertyFromGraphqlQueryObject = <
  Fragment extends { [key: string]: unknown },
  Property extends keyof Fragment extends string ? keyof Fragment : never
>(
  object: { [key: string]: any } | undefined,
  property: keyof Fragment extends string ? string : never
) => {
  if (object && object[property]) {
    return object[property] as Fragment[Property];
  }
  return undefined;
};

export const chunk = <T>(array: Array<T>, chunkSize: number) => {
  const chunks: Array<Array<T>> = [];
  for (var i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
};

export const isObjectEmpty = (obj: object | undefined) => {
  return obj
    ? Object.values(obj).every((value) => value === null || value === undefined)
    : false;
};

export const isString = (value: any): value is string => {
  return typeof value === "string";
};
