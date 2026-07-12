import type { ValidationError } from "@/lib/types";

interface ErrorMessageProps {
  error: ValidationError | null;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) {
    return null;
  }

  return (
    <p
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
    >
      {error.message}
    </p>
  );
}
