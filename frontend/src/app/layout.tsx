import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontHeadline = Outfit({
  variable: "--font-manrope", // Preserving the variable name so downstream mappings remain intact
  subsets: ["latin"],
});

const fontBody = Plus_Jakarta_Sans({
  variable: "--font-inter", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoDM Pro",
  description: "Next Generation Instagram Automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Directly loading Material Symbols to guarantee icons do not render as text */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body
        className={`${fontHeadline.variable} ${fontBody.variable} antialiased text-[#191c1e] bg-[#f7f9fb]`}
      >
        {children}
      </body>
    </html>
  );
}
