import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Web3Provider } from "@/providers/Web3Provider";
import { LocationProvider } from "@/providers/LocationProvider";
import { CurrencyProvider } from "@/providers/CurrencyProvider";

export const metadata: Metadata = {
  title: "WeatherBet - Climate Prediction Markets",
  description: "Simple weather prediction markets for everyone. Predict rain and temperature with ease.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#22c55e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Web3Provider>
          <LocationProvider>
            <CurrencyProvider>
              {children}
            </CurrencyProvider>
          </LocationProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
