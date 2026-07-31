import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type GaIconInputProps = Omit<ComponentProps<"input">, "className"> & {
  icon?: ReactNode;
  trailing?: ReactNode;
  label?: string;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
  /** Email = blue border; password = green border (mock). */
  tone?: "blue" | "green";
};

/** Dark field matching the GestionAR mock. */
export function GaIconInput({
  icon,
  trailing,
  label,
  id,
  className,
  containerClassName,
  iconClassName,
  tone = "blue",
  ...props
}: GaIconInputProps) {
  const inputId = id ?? props.name;

  return (
    <div className={cn("flex flex-col gap-1.5 font-ga", containerClassName)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="text-[12.5px] font-normal tracking-normal text-white/40"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        {icon ? (
          <span
            className={cn(
              "pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 [&_svg]:size-[17px]",
              tone === "green" ? "text-[#00e676]" : "text-[#0088ff]",
              iconClassName,
            )}
          >
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          className={cn(
            "ga-field h-[46px] w-full text-base outline-none",
            tone === "green" && "ga-field--green",
            icon && "pl-11",
            trailing && "pr-11",
            !icon && "px-3.5",
            className,
          )}
          {...props}
        />
        {trailing ? (
          <span className="absolute right-3.5 top-1/2 z-10 -translate-y-1/2 text-white/45 [&_svg]:size-[17px]">
            {trailing}
          </span>
        ) : null}
      </div>
    </div>
  );
}
