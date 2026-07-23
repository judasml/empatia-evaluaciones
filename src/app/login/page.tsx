import Link from "next/link";
import { login } from "@/app/login/actions";
import { Button } from "@/components/design-system/button";
import { Card } from "@/components/design-system/card";
import { Icon } from "@/components/icon";
import { isDemoMode, isSupabaseConfigured } from "@/lib/supabase/config";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const demoAvailable = isDemoMode() && !isSupabaseConfigured();

  return (
    <main className="login-page">
      <Card padding="lg" className="login-card">
        <Link href="/" className="login-brand">
          empat.IA Evaluaciones
        </Link>
        <span className="login-card__icon">
          <Icon name="shield" size={24} />
        </span>
        <p className="eyebrow">Acceso administrativo</p>
        <h1>Bienvenido de nuevo</h1>
        <p className="login-card__lead">
          Entra para gestionar ciclos, participación y resultados.
        </p>

        {error ? (
          <p className="form-error" role="alert">
            El correo o la contraseña no son correctos.
          </p>
        ) : null}

        <form action={login} className="admin-form">
          <label>
            Correo
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@empresa.com"
              required={!demoAvailable}
            />
          </label>
          <label>
            Contraseña
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required={!demoAvailable}
            />
          </label>
          <Button type="submit" size="lg" fullWidth>
            Entrar
          </Button>
        </form>

        {demoAvailable ? (
          <Link href="/admin" className="login-demo-link">
            Ver dashboard con datos de demostración
            <Icon name="arrow-right" size={15} />
          </Link>
        ) : null}
      </Card>
    </main>
  );
}
