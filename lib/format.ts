import type { DisplayFormat } from "./types";

export function formatAddress(address: string, format: DisplayFormat): string {
  if (format === "decimal") {
    return address;
  }

  const octets = address.split(".").map(Number);

  if (format === "binary") {
    return octets.map((octet) => octet.toString(2).padStart(8, "0")).join(".");
  }

  return octets
    .map((octet) => octet.toString(16).padStart(2, "0").toUpperCase())
    .join(".");
}
