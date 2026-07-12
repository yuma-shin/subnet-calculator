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
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      <div role="radiogroup" aria-label={label} className="inline-flex rounded-lg border border-zinc-300 p-1 dark:border-zinc-700">
        {FORMAT_OPTIONS.map((option) => {
          const optionId = `${id}-${option.value}`;
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                checked
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
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
