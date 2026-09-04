import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { StructuredData } from '@/components/structured-data'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const siteUrl = 'https://yasinmalak.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Yasin Malak — React Native, React & Full Stack Software Engineer',
    template: '%s | Yasin Malak',
  },
  description:
    'Yasin Malak is a Software Engineer specializing in React Native, React, Next.js, TypeScript, and Full Stack web & mobile development. Building production iOS/Android apps, business dashboards, and scalable API platforms. Available for remote contract & freelance work worldwide.',
  applicationName: 'Yasin Malak Portfolio',
  authors: [{ name: 'Yasin Malak', url: siteUrl }],
  creator: 'Yasin Malak',
  publisher: 'Yasin Malak',
  category: 'technology',
  keywords: [
    'React Native developer',
    'React Native engineer',
    'React developer',
    'Full Stack developer',
    'Full Stack engineer',
    'Software Engineer',
    'Mobile App developer',
    'Mobile App engineer',
    'iOS React Native developer',
    'Android React Native developer',
    'Next.js developer',
    'TypeScript developer',
    'Expo developer',
    'Frontend developer',
    'Web and Mobile developer',
    'Firebase developer',
    'REST API developer',
    'Node.js Express developer',
    'MongoDB developer',
    'Tailwind CSS developer',
    'Freelance React Native developer',
    'Freelance Full Stack engineer',
    'Remote Software Engineer',
    'Cross-Platform Mobile Engineer',
    'Yasin Malak',
    'Yasin Malak Portfolio',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Yasin Malak — React Native, React & Full Stack Software Engineer',
    description:
      'Software Engineer building production mobile apps, high-performance web dashboards, and API platforms with React Native, React, TypeScript, and Next.js. Available for remote contracts.',
    url: siteUrl,
    siteName: 'Yasin Malak Portfolio',
    type: 'profile',
    firstName: 'Yasin',
    lastName: 'Malak',
    gender: 'male',
    username: 'yasinmalak',
    locale: 'en_US',
    images: [
      {
        url: '/projects/ledgerProject/first_image_withScreenShotsAndTextOnRight.png',
        width: 1200,
        height: 630,
        alt: 'Yasin Malak — React Native & Full Stack Software Engineering Showcase',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yasin Malak — React Native, React & Full Stack Software Engineer',
    description:
      'Production React Native, React, Next.js, and Full Stack Software Engineer. Cross-platform mobile apps & API architecture.',
    creator: '@yasinmalak',
    images: [
      {
        url: '/projects/ledgerProject/first_image_withScreenShotsAndTextOnRight.png',
        width: 1200,
        height: 630,
        alt: 'Yasin Malak — React Native & Full Stack Software Engineering Showcase',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0d0c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
