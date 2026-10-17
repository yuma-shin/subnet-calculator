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
    <div className="soft-field-group">
      <label htmlFor={id} className="soft-label">
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
        className="soft-field"
      />
      {errorMessage ? (
        <p id={`${id}-error`} role="alert" className="soft-field-error">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
