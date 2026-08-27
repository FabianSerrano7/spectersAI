import type { Metadata } from "next";
import { Schibsted_Grotesk, Inter } from "next/font/google";
import "./admin.css";

const display = Schibsted_Grotesk({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Inter({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Panel Lovely Hair",
  robots: { index: false, follow: false },
};

export default function AdminLovelyHairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`admin-root ${display.variable} ${body.variable}`}
      data-theme="light"
    >
      {children}
    </div>
  );
}
