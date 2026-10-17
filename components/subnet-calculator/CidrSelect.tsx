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
    <div className="soft-field-group">
      <label htmlFor={id} className="soft-label">
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
            className="soft-field cidr-input"
            displayValue={(option: CidrOption | null) => option?.label ?? ""}
            placeholder="選択してください"
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton aria-label="CIDRの候補を表示" className="cidr-button">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </ComboboxButton>
          <ComboboxOptions className="soft-menu cidr-options">
            {filteredOptions.length === 0 ? (
              <div className="cidr-empty">
                該当する項目がありません
              </div>
            ) : (
              filteredOptions.map((option) => (
                <ComboboxOption
                  key={option.cidr}
                  value={option}
                  className="soft-option"
                >
                  <span>{option.label}</span>
                  <svg className="cidr-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="m4.5 10 3.5 3.5 7.5-7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
