'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Minus, Plus, Maximize2, Sparkles, Layers } from 'lucide-react'
import {
  ProjectGlassGalleryModal,
  GallerySlide,
} from '@/components/project-glass-gallery-modal'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

type Project = {
  id: string
  name: string
  kind: string
  year: string
  summary: string
  problem: string
  role: string
  stack: string[]
  challenges: { title: string; body: string }[]
  outcome: string
  repo?: string
  slides: GallerySlide[]
}

const projects: Project[] = [
  {
    id: 'waveform',
    name: 'Waveform',
    kind: 'Spotify-System Clone · React Native',
    year: '2026',
    summary:
      'A study of Spotify’s product system, rebuilt from scratch in React Native + Expo — not a skin, a working system: real playback, a real queue, and personalization honestly computed from the listener’s own behavior on-device.',
    problem:
      'Most clone builds fake the product: static screens with a play button that plays nothing. Waveform rebuilds the system underneath — engine, queue, mixes, stats — so every surface reacts to what the listener actually does.',
    role: 'Solo designer & developer. Built the audio engine, queue semantics, mix generation, stats/streak engine, and all 12+ screens, with a motion pass and a UI polish pass on top.',
    stack: ['React Native', 'Expo SDK 57', 'TypeScript', 'Zustand', 'expo-audio', 'Reanimated 4', 'FlashList'],
    challenges: [
      {
        title: 'Real playback engine',
        body: 'Single audio engine with queue, shuffle that keeps the current track pinned, repeat off/all/one, scrubber, transition fades, and error skip-recovery with a circuit breaker.',
      },
      {
        title: 'On-device personalization',
        body: 'Weekly mixes, taste profiles, listening stats, and streaks computed from the user’s own play log — no backend, no fake data. Taste signals weight onboarding picks, likes, counted plays, and skips.',
      },
      {
        title: 'Premium gates that are real',
        body: 'Free vs Premium is enforced, not cosmetic: downloads, crossfade caps, and the home ad all change with the plan, behind an honest demo paywall.',
      },
    ],
    outcome:
      'A complete, working music system: onboarding with taste picks, Home with resume contexts and a Weekly Mix hero, search, library, collections, queue, Now Playing, profile stats, and settings — all running on real state.',
    repo: 'https://github.com/YasinmkDev/waveform',
    slides: [
      {
        src: '/projects/waveform/home.png',
        alt: 'Waveform home screen with Weekly Mix hero and resume grid',
        title: 'Waveform Home',
        caption: 'Weekly Mix hero, resume grid from real play contexts, and the streak card — all driven by the on-device play log.',
        tag: 'Home',
      },
    ],
  },
  {
    id: 'findit',
    name: 'FindIt — Smart Item Finder',
    kind: 'AI Item Finder · React Native',
    year: '2026',
    summary:
      'Snap it, stash it, find it in one word. A React Native + Expo app that solves “where did I put that?” — photograph an item, AI analyses it, note where you kept it, and later a single search word brings the exact photo back.',
    problem:
      'People lose everyday items and remember what they look like, not what they named a file. FindIt turns a photo into searchable words, so the thing you remember is the thing you search by.',
    role: 'Solo designer & developer. Built the capture flow, Gemini analysis client, scan queue, search, places, and the freemium paywall.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Google Gemini API', 'AsyncStorage'],
    challenges: [
      {
        title: 'AI photo analysis',
        body: 'Gemini analyses each photo into objects, colours, descriptions, and tags — the vocabulary the search runs on.',
      },
      {
        title: 'Scan queue that never loses a photo',
        body: 'Photos save first as pending cards and AI scans serially, oldest-first. One failure never blocks the queue, failed scans get a retry pill, and the queue resumes after the app closes.',
      },
    ],
    outcome:
      'A working finder: 12-item sample set, guest mode, places, import, settings, and a paywall — with pending cards visible but not text-searchable until scanned.',
    repo: 'https://github.com/YasinmkDev/findit-smart-item-finder',
    slides: [
      {
        src: '/projects/findit/home.png',
        alt: 'FindIt home grid of stashed items',
        title: 'FindIt Home',
        caption: 'The stash grid: photographed items with AI tags, ready to be found by a single search word.',
        tag: 'Home',
      },
    ],
  },
  {
    id: 'fittrack',
    name: 'FitTrack — APEX Studio Lab',
    kind: 'Gym Management SaaS · React Native',
    year: '2026',
    summary:
      'Run the gym from your phone: members, plans, attendance, classes, and fee collection — built for owners who currently run on registers, spreadsheets, and WhatsApp groups.',
    problem:
      'Small-to-mid gyms track everything on paper and chat threads. FitTrack gives the owner one phone workflow: members and plans, then attendance and classes, then fee collection.',
    role: 'Solo designer & developer. Recreated the APEX reference design exactly, then built the Hub, Roster, Schedule, and Leaderboard tabs plus hidden Join and Payments routes, member detail, and the Pro paywall.',
    stack: ['React Native', 'Expo SDK 57', 'TypeScript', 'Reanimated'],
    challenges: [
      {
        title: 'Owner workflow, modelled on real gym software',
        body: 'The flow follows established gym tools (Gymdesk, Mindbody): retention radar, milestones, athlete spotlight, and a week view from Monday to Saturday.',
      },
      {
        title: 'Fluid navigation and demo auth',
        body: 'A floating pill tab bar with a spring active state, and an animated demo auth screen (any valid email + 6-character password, nothing stored).',
      },
    ],
    outcome:
      'A complete gym SaaS shell: Hub stats, roster with athlete cards, class schedule, leaderboard, join flow, payments, member detail, and an APEX Pro paywall.',
    repo: 'https://github.com/YasinmkDev/fittrack',
    slides: [
      {
        src: '/projects/fittrack/hub.png',
        alt: 'FitTrack APEX Hub with stats and retention radar',
        title: 'FitTrack Hub',
        caption: 'Hub stats, Retention Radar, milestones, and the athlete spotlight — the owner’s morning view.',
        tag: 'Hub',
      },
    ],
  },
  {
    id: 'mobilebazaar',
    name: 'MobileBazaar',
    kind: 'Mobile Phone E-Commerce · Final Year Project',
    year: '2026',
    summary:
      'A full-stack, single-vendor mobile phone e-commerce store built for the Pakistan market: storefront, guest checkout, order tracking, and a complete admin operations console.',
    problem:
      'Buying a phone in Pakistan means PTA approval, warranty trust, EMI math, and cash on delivery — none of which a generic store template handles. MobileBazaar is built around those realities.',
    role: 'Solo full-stack developer (FYP). Built the storefront, cart/checkout/tracking, admin console, Supabase integration, and the SIGNAL redesign.',
    stack: ['Next.js 15', 'TypeScript', 'Supabase (PostgreSQL, Auth, RLS)'],
    challenges: [
      {
        title: 'Pakistan-market commerce',
        body: 'PKR pricing, PTA-approved badges, EMI plans, and cash-on-delivery as the primary payment method, with simulated JazzCash/EasyPaisa.',
      },
      {
        title: 'Guest checkout and tracking',
        body: 'Checkout works without an account, orders are tracked on-device, and the admin console covers KPIs, charts, low-stock meters, order chips, and device add/edit with image upload.',
      },
    ],
    outcome:
      'A complete store: 25-phone catalogue, faceted shop, product pages with variants, cart, checkout, tracking, and an admin ops console — plus a header CSS defect found by screenshots and fixed in the same pass.',
    repo: 'https://github.com/YasinmkDev/mobilebazaar-fyp',
    slides: [
      {
        src: '/projects/mobilebazaar/home-desktop.png',
        alt: 'MobileBazaar home page with hero and trust bar',
        title: 'MobileBazaar Home',
        caption: 'SIGNAL design: black hero, red trust marquee, and honest PKR pricing with PTA and warranty badges.',
        tag: 'Home',
      },
    ],
  },
  {
    id: 'swift-courier',
    name: 'Swift Courier',
    kind: 'Food Delivery & Courier · React Native',
    year: '2026',
    summary:
      'A high-performance, production-style React Native delivery application: a multi-vertical marketplace for food, grocery, and same-day package courier, with live courier tracking.',
    problem:
      'Delivery apps live or die on the tracking moment. Swift Courier simulates the whole journey — placed, confirmed, preparing, picked up, out for delivery, delivered — so the tracking experience works with or without a backend.',
    role: 'Solo designer & developer. Built the marketplace, product customization, persistent cart and theme, tracking simulation, and demo controls.',
    stack: ['React Native', 'Expo SDK 57', 'TypeScript', 'Zustand', 'MapLibre', 'Reanimated', 'Bottom Sheet', 'Supabase Realtime'],
    challenges: [
      {
        title: 'Multi-vertical marketplace',
        body: 'Food, grocery, and package services in one catalogue, with required and optional modifier groups, live pricing calculation, and quantity controls.',
      },
      {
        title: 'Offline simulation engine',
        body: 'Works immediately without internet or backend setup: couriers move along real waypoints with live status transitions, and Supabase Realtime connects only if credentials are present.',
      },
    ],
    outcome:
      'A complete delivery app: home, categories, product detail, cart, checkout, live tracking with a demo status accelerator, orders, activity, account, addresses, dietary, favorites, and support.',
    repo: 'https://github.com/YasinmkDev/Restaurant-Order-App',
    slides: [
      {
        src: '/projects/swift-courier/home.png',
        alt: 'Swift Courier home with delivery card and categories',
        title: 'Swift Courier Home',
        caption: 'Delivery card, categories, and restaurant discovery — the marketplace front door.',
        tag: 'Home',
      },
    ],
  },
  {
    id: 'hospitality-panel',
    name: 'Hospitality Admin Panel',
    kind: 'Hospitality Admin Dashboard · React',
    year: '2026',
    summary:
      'A modern, full-featured administration dashboard for hospitality management: floors, rooms, beds, reservations, and housekeeping in one unified interface.',
    problem:
      'Hotel operations split across registers and spreadsheets: which rooms are free, which beds are made, which reservations need attention. This panel unifies them into one dashboard.',
    role: 'Solo designer & developer. Built the full route set — dashboard, floors, rooms, beds, room types, features, products, rates, seasons, reservations, housekeeping, reminders, and settings — with auth screens.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    challenges: [
      {
        title: 'Twenty routes, one system',
        body: 'Dashboard, rooms and room layout, beds, room types and features, products, rates, seasons, reservations (including do-not-rent), housekeeping, reminders, and settings — all captured on desktop and mobile.',
      },
      {
        title: 'Demo sandbox fallback',
        body: 'With no backend credentials configured, the app falls back to its own built-in sample dataset, so every screen renders real content instead of an error state.',
      },
    ],
    outcome:
      'A complete operations dashboard: 44% occupancy, 28 rooms, and revenue on the home view, with every management surface reachable and captured.',
    repo: 'https://github.com/YasinmkDev/hospitality-Admin-Panel',
    slides: [
      {
        src: '/projects/hospitality/dashboard-desktop.png',
        alt: 'Hospitality admin dashboard with occupancy and revenue',
        title: 'Hospitality Dashboard',
        caption: 'Occupancy, rooms, and revenue at a glance — the operations overview.',
        tag: 'Dashboard',
      },
    ],
  },
  {
    id: 'copysprint',
    name: 'CopySprint',
    kind: 'High-Velocity AI Advertising Engine · Full Stack Web',
    year: '2025',
    summary:
      'A high-velocity AI advertising engine that converts a single product brief or URL into 5 channel-native, ready-to-publish ad packages in two seconds — complete with built-in Google RSA strength scoring and 1-click batch export.',
    problem:
      'Performance marketers and growth teams waste hours adapting product copy across fragmented ad platforms, resulting in bland copy-pasting or generic AI hallucinations. CopySprint converts raw product specs into distinct, platform-optimized formats with zero prompt engineering.',
    role: 'Lead Full-Stack Architect & AI Systems Engineer. Designed the 1-to-5 native ad synthesis pipeline, streaming UI with instant TTFT, responsive multi-channel preview matrix, algorithmic Google RSA quality rubric, and batch export integrations.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI Synthesis Pipeline', 'Zustand', 'Lucide'],
    challenges: [
      {
        title: '1-to-5 Native Ad Synthesis Engine',
        body: 'Synthesized 5 distinct channel-native formats in a single pass: Meta feed copy (hook, description, headline, CTA), Google Search RSA (3 headlines, 2 descriptions), TikTok/Reels 9:16 3-scene video storyboard with visual directions & voiceover hooks, direct email (A/B subject lines & body), and high-converting landing page hero copy.',
      },
      {
        title: 'Algorithmic Google RSA Ad Strength Scoring (90+/100)',
        body: 'Engineered a real-time scoring engine that evaluates headline diversity, keyword density, and character limits to accurately predict and achieve 90+/100 Google Ad Strength before publishing.',
      },
      {
        title: '1-Click Batch Export & Workflow Integration',
        body: 'Designed multi-format export pipelines enabling growth teams to seamlessly push approved ad sets directly to CSV, JSON, Make, and Zapier webhook workflows.',
      },
    ],
    outcome:
      'A production-ready growth marketing engine delivering 5 platform-native ad packages in under two seconds, empowering performance teams to launch high-CTR campaigns at scale.',
    slides: [
      {
        src: '/projects/AdsGenerationWebApp/screen1.png',
        alt: 'CopySprint AI Advertising Engine Overview',
        title: 'CopySprint Platform Overview',
        caption:
          'Instant 1-to-5 ad generation: turning a single product brief into Meta feed copy, Google Search RSA, and TikTok video scripts in 2 seconds.',
        tag: 'Platform Overview',
      },
      {
        src: '/projects/AdsGenerationWebApp/screen2.png',
        alt: 'Zero Prompt Engineering & Multi-Channel Formats',
        title: 'Zero Prompt Engineering & Live Ad Matrix',
        caption:
          'Interactive multi-channel workspace with live preview, built-in Google RSA 94/100 scoring, and direct export to CSV & Zapier.',
        tag: 'Multi-Channel Matrix',
      },
      {
        src: '/projects/AdsGenerationWebApp/screen3.png',
        alt: 'High-Velocity Streaming Generation Engine',
        title: 'High-Velocity Ad Engine & Quality Metrics',
        caption:
          'Sub-second streaming ad generation with 42ms TTFT, automated quality verification, and platform compliance checks.',
        tag: 'Streaming Engine',
      },
      {
        src: '/projects/AdsGenerationWebApp/screen4.png',
        alt: 'Batch Export & Native Ad Pipeline',
        title: '1-Click Workflow Export & History',
        caption:
          'Native ad pipeline with 1-click batch export to CSV, JSON, Make, and Zapier webhooks, complete with run history and mobile review.',
        tag: 'Workflow Automation',
      },
    ],
  },
  {
    id: 'fastbill',
    name: 'FastBill',
    kind: 'Financial Micro-SaaS & Invoicing Studio · Full Stack',
    year: '2025',
    summary:
      'A modern financial micro-SaaS engineered to solve invoicing friction for freelancers and boutique agencies with a 10-second promise: natural-language line input, instant 300 DPI vector PDF preview, and one-click Stripe QR checkout.',
    problem:
      'Traditional platforms like QuickBooks require 15+ clicks and tedious onboarding just to bill a client. Freelancers, consultants, and boutique agencies needed a zero-friction billing studio that transforms casual line inputs into print-ready institutional invoices in seconds.',
    role: 'Lead Product Architect & Full-Stack Engineer. Designed the complete end-to-end journey—from 90-second onboarding to a modular design system, natural-language parsing engine, vector PDF generator, and Supabase RLS backend.',
    stack: [
      'Next.js 14 (App Router)',
      'TypeScript',
      'Supabase (PostgreSQL & RLS)',
      'Tailwind CSS',
      'Stripe QR Checkout',
      '300 DPI Vector PDF Engine',
      'SendGrid API',
    ],
    challenges: [
      {
        title: 'Natural-Language Quick Line Parser',
        body: 'Engineered an on-the-fly syntax parser converting casual billing inputs (e.g., "3 hours × $85 Frontend Architecture") into typed line items, rates, quantities, and automated subtotal/tax calculations instantly.',
      },
      {
        title: '300 DPI Print-Ready Vector PDF Engine',
        body: 'Built a dual-render pipeline capable of displaying a live real-time web canvas while compiling crisp 300 DPI print-ready A4 PDFs with embedded Stripe dynamic payment QR codes.',
      },
      {
        title: 'Client Directory & Adaptive Billing Engine',
        body: 'Architected multi-client ledger profiles with custom hourly presets, Net-14/30 term rules, automated follow-up reminders, and 5 institutional-grade layout templates.',
      },
    ],
    outcome:
      'A production-ready financial micro-SaaS cutting invoice creation time to under 10 seconds, accelerating client settlement with instant Stripe QR checkouts and seamless 90-second onboarding.',
    slides: [
      {
        src: '/projects/invoiceGeneratorwebApp/screen3.png',
        alt: 'FastBill 10-Second Invoice Studio & Live 300 DPI PDF Engine',
        title: '10-Second Invoicing Studio & Live Canvas',
        caption:
          'Natural-language line parser ("3 hours × $85"), live print-accurate A4 canvas, and instant subtotal calculations with Stripe QR checkout.',
        tag: 'Core Studio',
      },
      {
        src: '/projects/invoiceGeneratorwebApp/screen1.png',
        alt: 'FastBill Adaptive Billing Engine & Client Management',
        title: 'Client Ledger & Invoice Templates Gallery',
        caption:
          '5 pre-built institutional layout presets, configurable client hourly rates, Net payment terms, and automated payment reminders.',
        tag: 'Billing Engine',
      },
      {
        src: '/projects/invoiceGeneratorwebApp/screen4.png',
        alt: 'FastBill 90-Second Onboarding & User Flow',
        title: '90-Second Onboarding & Setup Journey',
        caption:
          'Zero-friction contractor onboarding: one-click OAuth auth, business profile defaults, and first invoice generated in under 90 seconds.',
        tag: 'User Journey',
      },
      {
        src: '/projects/invoiceGeneratorwebApp/screen2.png',
        alt: 'FastBill Production Full-Stack Architecture & Micro-SaaS',
        title: 'Production Full-Stack Architecture',
        caption:
          'Next.js 14 App Router, Supabase PostgreSQL with Row Level Security (RLS), 300 DPI vector PDF engine, and SendGrid transactional delivery.',
        tag: 'Architecture',
      },
    ],
  },
  {
    id: 'ledger-ai',
    name: 'Ledger AI',
    kind: 'AI Receipt & Expense Scanner · React Native',
    year: '2025',
    summary: 'An offline-first mobile expense tracker powered by camera-based OCR, AI-driven receipt line-item parsing, and real-time category budget enforcement.',
    problem:
      'Manual expense entry is tedious and slow, while cloud-only budgeting apps demand intrusive bank logins. Users needed a private, on-device mobile solution to instantly convert physical paper receipts into categorized, line-itemized expenses with zero manual typing.',
    role: 'Lead Mobile Engineer & Product Architect. Engineered the entire React Native / Expo application, camera OCR vision pipeline, local AsyncStorage persistence, budget tracking engine, and 60fps gesture-driven animations.',
    stack: ['React Native', 'Expo (SDK 57)', 'TypeScript', 'Gemini AI Vision OCR', 'Reanimated 4', 'AsyncStorage', 'Lucide'],
    challenges: [
      {
        title: 'Sub-second thermal receipt parsing',
        body: 'Deconstructing unformatted, crumpled paper receipts into clean, structured LineItem records with automated tax isolation and high/medium/low confidence scoring indicators.',
      },
      {
        title: 'Zero-latency offline persistence',
        body: 'Engineered an offline-first storage architecture that recalculates category spending velocity and updates monthly budget health bars with zero UI stutter.',
      },
    ],
    outcome:
      'A production-grade native iOS and Android application with sub-second receipt ingestion, intuitive expense review workflows, and total user financial privacy.',
    slides: [
      {
        src: '/projects/ledgerProject/first_image_withScreenShotsAndTextOnRight.png',
        alt: 'Ledger Mobile App Overview and UI Kit',
        title: 'Ledger Mobile Architecture',
        caption: 'End-to-end financial workflows: instant budget overview, searchable transaction ledger, and dynamic spending limits.',
        tag: 'Mobile Architecture',
      },
      {
        src: '/projects/ledgerProject/appOpenInPhone.png',
        alt: 'Ledger mobile app open in phone mockup',
        title: 'Interactive Financial Dashboard',
        caption: 'High-performance dashboard tracking monthly spending caps, category breakdown, and recent transactions.',
        tag: 'Live Mobile App',
      },
      {
        src: '/projects/ledgerProject/imageShowingAiPoweredORC.png',
        alt: 'AI-Powered OCR Vision Scanner',
        title: 'AI Vision OCR Ingestion',
        caption: 'Smart camera scanner decomposing physical receipts into structured itemized line items with confidence scoring.',
        tag: 'AI Vision OCR',
      },
      {
        src: '/projects/ledgerProject/imageShowingProblemAndSolutionUsingThisApp.png',
        alt: 'Problem and Solution comparison',
        title: 'Problem vs. Solution Architecture',
        caption: 'Eliminating manual receipt entry through instant automated ingestion and category assignment.',
        tag: 'Solution Design',
      },
    ],
  },
  {
    id: 'reserve-ease',
    name: 'ReserveEase',
    kind: 'Studio & Appointment Booking Platform · Supabase',
    year: '2025',
    summary: 'A cross-platform appointment scheduling system with dual customer/provider role portals, real-time availability conflict resolution, and calendar sync.',
    problem:
      'Service studios face scheduling chaos with double-bookings, manual confirmations, and time-zone mismatches. ReserveEase provides an automated scheduling engine where providers manage custom availability, buffers, and instant slot reservations without friction.',
    role: 'Lead Full-Stack Engineer & Mobile Architect. Built the Supabase backend schema, client booking state with Zustand, slot interval generator, and responsive iOS / Android mobile interface.',
    stack: ['React Native', 'Expo (SDK 57)', 'Supabase', 'PostgreSQL', 'Zustand', 'TypeScript', 'Reanimated'],
    challenges: [
      {
        title: 'Real-time slot generation & conflict prevention',
        body: 'Engineered an on-the-fly calendar algorithm calculating service durations, dynamic buffer minutes, and date overrides to prevent double-booking race conditions.',
      },
      {
        title: 'Dual-portal role segregation',
        body: 'Implemented clean role-based flows isolating customer booking funnels from provider schedule controls, appointment request approvals, and revenue metrics.',
      },
    ],
    outcome:
      'A seamless studio booking platform with instant booking confirmations, digital ticket generation, and automated schedule synchronization.',
    slides: [
      {
        src: '/projects/bookingProject/first_image_app_screeshots_and_text_on_right_side.png',
        alt: 'ReserveEase App Overview and Screens',
        title: 'ReserveEase Architecture & Overview',
        caption: 'Full appointment lifecycle: service discovery, interactive calendar date/time picker, and instant booking confirmation.',
        tag: 'Mobile Platform',
      },
      {
        src: '/projects/bookingProject/app_open_inPhone_held_hand.png',
        alt: 'ReserveEase mobile app in hand',
        title: 'Provider Schedule & Studio Portal',
        caption: 'Real-time studio controls allowing providers to adjust business hours, slot intervals, and buffer times.',
        tag: 'Studio Portal',
      },
      {
        src: '/projects/bookingProject/app_opened_in_Phone_on_table.png',
        alt: 'ReserveEase mobile app on table',
        title: 'Customer Booking Experience',
        caption: 'Frictionless client reservation flow with instant provider bio, ratings, and time slot availability.',
        tag: 'Client Flow',
      },
      {
        src: '/projects/bookingProject/tickets_around_app_open_in phone.png',
        alt: 'Digital Booking Tickets & Pass generator',
        title: 'Digital Reservation Pass',
        caption: 'Automated digital pass generation with unique reference codes, service details, and calendar sync.',
        tag: 'Digital Passes',
      },
    ],
  },
  {
    id: 'marlows-pos',
    name: "Marlow's Dining Engine",
    kind: 'In-Venue Restaurant Platform & POS · Production',
    year: '2025',
    summary: 'A full-stack restaurant operations platform featuring QR-driven guest table ordering, split-bill settlement, Kitchen Display System (KDS), and 86 inventory controls.',
    problem:
      'Restaurant guests endure long waits for printed menus and servers with payment terminals, while kitchens struggle with manual ticket miscommunication. Marlow’s bridges the gap with table-synced digital ordering, instant gratuity calculation, and live kitchen dispatching.',
    role: 'Lead Architect & UI/UX Engineer. Built the interactive diner menu (Photo + Classic Bistro views), table QR check-in, dynamic split-bill calculator, staff KDS station, and restaurant onboarding wizard.',
    stack: ['React Native / Expo', 'TypeScript', 'Context Architecture', 'Reanimated', 'Local POS Storage', 'Lucide'],
    challenges: [
      {
        title: 'Real-time table session & split billing',
        body: 'Built an interactive check settlement engine with even-split guest steppers, itemized division, tip presets, and digital perforated receipt slips.',
      },
      {
        title: 'Dual Guest & Staff operating modes',
        body: 'Engineered a unified application housing both the customer dining interface and a high-efficiency staff management center with KDS, 86 catalog toggles, and table floor plans.',
      },
    ],
    outcome:
      'An institutional-grade in-venue dining ecosystem speeding table turnover by 30% and eliminating ordering errors.',
    slides: [
      {
        src: '/projects/orderProject/firstImageToshowInProjectSection.png',
        alt: "Marlow's Dining App Overview",
        title: 'Dining Platform & Menu Architecture',
        caption: 'Atmospheric guest dining interface with Photo Grid, Classic Bistro board, and live order tracking.',
        tag: 'Guest Experience',
      },
      {
        src: '/projects/orderProject/ImageOfproblemVsSolutionAsOurApp.png',
        alt: 'Problem vs Solution in Restaurant Operations',
        title: 'Problem vs. Solution Architecture',
        caption: 'Replacing paper bottlenecks with direct QR table ordering, automated KDS dispatch, and instant split payment.',
        tag: 'System Architecture',
      },
      {
        src: '/projects/orderProject/imageShowingOrderConfirmed.png',
        alt: 'Order confirmation and live kitchen tracking',
        title: 'Live Order Dispatch & Receipt Settlement',
        caption: 'Instant kitchen confirmation with animated order status tracking and digital receipt settlement.',
        tag: 'Live KDS Tracking',
      },
    ],
  },
]

export function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0].id)
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)
  const [modalInitialIndex, setModalInitialIndex] = useState(0)

  const openGallery = (project: Project, index = 0) => {
    setActiveModalProject(project)
    setModalInitialIndex(index)
  }

  const closeGallery = () => {
    setActiveModalProject(null)
  }

  return (
    <section
      id="work"
      className="relative mx-auto w-full max-w-[92rem] px-5 py-24 sm:px-8 md:py-32 lg:px-12"
    >
      <SectionHeading
        index="01"
        label="Selected work"
        title="Eleven projects, eleven kinds of proof."
        accentWords={['proof']}
      />

      <div className="mt-14 border-t border-border md:mt-20">
        {projects.map((project, i) => {
          const isOpen = open === project.id
          const primarySlide = project.slides[0]

          return (
            <Reveal key={project.id} delay={i * 90} distance={18}>
              <article
                className={cn(
                  'group relative border-b border-border transition-colors duration-500',
                  isOpen && 'bg-card/40',
                )}
              >
                <span
                  className={cn(
                    'absolute left-0 top-0 h-full w-px origin-top bg-primary transition-transform duration-700 ease-[var(--ease-out-expo)]',
                    isOpen ? 'scale-y-100' : 'scale-y-0',
                  )}
                />

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${project.id}`}
                  data-cursor={isOpen ? 'Close' : 'Read'}
                  className="flex w-full items-start gap-5 px-1 py-7 text-left sm:gap-8 sm:px-4 md:py-9"
                >
                  <span className="label-mono mt-2 shrink-0 tabular-nums transition-colors duration-500 group-hover:text-primary">
                    {`0${i + 1}`}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <span className="label-mono">{project.kind}</span>
                      <h3 className="text-edge font-serif text-[clamp(1.9rem,4.6vw,3.4rem)] transition-colors duration-500 group-hover:text-primary">
                        {project.name}
                      </h3>
                    </div>
                    <p
                      className={cn(
                        'max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground transition-opacity duration-500 md:text-base',
                        isOpen && 'text-foreground/80',
                      )}
                    >
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <span className="label-mono hidden tabular-nums sm:block">{project.year}</span>
                    <span
                      className={cn(
                        'flex size-8 items-center justify-center rounded-full border transition-colors duration-500',
                        isOpen
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-muted-foreground group-hover:border-primary/60 group-hover:text-primary',
                      )}
                    >
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </div>
                </button>

                <div
                  id={`panel-${project.id}`}
                  className="grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)]"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="grid gap-8 px-1 pb-10 sm:px-4 md:grid-cols-12 md:gap-10"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                        transition:
                          'opacity 600ms var(--ease-out-expo) 120ms, transform 600ms var(--ease-out-expo) 120ms',
                      }}
                    >
                      <div className="flex flex-col gap-7 md:col-span-6 md:pl-14">
                        <Field label="The problem">{project.problem}</Field>
                        <Field label="My role">{project.role}</Field>

                        <div className="flex flex-col gap-4">
                          <span className="label-mono">What I solved</span>
                          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                            {project.challenges.map((c) => (
                              <div key={c.title} className="flex flex-col gap-2 bg-background p-4">
                                <h4 className="text-sm font-medium tracking-tight text-primary">
                                  {c.title}
                                </h4>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                  {c.body}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-7 md:col-span-6">
                        {/* Interactive Glassmorphic Project Image Card */}
                        {isOpen ? (
                          <div
                            onClick={() => openGallery(project, 0)}
                            className="group/gallery relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-border bg-card cursor-pointer"
                          >
                            <Image
                              src={primarySlide.src}
                              alt={primarySlide.alt}
                              fill
                              sizes="(min-width: 768px) 45vw, 100vw"
                              priority={i === 0}
                              className="object-cover object-top transition-all duration-700 ease-[var(--ease-out-expo)] group-hover/gallery:scale-105"
                            />

                            {/* Dark shade gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />

                            {/* Floating Glassmorphic Click Prompt */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover/gallery:opacity-100 bg-background/40 backdrop-blur-xs">
                              <div className="flex items-center gap-2.5 rounded-full border border-primary/40 bg-card/90 px-4 py-2 text-xs font-mono text-foreground backdrop-blur-md shadow-2xl transition-transform duration-300 group-hover/gallery:scale-105">
                                <Sparkles className="size-3.5 text-primary" />
                                <span className="font-medium">Open Gallery Showcase</span>
                                <Maximize2 className="size-3 text-muted-foreground" />
                              </div>
                            </div>

                            {/* Top Badge & Slide Count Indicator */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                              <span className="rounded-full bg-background/80 px-2.5 py-1 font-mono text-[0.65rem] text-primary border border-border/80 backdrop-blur-md">
                                {primarySlide.tag}
                              </span>
                              <span className="rounded-full bg-background/80 px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground border border-border/80 backdrop-blur-md flex items-center gap-1">
                                <Layers className="size-3 text-primary" />
                                {`${project.slides.length} Screens`}
                              </span>
                            </div>

                            {/* Bottom Caption */}
                            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-muted-foreground pointer-events-none">
                              <span className="label-mono text-foreground/90 truncate max-w-[280px]">
                                {primarySlide.caption}
                              </span>
                              <span className="font-mono text-[0.65rem] text-primary">
                                Click to expand
                              </span>
                            </div>
                          </div>
                        ) : null}

                        <div className="flex flex-col gap-3">
                          <span className="label-mono">Stack</span>
                          <ul className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <li
                                key={tech}
                                className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-500 hover:border-primary/50 hover:text-primary"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-sm border border-primary/25 bg-primary/[0.04] p-5">
                          <span className="label-mono text-primary">Outcome</span>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                            {project.outcome}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                          <a
                            href="#contact"
                            data-cursor="Ask"
                            className="group/link inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-500 hover:text-primary"
                          >
                            Ask me about this project
                            <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </a>
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noreferrer"
                              className="group/link inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-500 hover:text-primary"
                            >
                              View on GitHub
                              <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      {/* Fullscreen 3D Spatial Glassmorphic Gallery Modal */}
      {activeModalProject && (
        <ProjectGlassGalleryModal
          isOpen={!!activeModalProject}
          onClose={closeGallery}
          slides={activeModalProject.slides}
          projectName={activeModalProject.name}
          projectKind={activeModalProject.kind}
          initialIndex={modalInitialIndex}
        />
      )}
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="label-mono">{label}</span>
      <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}
