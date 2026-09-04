import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
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
        src: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
