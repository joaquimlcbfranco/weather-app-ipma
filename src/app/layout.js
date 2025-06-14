import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import imgSrc from "../assets/background.jpg"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather App",
  description: "Weather app created by joaquimlcbfranco",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Image alt="welcome icon" src={imgSrc} width={1280} height={720} />
        {children}
      </body>
    </html>
  );
}
