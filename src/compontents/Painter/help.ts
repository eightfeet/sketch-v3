"use strict";

/**
 * Constants.
 */
var BASE = 16;
var HEX_REGEX = /^#?[a-fA-F0-9]+$/;
var HEX_SHORTHAND_LENGTH = 3;
var HEX_LENGTH = 6;

/**
 * Converts hexadecimal to RGBA.
 *
 * @param  {String}        hex     - The hexadecimal.
 * @param  {Number|String} [alpha] - The alpha transparency.
 * @return {String}                - The RGBA.
 */
export function hex2rgba(hex: string, alpha: number | string): string {
  if (!HEX_REGEX.test(hex)) {
    throw Error("hex2rgba: first argument has invalid hexadecimal characters");
  }

  let res: any = hex;

  // trim unnecessary characters
  if (res[0] === "#") {
    res = res.slice(1);
  }

  // expand shorthand
  if (res.length === HEX_SHORTHAND_LENGTH) {
    res = res.split("");
    res.splice(2, 0, res[2]);
    res.splice(1, 0, res[1]);
    res.splice(0, 0, res[0]);
    res = res.join("");
  }

  if (res.length !== HEX_LENGTH) {
    throw Error("hex2rgba: first argument has invalid hexadecimal length");
  }

  // convert hex to rgb
  var values = [
    parseInt(res.slice(0, 2), BASE),
    parseInt(res.slice(2, 4), BASE),
    parseInt(res.slice(4, 6), BASE),
  ];

  alpha = typeof alpha === "number" ? alpha : parseFloat(alpha);
  if (alpha >= 0 && alpha <= 1) {
    values.push(alpha);
  } else {
    values.push(1);
  }

  return "rgba(" + values.join(",") + ")";
}
