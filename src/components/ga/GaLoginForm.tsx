import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { setSession } from "@/lib/ga-session";
import { cn } from "@/lib/utils";
import { GaGradientButton } from "./GaGradientButton";
import { GaIconInput } from "./GaIconInput";
import { GaSecondaryLink } from "./GaSecondaryLink";

type GaLoginFormProps = {
  className?: string;
};

export function GaLoginForm({ className }: GaLoginFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  function handleForgot() {
    toast("Recuperación de contraseña próximamente", {
      description: "Por ahora no hay recuperación real — solo demo.",
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Ingresá tu correo electrónico");
      return;
    }
    setEmailError(null);
    setSession({ email: trimmed, remember });
    void navigate({ to: "/fiestas" });
  }

  return (
    <div className={cn("font-ga flex flex-col", className)}>
      <header className="text-center">
        <h1 className="text-[1.85rem] font-semibold leading-none tracking-tight text-white">
          Bienvenido
        </h1>
        <p className="mt-2 text-sm font-normal text-white/40">Accedé a tu cuenta para continuar</p>
      </header>

      <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-[18px]" noValidate>
        <div className="ga-login-card">
          <div className="ga-login-card-inner">
            <div className="flex flex-col gap-3.5">
              <div>
                <GaIconInput
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  tone="blue"
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  aria-invalid={Boolean(emailError)}
                  icon={<Mail strokeWidth={1.75} />}
                />
                {emailError ? (
                  <p className="mt-1.5 text-xs text-red-400" role="alert">
                    {emailError}
                  </p>
                ) : null}
              </div>

              <GaIconInput
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                label="Contraseña"
                placeholder="••••••••"
                tone="green"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                icon={<Lock strokeWidth={1.75} />}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-white/45 transition-colors hover:text-white/75"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff strokeWidth={1.75} /> : <Eye strokeWidth={1.75} />}
                  </button>
                }
              />

              <div className="flex items-center justify-between gap-3 pt-0.5">
                <label className="flex cursor-pointer items-center gap-2 text-[13px] font-normal text-white/40">
                  <Checkbox
                    checked={remember}
                    onCheckedChange={(v) => setRemember(v === true)}
                    className="size-[15px] rounded-[3px] border-[#0088ff]/80 data-[state=checked]:border-[#0088ff] data-[state=checked]:bg-[#0088ff] data-[state=checked]:text-white"
                  />
                  Recordarme
                </label>
                <button
                  type="button"
                  onClick={handleForgot}
                  className="text-[13px] font-medium text-[#00e676] transition-opacity hover:opacity-90"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>
          </div>
        </div>

        <GaGradientButton type="submit" label="Ingresar" />
      </form>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/12" />
        <span
          className="flex size-[9px] shrink-0 rounded-full border border-white/30 bg-transparent"
          aria-hidden
        />
        <div className="h-px flex-1 bg-white/12" />
      </div>

      <GaSecondaryLink to="/registro" label="Crear cuenta" className="mt-4" />

      <footer className="mt-auto pt-8 text-center">
        <p className="text-sm font-normal text-white/40">¿Necesitás ayuda?</p>
        <a
          href="mailto:gestionar.business@gmail.com"
          className="mt-1 inline-block text-sm font-semibold text-[#00e676] transition-opacity hover:opacity-90"
        >
          Contactanos
        </a>
      </footer>
    </div>
  );
}
