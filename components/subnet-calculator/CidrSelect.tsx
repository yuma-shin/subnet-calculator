"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { cidrToSubnetMask } from "@/lib/subnet";
import type { BaseFieldProps } from "./shared";

interface CidrSelectProps extends BaseFieldProps {
  value: number | null;
  onChange(value: number): void;
  options: number[];
}

interface CidrOption {
  cidr: number;
  label: string;
}

const INPUT_CLASS_NAME =
  "w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-4 pr-10 text-base text-zinc-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";

export function CidrSelect({
  id,
  label,
  disabled,
  value,
  onChange,
  options,
}: CidrSelectProps) {
  const [query, setQuery] = useState("");

  const cidrOptions: CidrOption[] = options.map((cidr) => ({
    cidr,
    label: `/${cidr} (${cidrToSubnetMask(cidr)})`,
  }));

  const filteredOptions =
    query === ""
      ? cidrOptions
      : cidrOptions.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  const selectedOption = cidrOptions.find((option) => option.cidr === value) ?? null;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <Combobox
        value={selectedOption}
        onChange={(option: CidrOption | null) => {
          if (option) onChange(option.cidr);
        }}
        onClose={() => setQuery("")}
        disabled={disabled}
        by="cidr"
        immediate
      >
        <div className="relative">
          <ComboboxInput
            id={id}
            className={INPUT_CLASS_NAME}
            displayValue={(option: CidrOption | null) => option?.label ?? ""}
            placeholder="選択してください"
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500 dark:text-zinc-400">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </ComboboxButton>
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg focus:outline-none dark:border-zinc-700 dark:bg-zinc-900">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                該当する項目がありません
              </div>
            ) : (
              filteredOptions.map((option) => (
                <ComboboxOption
                  key={option.cidr}
                  value={option}
                  className="cursor-pointer px-4 py-2 text-sm text-zinc-900 select-none data-[focus]:bg-indigo-600 data-[focus]:text-white dark:text-zinc-50"
                >
                  {option.label}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
