import type { Metadata } from "next";
import { Inter, Playfair_Display, Catamaran, Mukta_Malar } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const catamaran = Catamaran({ subsets: ["tamil", "latin"], variable: "--font-catamaran" });
const mukta = Mukta_Malar({ subsets: ["tamil", "latin"], weight: ["400", "700"], variable: "--font-mukta" });

export const metadata: Metadata = {
  title: "Ilanthoodhu | The Voice of Student Expression",
  description: "Ilanthoodhu Student Literary Journal established in 1987. The heritage of student expressions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ta">
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${catamaran.variable} ${mukta.variable} antialiased font-body bg-primary min-h-screen text-cream`}>
        {children}
        <SiteChrome />
      </body>
    </html>
  );
}
