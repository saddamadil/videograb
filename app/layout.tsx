import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VidGrab – Free Video Downloader Tools | YouTube, TikTok, Instagram & More',
  description:
    'Download videos from YouTube, TikTok, Instagram, Facebook, Twitter and Pinterest. Free, fast, no login required.',
  metadataBase: new URL('https://vidgrab.saddamadil.in'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'VidGrab – Free Video Downloader Tools',
    description:
      'Download videos from YouTube, TikTok, Instagram, Facebook, Twitter and Pinterest. Free, fast, no login required.',
    url: 'https://vidgrab.saddamadil.in',
    siteName: 'VidGrab',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
