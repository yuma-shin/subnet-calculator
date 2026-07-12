"use client";

import { useSubnetCalculator } from "@/hooks/useSubnetCalculator";
import { CidrSelect } from "./CidrSelect";
import { DisplayFormatToggle } from "./DisplayFormatToggle";
import { ErrorMessage } from "./ErrorMessage";
import { IpAddressInput } from "./IpAddressInput";
import { ResultsPanel } from "./ResultsPanel";

const CIDR_OPTIONS = Array.from({ length: 32 }, (_, i) => i + 1);

export function SubnetCalculatorApp() {
  const {
    ipAddress,
    cidr,
    displayFormat,
    result,
    error,
    setIpAddress,
    setCidr,
    setDisplayFormat,
  } = useSubnetCalculator();

  const showError = error !== null && (ipAddress.trim() !== "" || cidr !== null);

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <IpAddressInput
          id="ip-address"
          label="IPアドレス"
          value={ipAddress}
          onChange={setIpAddress}
        />
        <CidrSelect
          id="cidr"
          label="サブネットマスク"
          value={cidr}
          onChange={setCidr}
          options={CIDR_OPTIONS}
        />
      </div>

      <DisplayFormatToggle
        id="display-format"
        label="表示形式"
        value={displayFormat}
        onChange={setDisplayFormat}
      />

      {showError ? <ErrorMessage error={error} /> : null}

      <ResultsPanel result={result} displayFormat={displayFormat} />
    </div>
  );
}
