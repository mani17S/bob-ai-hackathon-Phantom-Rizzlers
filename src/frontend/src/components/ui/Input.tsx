import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Accessible label rendered above the field. */
  label?: string;
  /** Small content aligned right of the label, e.g. a hint or unit. */
  labelSuffix?: ReactNode;
  hint?: string;
  error?: string;
  /** Optional leading element, e.g. <SearchIcon className="size-4" />. */
  leading?: ReactNode;
}

export function Input({
  label,
  labelSuffix,
  hint,
  error,
  leading,
  className,
  id,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <label htmlFor={inputId} className="block text-xs font-medium text-muted">
            {label}
          </label>
          {labelSuffix}
        </div>
      )}

      <div className="relative">
        {leading && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
            {leading}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-10 w-full rounded-lg border bg-raised px-3 text-sm text-foreground",
            "placeholder:text-muted/70",
            "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
            "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30",
            error ? "border-danger-500/60" : "border-strong",
            leading && "pl-9",
            className,
          )}
          {...rest}
        />
      </div>

      {!error && hint && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-danger-600 dark:text-danger-400">
          {error}
        </p>
      )}
    </div>
  );
}
