import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function Marquee<T>({
  items,
  renderItem,
  duration = '38s',
  className,
  trackClassName,
}: {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  duration?: string
  className?: string
  trackClassName?: string
}) {
  const track = (copy: 'a' | 'b') => (
    <div
      className={cn(
        'flex shrink-0 items-center',
        copy === 'b' && 'motion-reduce:hidden',
        trackClassName,
      )}
      aria-hidden={copy === 'b' || undefined}
    >
      {items.map((item, i) => (
        <span key={`${copy}-${i}`} className="contents">
          {renderItem(item, i)}
        </span>
      ))}
    </div>
  )

  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div
        className="flex w-max shrink-0 motion-safe:animate-[marquee-x_38s_linear_infinite] motion-safe:group-hover:[animation-play-state:paused] motion-reduce:flex-wrap motion-reduce:animate-none"
        style={{ animationDuration: duration }}
      >
        {track('a')}
        {track('b')}
      </div>
    </div>
  )
}
