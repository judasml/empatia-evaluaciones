
import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";

type AppHeaderProps = {
  logoSrc?: string;
  logoAlt?: string;
  name?: string;
  onBack?: () => void;
  right?: ReactNode;
  compact?: boolean;
  person?: string;
  relation?: string;
};

export function AppHeader({
  logoSrc,
  logoAlt = "Logo",
  name,
  onBack,
  right,
  compact = false,
  person,
  relation,
}: AppHeaderProps) {
  return (
    <header className="ds-app-header">
      {onBack ? (
        <button
          type="button"
          className="ds-app-header__back"
          aria-label="Atrás"
          onClick={onBack}
        >
          <Icon name="chevron-left" />
        </button>
      ) : null}

      {compact ? (
        <div className="ds-app-header__person">
          <strong>{person}</strong>
          {relation ? <span>{relation}</span> : null}
        </div>
      ) : (
        <div className="ds-app-header__brand">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={160}
              height={28}
              unoptimized
            />
          ) : (
            <strong>{name}</strong>
          )}
        </div>
      )}

      {right ? <div className="ds-app-header__right">{right}</div> : null}
    </header>
  );
}

