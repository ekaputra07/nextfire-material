import { TAGLINE } from "config";

export function getTitle(title) {
  return `${title} | ${TAGLINE}`;
}

export function toCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
