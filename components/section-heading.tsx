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
    <div className={cn('flex flex-col gap-6', className)}>
      <Reveal className="flex items-center gap-4" distance={14}>
        <span className="label-mono text-primary">{index}</span>
        <span className="label-mono">{label}</span>
      </Reveal>
      <DrawRule delay={80} />
      <h2 className="text-edge max-w-[26ch] font-serif text-[clamp(2.25rem,6vw,4.75rem)]">
        <RevealWords text={title} accentWords={accentWords} />
      </h2>
    </div>
  )
}
