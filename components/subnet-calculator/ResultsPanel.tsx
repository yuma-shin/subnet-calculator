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
      className="grid animate-[fade-in_0.2s_ease-out] grid-cols-1 gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:grid-cols-2 dark:border-zinc-700 dark:bg-zinc-900"
    >
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-1">
          <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {row.label}
          </dt>
          <dd className="font-mono text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
