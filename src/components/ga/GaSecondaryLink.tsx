import { Link } from "@tanstack/react-router";
import { ChevronRight, UserPlus } from "lucide-react";

import { cn } from "@/lib/utils";

type GaSecondaryLinkProps = {
  to: "/registro" | "/login";
  label: string;
  className?: string;
};

/**
 * Secondary auth CTA: pill + blue border, with icon/label/chevron
 * grouped side-by-side and centered as one unit.
 */
export function GaSecondaryLink({ to, label, className }: GaSecondaryLinkProps) {
  return (
    <Link
      to={to}
      className={cn("ga-secondary", className)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: "100%",
        height: 52,
        padding: "0 18px",
        borderRadius: 9999,
        textDecoration: "none",
        boxSizing: "border-box",
      }}
    >
      <UserPlus size={18} strokeWidth={1.75} color="#2f8fff" aria-hidden style={{ flexShrink: 0 }} />
      <span
        style={{
          color: "rgba(255,255,255,0.88)",
          fontFamily: "var(--font-ga)",
          fontSize: 15,
          fontWeight: 500,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <ChevronRight size={18} strokeWidth={2} color="#2f8fff" aria-hidden style={{ flexShrink: 0 }} />
    </Link>
  );
}
