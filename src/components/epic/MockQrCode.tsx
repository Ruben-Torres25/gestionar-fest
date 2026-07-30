import { useEffect, useState } from "react";
import QRCode from "qrcode";

import { cn } from "@/lib/utils";

/** Real QR with generous quiet zone for the premium pass. */
export function MockQrCode({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void QRCode.toDataURL(value, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 560,
      color: {
        dark: "#0a0612",
        light: "#ffffff",
      },
    }).then((url) => {
      if (!cancelled) setDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [value]);

  if (!dataUrl) {
    return (
      <div
        className={cn("animate-pulse rounded-[16px] bg-white", className)}
        aria-hidden
      />
    );
  }

  return (
    <img
      src={dataUrl}
      alt="Código QR de acceso"
      className={cn("rounded-[16px] bg-white", className)}
      draggable={false}
    />
  );
}
