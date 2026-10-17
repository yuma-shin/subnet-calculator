import { formatAddress } from "@/lib/format";
import type { DisplayFormat, SubnetResult } from "@/lib/types";

interface ResultsPanelProps {
  result: SubnetResult | null;
  displayFormat: DisplayFormat;
}

interface ResultRow {
  label: string;
  value: string;
}

function buildRows(result: SubnetResult, displayFormat: DisplayFormat): ResultRow[] {
  const format = (address: string | null) =>
    address === null ? "―" : formatAddress(address, displayFormat);

  return [
    { label: "ネットワークアドレス", value: format(result.networkAddress) },
    { label: "ブロードキャストアドレス", value: format(result.broadcastAddress) },
    { label: "利用可能ホスト範囲(先頭)", value: format(result.firstHostAddress) },
    { label: "利用可能ホスト範囲(末尾)", value: format(result.lastHostAddress) },
    { label: "サブネットマスク", value: format(result.subnetMask) },
    { label: "アドレス総数", value: String(result.totalAddressCount) },
    { label: "利用可能ホスト数", value: String(result.usableHostCount) },
    { label: "IPアドレスクラス", value: result.ipClass },
  ];
}

export function ResultsPanel({ result, displayFormat }: ResultsPanelProps) {
  if (!result) {
    return null;
  }

  const rows = buildRows(result, displayFormat);
  const transitionKey = `${result.networkAddress}-${result.broadcastAddress}-${result.subnetMask}-${displayFormat}`;

  return (
    <dl
      key={transitionKey}
      className="soft-card calculator-results"
    >
      {rows.map((row) => (
        <div key={row.label} className="result-item">
          <dt>
            {row.label}
          </dt>
          <dd>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
