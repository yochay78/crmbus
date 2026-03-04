import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRMBUS — AI CRM Comparisons",
  description:
    "We compare leading AI CRM platforms to help you automate lead flow and grow revenue in 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")})()`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3QP51HX5LG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3QP51HX5LG');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} antialiased bg-transparent text-slate-900 dark:text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
