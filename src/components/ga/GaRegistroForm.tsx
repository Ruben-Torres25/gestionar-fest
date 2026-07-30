import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, UserPlus } from "lucide-react";

import { setSession } from "@/lib/ga-session";
import { cn } from "@/lib/utils";
import { GaGradientButton } from "./GaGradientButton";
import { GaIconInput } from "./GaIconInput";

type GaRegistroFormProps = {
  className?: string;
};

export function GaRegistroForm({ className }: GaRegistroFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    let blocked = false;

    if (!trimmed) {
      setEmailError("Ingresá tu correo electrónico");
      blocked = true;
    } else {
      setEmailError(null);
    }

    if (password !== confirm) {
      setConfirmError("Las contraseñas no coinciden");
      blocked = true;
    } else {
      setConfirmError(null);
    }

    if (blocked) return;

    // Guest-only mock registro — no org/promotor/guardia roles
    setSession({ email: trimmed, remember: false });
    void navigate({ to: "/fiestas" });
  }

  return (
    <div className={cn("font-ga flex flex-col gap-6", className)}>
      <header className="text-center">
        <h1 className="text-[1.85rem] font-semibold tracking-tight text-white">Crear cuenta</h1>
        <p className="mt-1.5 text-sm font-normal text-white/50">Registrate como invitado para continuar</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <div className="ga-login-card">
          <div className="ga-login-card-inner">
            <div className="flex flex-col gap-3.5">
              <div>
                <GaIconInput
                  id="registro-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  aria-invalid={Boolean(emailError)}
                  icon={<Mail strokeWidth={1.75} />}
                  tone="blue"
                />
                {emailError ? (
                  <p className="mt-1.5 font-sans text-xs text-red-400" role="alert">
                    {emailError}
                  </p>
                ) : null}
              </div>

              <GaIconInput
                id="registro-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                label="Contraseña"
                placeholder="••••••••"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                icon={<Lock strokeWidth={1.75} />}
                iconClassName="text-[#00e676]"
                tone="green"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-white/50 transition-colors hover:text-white/80"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff strokeWidth={1.75} /> : <Eye strokeWidth={1.75} />}
                  </button>
                }
              />

              <div>
                <GaIconInput
                  id="registro-confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  label="Confirmar contraseña"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(ev) => {
                    setConfirm(ev.target.value);
                    if (confirmError) setConfirmError(null);
                  }}
                  aria-invalid={Boolean(confirmError)}
                  icon={<Lock strokeWidth={1.75} />}
                  iconClassName="text-[#00e676]"
                  tone="green"
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="text-white/50 transition-colors hover:text-white/80"
                      aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showConfirm ? <EyeOff strokeWidth={1.75} /> : <Eye strokeWidth={1.75} />}
                    </button>
                  }
                />
                {confirmError ? (
                  <p className="mt-1.5 font-sans text-xs text-red-400" role="alert">
                    {confirmError}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <GaGradientButton type="submit">
          <span className="inline-flex items-center gap-2">
            <UserPlus className="size-4" />
            Crear cuenta
          </span>
        </GaGradientButton>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/15" />
        <span className="font-sans text-xs text-white/45">o</span>
        <div className="h-px flex-1 bg-white/15" />
      </div>

      <p className="text-center font-sans text-sm text-white/55">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="font-medium text-ga-green transition-opacity hover:opacity-90">
          Ingresar
        </Link>
      </p>
    </div>
  );
}
