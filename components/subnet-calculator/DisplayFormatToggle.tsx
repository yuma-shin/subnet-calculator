import type { DisplayFormat } from "@/lib/types";
import type { BaseFieldProps } from "./shared";

interface DisplayFormatToggleProps extends BaseFieldProps {
  value: DisplayFormat;
  onChange(format: DisplayFormat): void;
}

const FORMAT_OPTIONS: { value: DisplayFormat; label: string }[] = [
  { value: "decimal", label: "10進数" },
  { value: "binary", label: "2進数" },
  { value: "hex", label: "16進数" },
];

export function DisplayFormatToggle({
  id,
  label,
  disabled,
  value,
  onChange,
}: DisplayFormatToggleProps) {
  return (
    <div className="soft-field-group format-field">
      <span className="soft-label">{label}</span>
      <div role="radiogroup" aria-label={label} className="format-options">
        {FORMAT_OPTIONS.map((option) => {
          const optionId = `${id}-${option.value}`;
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className="format-option"
              data-checked={checked || undefined}
              data-disabled={disabled || undefined}
            >
              <input
                type="radio"
                id={optionId}
                name={id}
                value={option.value}
                checked={checked}
                disabled={disabled}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
