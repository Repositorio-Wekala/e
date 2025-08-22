import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SupabaseProvider } from "@/components/SupabaseProvider";
import { ErrorHandler } from "@/components/ErrorBoundary";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "esme - Estrategia que escala",
  description: "Estrategia que escala. Tecnología que optimiza. Resultados que venden.",
  keywords: "estrategia, tecnología, marketing digital, AI, desarrollo de software, branding, consultoría",
  authors: [{ name: "esme" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e3a8a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <ErrorHandler />
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
