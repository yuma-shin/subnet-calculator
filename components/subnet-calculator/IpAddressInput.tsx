import type { BaseFieldProps } from "./shared";

interface IpAddressInputProps extends BaseFieldProps {
  value: string;
  onChange(value: string): void;
  errorMessage?: string;
}

export function IpAddressInput({
  id,
  label,
  disabled,
  value,
  onChange,
  errorMessage,
}: IpAddressInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        placeholder="192.168.1.1"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-base text-zinc-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
      />
      {errorMessage ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
