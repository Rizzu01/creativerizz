import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rizwan Khan — UI/UX & Graphic Designer",
  description: "Portfolio of Rizwan Khan — UI/UX, graphic design, brand identity and web design.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}