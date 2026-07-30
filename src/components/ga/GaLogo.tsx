import { GA_LOGO_COMPLETO } from "@/lib/ga-assets";
import { cn } from "@/lib/utils";

type GaLogoProps = {
  className?: string;
};

/** Official GestionAR Business lockup (monogram + wordmark). */
export function GaLogo({ className }: GaLogoProps) {
  return (
    <img
      src={GA_LOGO_COMPLETO}
      alt="GestionAR Business"
      className={cn("h-14 w-auto max-w-[min(100%,280px)] object-contain object-center", className)}
      draggable={false}
    />
  );
}
