export type DisplayFormat = "decimal" | "binary" | "hex";

export interface SubnetInput {
  ipAddress: string;
  cidr: number;
}

export interface SubnetResult {
  networkAddress: string;
  broadcastAddress: string;
  firstHostAddress: string | null;
  lastHostAddress: string | null;
  totalAddressCount: number;
  usableHostCount: number;
  ipClass: "A" | "B" | "C" | "D" | "E";
  subnetMask: string;
}

export type ValidationError =
  | { type: "invalid_ip_format"; message: string }
  | { type: "ip_octet_out_of_range"; message: string }
  | { type: "cidr_not_selected"; message: string };

export type SubnetCalculationResult =
  | { ok: true; value: SubnetResult }
  | { ok: false; error: ValidationError };
