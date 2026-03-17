import { ReactNode } from "react";

export function FormField(props: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-4">
        <div className="text-sm font-medium tracking-wide text-[color:rgb(var(--fg0))]">
          {props.label}
        </div>
        {props.hint ? (
          <div className="text-xs text-[color:rgb(var(--muted))]">
            {props.hint}
          </div>
        ) : null}
      </div>
      {props.children}
      {props.error ? (
        <div className="text-xs text-[color:rgba(226,197,124,0.92)]">
          {props.error}
        </div>
      ) : null}
    </div>
  );
}

