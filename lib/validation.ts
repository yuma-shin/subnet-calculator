import type { ValidationError } from "./types";

type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: ValidationError };

const IPV4_PATTERN = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

export function validateIpAddress(raw: string): ValidationResult<string> {
  const trimmed = raw.trim();
  const match = IPV4_PATTERN.exec(trimmed);

  if (!match) {
    return {
      ok: false,
      error: {
        type: "invalid_ip_format",
        message: "IPv4アドレスの形式が正しくありません。",
      },
    };
  }

  const octets = match.slice(1, 5).map(Number);
  const outOfRange = octets.some((octet) => octet < 0 || octet > 255);

  if (outOfRange) {
    return {
      ok: false,
      error: {
        type: "ip_octet_out_of_range",
        message: "各オクテットは0から255の範囲で入力してください。",
      },
    };
  }

  return { ok: true, value: trimmed };
}

export function validateCidr(raw: number | null): ValidationResult<number> {
  if (raw === null || raw < 1 || raw > 32) {
    return {
      ok: false,
      error: {
        type: "cidr_not_selected",
        message: "サブネットマスクを選択してください。",
      },
    };
  }

  return { ok: true, value: raw };
}
