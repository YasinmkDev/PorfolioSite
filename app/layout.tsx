const siteUrl = 'https://yasinmkdev.vercel.app'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Yasin Malak — React Native, React & Full Stack Software Engineer',
    template: '%s | Yasin Malak',
  },
  description:
    'Yasin Malak is a Software Engineer specializing in React Native, React, Next.js, TypeScript, and Full Stack web & mobile development. Building production iOS/Android apps, business dashboards, and scalable API platforms. Available for remote contract & freelance work worldwide.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Yasin Malak — React Native, React & Full Stack Software Engineer',
    description:
      'Software Engineer building production mobile apps, high-performance web dashboards, and API platforms with React Native, React, TypeScript, and Next.js.',
    url: siteUrl,
    siteName: 'Yasin Malak Portfolio',
    type: 'profile',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yasin Malak — React Native, React & Full Stack Software Engineer',
    description:
      'Production React Native, React, Next.js, and Full Stack Software Engineer. Cross-platform mobile apps & API architecture.',
    creator: '@yasinmalak',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}   