
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "@fontsource/hanken-grotesk/700.css";
import "@fontsource/hanken-grotesk/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "empat.IA Evaluaciones",
    template: "%s · empat.IA Evaluaciones",
  },
  description:
    "Evaluaciones 270°/360° cálidas, simples y confidenciales para equipos.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

