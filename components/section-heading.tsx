import { DrawRule, Reveal, RevealWords } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function SectionHeading({
  index,
  label,
  title,
  accentWords = [],
  className,
}: {
  index: string
  label: string
  title: string
  accentWords?: string[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-5 sm:gap-6', className)}>
      <Reveal className="flex items-center gap-3.5" distance={14}>
        <span className="flex size-6 items-center justify-center rounded-sm bg-primary/10 border border-primary/30 font-mono text-xs font-bold text-primary">
          {index}
        </span>
        <span className="label-mono uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      </Reveal>
      <DrawRule delay={80} />
      <h2 className="text-edge max-w-[26ch] font-serif text-[clamp(2.2rem,5.8vw,4.5rem)] font-normal leading-[1.08] tracking-tight">
        <RevealWords text={title} accentWords={accentWords} />
      </h2>
    </div>
  )
}
