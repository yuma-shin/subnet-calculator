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
      className="soft-notice"
    >
      {error.message}
    </p>
  );
}
