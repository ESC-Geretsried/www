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
