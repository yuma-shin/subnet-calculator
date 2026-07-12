"use client";

import { useMemo, useState } from "react";
import { calculateSubnet } from "@/lib/subnet";
import type { DisplayFormat, SubnetResult, ValidationError } from "@/lib/types";
import { validateCidr, validateIpAddress } from "@/lib/validation";

export interface UseSubnetCalculatorReturn {
  ipAddress: string;
  cidr: number | null;
  displayFormat: DisplayFormat;
  result: SubnetResult | null;
  error: ValidationError | null;
  setIpAddress(value: string): void;
  setCidr(value: number): void;
  setDisplayFormat(format: DisplayFormat): void;
}

export function useSubnetCalculator(): UseSubnetCalculatorReturn {
  const [ipAddress, setIpAddress] = useState("");
  const [cidr, setCidr] = useState<number | null>(null);
  const [displayFormat, setDisplayFormat] = useState<DisplayFormat>("decimal");

  const { result, error } = useMemo(() => {
    if (ipAddress.trim() === "" && cidr === null) {
      return { result: null, error: null };
    }

    const ipResult = validateIpAddress(ipAddress);
    if (!ipResult.ok) {
      return { result: null, error: ipResult.error };
    }

    const cidrResult = validateCidr(cidr);
    if (!cidrResult.ok) {
      return { result: null, error: cidrResult.error };
    }

    return {
      result: calculateSubnet({ ipAddress: ipResult.value, cidr: cidrResult.value }),
      error: null,
    };
  }, [ipAddress, cidr]);

  return {
    ipAddress,
    cidr,
    displayFormat,
    result,
    error,
    setIpAddress,
    setCidr,
    setDisplayFormat,
  };
}
