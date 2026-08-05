'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type MediaFrameProps = {
  src: string
  alt: string
  caption?: string
  /** Skip lazy-loading for imagery that is already in view. */
  priority?: boolean
  className?: string
  sizes?: string
}

/**
 * Framed project imagery with a real per-image loading state: a shimmering
 * skeleton holds the exact aspect ratio so nothing shifts when the file lands.
 */
export function MediaFrame({
  src,
  alt,
  caption,
  priority = false,
  className,
  sizes = '(min-width: 768px) 55vw, 100vw',
}: MediaFrameProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <figure className={cn('flex flex-col gap-3', className)}>
      <div className="group/media relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-border bg-card">
        {/* skeleton + shimmer */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            loaded ? 'opacity-0' : 'opacity-100',
          )}
        >
          <div className="absolute inset-0 bg-card" />
          <div className="absolute inset-0 motion-safe:animate-[shimmer_1.6s_ease-in-out_infinite] bg-[linear-gradient(100deg,transparent_20%,var(--color-muted)_50%,transparent_80%)] bg-[length:220%_100%]" />
          <span className="label-mono absolute bottom-3 left-4">Loading preview</span>
        </div>

        <Image
          src={src || '/placeholder.svg'}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          onLoad={() => setLoaded(true)}
          className={cn(
            'object-cover transition-all duration-[900ms] ease-[var(--ease-out-expo)]',
            'group-hover/media:scale-[1.03]',
            loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-md',
          )}
        />

        {/* keeps imagery sitting inside the dark palette instead of punching out of it */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--background)_2%,transparent_45%)] opacity-80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/[0.06]"
        />
      </div>

      {caption ? (
        <figcaption className="label-mono flex items-center gap-2">
          <span className="h-px w-6 bg-primary" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
