import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lightbulb Rentals - Camera, Lighting & Production Equipment",
  description: "Camera, Lighting, and Production Supplies rental house for Film, TV, Photo and Studio shoots in NYC, Philadelphia and Pittsburgh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
