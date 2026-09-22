import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Yasin Malak — React Native & Full Stack Engineer',
    short_name: 'Yasin Malak',
    description:
      'Portfolio of Yasin Malak: Software Engineer specializing in React Native, React, Next.js, and API architecture.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0d0c',
    theme_color: '#0b0d0c',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}   