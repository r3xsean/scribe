import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scribe — Free Offline Video Transcription",
  description:
    "Transcribe YouTube and TikTok videos locally on your PC using AI. Fast, private, completely offline. No cloud APIs, no data leaves your computer. Powered by Whisper.",
  keywords: [
    "transcribe youtube videos",
    "free transcription software",
    "offline transcription",
    "whisper transcription app",
    "youtube to text",
    "tiktok transcription",
    "local AI transcription",
    "video to text",
    "free speech to text",
    "whisper desktop app",
    "gpu transcription",
    "private transcription",
  ],
  authors: [{ name: "Scribe" }],
  metadataBase: new URL("https://getscribe.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Scribe — Free Offline Video Transcription",
    description:
      "Transcribe YouTube and TikTok videos locally using AI. Fast, private, completely offline.",
    url: "https://getscribe.vercel.app",
    siteName: "Scribe",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Scribe — Free Offline Video Transcription",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribe — Free Offline Video Transcription",
    description:
      "Transcribe YouTube and TikTok videos locally using AI. Fast, private, completely offline.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="ypDb1UA0mSsGBONoTDv-n07zftnQ3Pr1g_1pgW3QDxE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Scribe",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Windows",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "Free offline desktop app for transcribing YouTube and TikTok videos using local AI models.",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
