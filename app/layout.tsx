import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duckpin Gniezno | Jedzenie, gry i dobry czas",
  description: "Duckpin w Gnieźnie. Spotkaj ekipę, zagraj w kręgle i zostań na coś dobrego. Dąbrówki 15/2, Gniezno.",
  metadataBase: new URL("https://duckpin.pl"),
  openGraph: { title: "Duckpin Gniezno", description: "Miejsce na dobrą grę i jeszcze lepszy wieczór.", type: "website", locale: "pl_PL" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body>{children}</body></html>;
}