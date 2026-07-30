import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LogIn } from "lucide-react";

import { cn } from "@/lib/utils";

type GaGradientButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children?: ReactNode;
  label?: string;
};

/**
 * Primary CTA — shape + gradient matched to mock sample:
 * blue #095EFA → emerald #50DF74 (no cyan middle), full pill.
 */
export function GaGradientButton({
  className,
  type = "button",
  label = "Ingresar",
  children,
  style,
  ...props
}: GaGradientButtonProps) {
  return (
    <button
      type={type}
      className={cn("ga-cta", className)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: "100%",
        height: 52,
        margin: 0,
        padding: "0 20px",
        border: "none",
        borderRadius: 9999,
        cursor: "pointer",
        color: "#fff",
        fontFamily: "var(--font-ga), system-ui, sans-serif",
        fontSize: 15,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: 0,
        boxSizing: "border-box",
        // Sampled from target mock PNG (no cyan mid-stop)
        background: "linear-gradient(90deg, #095efa 0%, #0060f0 22%, #057b9b 52%, #1ea280 72%, #50df74 100%)",
        boxShadow:
          "0 0 14px rgba(9,94,250,0.35), 0 0 22px rgba(80,223,116,0.2), 0 6px 14px rgba(0,0,0,0.3)",
        ...style,
      }}
      {...props}
    >
      {children ?? (
        <>
          <LogIn size={17} strokeWidth={2.25} color="#fff" aria-hidden style={{ flexShrink: 0, display: "block" }} />
          <span style={{ lineHeight: 1 }}>{label}</span>
        </>
      )}
    </button>
  );
}
