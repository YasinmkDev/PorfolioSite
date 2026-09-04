import React from 'react'

export function StructuredData() {
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': 'https://yasinmalak.dev/#profilepage',
        url: 'https://yasinmalak.dev',
        name: 'Yasin Malak — React Native, React & Full Stack Software Engineer',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://yasinmalak.dev/#website',
          url: 'https://yasinmalak.dev',
          name: 'Yasin Malak — Software Engineering Portfolio',
          description:
            'Production React Native, React, Next.js, and Full Stack Software Engineer portfolio showcasing live mobile apps, business dashboards, and API platforms.',
          publisher: {
            '@id': 'https://yasinmalak.dev/#person',
          },
        },
        mainEntity: {
          '@id': 'https://yasinmalak.dev/#person',
        },
        about: {
          '@id': 'https://yasinmalak.dev/#person',
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://yasinmalak.dev/projects/ledgerProject/first_image_withScreenShotsAndTextOnRight.png',
        },
        datePublished: '2025-01-01',
        dateModified: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'Person',
        '@id': 'https://yasinmalak.dev/#person',
        name: 'Yasin Malak',
        givenName: 'Yasin',
        familyName: 'Malak',
        jobTitle: [
          'Software Engineer',
          'React Native Developer',
          'React Developer',
          'Full Stack Engineer',
          'Mobile App Developer',
        ],
        description:
          'Software Engineer specializing in cross-platform mobile app development with React Native, React, Next.js, TypeScript, Node.js, and REST APIs.',
        url: 'https://yasinmalak.dev',
        email: 'hello@yasinmalak.dev',
        knowsLanguage: ['English', 'Urdu'],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Virtual University of Pakistan',
          award: 'BS in Software Engineering',
        },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Software Engineer',
          occupationalCategory: '15-1252.00 - Software Developers',
          skills: [
            'React Native',
            'React.js',
            'Next.js',
            'TypeScript',
            'JavaScript (ES6+)',
            'Expo (SDK 50+)',
            'Mobile App Development (iOS & Android)',
            'Full Stack Web Development',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Firebase Firestore & Auth',
            'REST API Design',
            'Swagger / OpenAPI',
            'State Management (Zustand, Context API)',
            'Tailwind CSS & NativeWind',
            'Performance Profiling & 60fps Animations',
          ],
        },
        knowsAbout: [
          'React Native',
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'Expo',
          'Mobile App Development',
          'iOS Development',
          'Android Development',
          'Full Stack Web Development',
          'Frontend Engineering',
          'RESTful APIs',
          'Swagger / OpenAPI',
          'Node.js',
          'MongoDB',
          'Firebase',
          'Tailwind CSS',
          'NativeWind',
          'UI/UX Design Systems',
          'Cross-Platform Software Engineering',
        ],
        offers: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'React Native & Full Stack Software Development',
            description:
              'End-to-end mobile app development for iOS & Android, high-performance web dashboards, and API integration for international teams and startups.',
            provider: {
              '@id': 'https://yasinmalak.dev/#person',
            },
            serviceType: [
              'Mobile App Development',
              'React Native Engineering',
              'Frontend Web Development',
              'Full Stack API Integration',
              'Software Consulting',
            ],
          },
        },
      },
      {
        '@type': 'ItemList',
        '@id': 'https://yasinmalak.dev/#portfolio-items',
        name: 'Featured Software Engineering Projects',
        description:
          'Selected production applications engineered by Yasin Malak using React Native, React, Supabase, AI OCR, and TypeScript.',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'SoftwareApplication',
              name: 'Ledger AI',
              operatingSystem: 'iOS, Android',
              applicationCategory: 'FinanceApplication',
              description:
                'An offline-first mobile expense tracker powered by camera-based OCR, AI-driven receipt line-item parsing, and real-time category budget enforcement.',
              softwareRequirements: 'React Native, Expo, TypeScript, Gemini AI Vision, Reanimated',
              author: {
                '@id': 'https://yasinmalak.dev/#person',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'SoftwareApplication',
              name: 'ReserveEase',
              operatingSystem: 'iOS, Android, Web',
              applicationCategory: 'BusinessApplication',
              description:
                'A cross-platform appointment scheduling system with dual customer/provider role portals, real-time availability conflict resolution, and calendar sync.',
              softwareRequirements: 'React Native, Expo, Supabase, PostgreSQL, Zustand, TypeScript',
              author: {
                '@id': 'https://yasinmalak.dev/#person',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'SoftwareApplication',
              name: "Marlow's Dining Engine & POS",
              operatingSystem: 'iOS, Android, Web POS',
              applicationCategory: 'RestaurantPOSApplication',
              description:
                'A full-stack restaurant operations platform featuring QR-driven guest table ordering, split-bill settlement, Kitchen Display System (KDS), and 86 inventory controls.',
              softwareRequirements: 'React Native, Expo, Context Architecture, TypeScript, Local POS Storage',
              author: {
                '@id': 'https://yasinmalak.dev/#person',
              },
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaGraph).replace(/</g, '\\u003c'),
      }}
    />
  )
}
