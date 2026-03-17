import { forwardRef, InputHTMLAttributes } from "react";

export const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function TextInput(props, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className={[
        "h-12 w-full rounded-xl border border-[color:rgba(226,197,124,0.12)] bg-[color:rgba(10,11,18,0.55)] px-4 text-sm text-[color:rgb(var(--fg0))] shadow-[0_0_0_1px_rgba(226,197,124,0.06)] outline-none transition",
        "placeholder:text-[color:rgba(198,192,228,0.55)]",
        "focus:border-[color:rgba(226,197,124,0.28)] focus:ring-2 focus:ring-[color:rgba(226,197,124,0.18)]",
        props.className ?? "",
      ].join(" ")}
    />
  );
});

