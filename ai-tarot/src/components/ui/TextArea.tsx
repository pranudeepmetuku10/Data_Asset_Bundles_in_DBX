import { forwardRef, TextareaHTMLAttributes } from "react";

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea(props, ref) {
  return (
    <textarea
      ref={ref}
      {...props}
      className={[
        "min-h-32 w-full resize-none rounded-xl border border-[color:rgba(226,197,124,0.12)] bg-[color:rgba(10,11,18,0.55)] px-4 py-3 text-sm text-[color:rgb(var(--fg0))] shadow-[0_0_0_1px_rgba(226,197,124,0.06)] outline-none transition",
        "placeholder:text-[color:rgba(198,192,228,0.55)]",
        "focus:border-[color:rgba(226,197,124,0.28)] focus:ring-2 focus:ring-[color:rgba(226,197,124,0.18)]",
        props.className ?? "",
      ].join(" ")}
    />
  );
});

