"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { Button } from "@/components/design-system/button";
import { Icon } from "@/components/icon";

type BrandSettingsFormProps = {
  action: (formData: FormData) => Promise<void>;
};

type PreviewStyle = CSSProperties & {
  "--brand": string;
};

const swatches = [
  "#4A5DA8",
  "#0E7C66",
  "#B4532A",
  "#7C3AED",
  "#B02A5B",
  "#1D6FB8",
  "#3F6212",
  "#334155",
];

export function BrandSettingsForm({ action }: BrandSettingsFormProps) {
  const [wordmark, setWordmark] = useState("Northwind");
  const [primaryColor, setPrimaryColor] = useState("#4A5DA8");
  const previewStyle: PreviewStyle = { "--brand": primaryColor };

  return (
    <form action={action} className="brand-settings">
      <div className="brand-settings__fields">
        <label>
          Nombre visible
          <input
            name="wordmark"
            value={wordmark}
            onChange={(event) => setWordmark(event.target.value)}
            required
          />
        </label>
        <label>
          URL del logo
          <input
            name="logoUrl"
            type="url"
            placeholder="https://tuempresa.com/logo.svg"
          />
          <small>Opcional. Mientras tanto usamos el nombre en texto.</small>
        </label>
        <fieldset className="brand-color-field">
          <legend>Color de marca</legend>
          <div className="brand-swatches">
            {swatches.map((color) => (
              <button
                type="button"
                key={color}
                aria-label={`Usar color ${color}`}
                aria-pressed={primaryColor === color}
                onClick={() => setPrimaryColor(color)}
                style={{ background: color }}
              />
            ))}
            <label className="brand-color-input">
              <input
                name="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(event) => setPrimaryColor(event.target.value)}
              />
              <span>{primaryColor.toUpperCase()}</span>
            </label>
          </div>
        </fieldset>
        <Button type="submit" size="lg">
          Guardar configuración
        </Button>
      </div>

      <aside className="brand-preview" style={previewStyle}>
        <p className="eyebrow">Vista previa en vivo</p>
        <div className="brand-preview__device">
          <header>
            <strong>{wordmark || "Tu empresa"}</strong>
            <span>3 de 12</span>
          </header>
          <div className="brand-preview__progress">
            <span />
          </div>
          <main>
            <p>Comunicación</p>
            <h2>¿Explica sus decisiones con claridad al equipo?</h2>
            <div className="brand-preview__scale">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  className={value === 4 ? "is-selected" : ""}
                  key={value}
                >
                  {value}
                </span>
              ))}
            </div>
            <button type="button">
              Continuar
              <Icon name="arrow-right" size={15} />
            </button>
            <small>Tus respuestas son anónimas</small>
          </main>
        </div>
      </aside>
    </form>
  );
}
