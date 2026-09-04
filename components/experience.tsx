import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const entries = [
  {
    period: 'Current',
    role: 'React Native / React Developer',
    org: 'Software house · full-time',
    body: 'Building and maintaining client-facing mobile apps and business dashboards inside a delivery team — feature work, code review, and release cycles on codebases that are already in production.',
    points: [
      'Ship React Native features against real deadlines and real QA',
      'Maintain a live Flutter POS product across desktop and mobile targets',
      'Integrate front-ends with documented REST services and Firebase backends',
    ],
  },
  {
    period: '2024 — now',
    role: 'Freelance Developer',
    org: 'Independent · remote',
    body: 'Direct client work alongside the full-time role: mobile apps, dashboards, API integration, and a commercial React Native template sold as a product.',
    points: [
      'Scope, build and hand off complete projects solo',
      'Designed and sold SwiftBite, a React Native food-delivery UI kit',
      'Comfortable owning communication, estimates and delivery',
    ],
  },
  {
    period: 'Recently Graduated',
    role: 'BS Software Engineering',
    org: 'Virtual University of Pakistan',
    body: 'Recently graduated with a BS in Software Engineering, completing TaskFlow — a full-stack Next.js, Express and MongoDB application — as the capstone graduation project. Studying while working professionally has instilled treating every deadline and release as production-critical.',
    points: [],
  },
]

export function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-[92rem] px-5 py-24 sm:px-8 md:py-32 lg:px-12"
    >
      <SectionHeading
        index="04"
        label="Experience"
        title="Employed, freelancing, and finishing a degree."
        accentWords={['freelancing']}
      />

      <div className="mt-14 md:mt-20">
        {entries.map((entry, i) => (
          <Reveal key={entry.role} delay={i * 110}>
            <div className="group relative grid gap-6 border-t border-border py-8 sm:py-10 transition-all duration-300 last:border-b hover:bg-card/30 md:grid-cols-12 md:gap-10 md:py-12 md:px-4 rounded-sm">
              <div className="flex items-start gap-3 md:col-span-3">
                <span className="mt-1.5 flex size-2 shrink-0 rounded-full bg-border transition-all duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(198,255,71,0.6)]" />
                <span className="label-mono font-bold tracking-wider text-primary">{entry.period}</span>
              </div>

              <div className="md:col-span-5">
                <h3 className="text-edge font-serif text-[clamp(1.6rem,3vw,2.3rem)] font-normal transition-colors duration-300 group-hover:text-primary">
                  {entry.role}
                </h3>
                <div className="mt-2 inline-flex items-center gap-2">
                  <span className="rounded bg-secondary/80 px-2 py-0.5 font-mono text-xs text-muted-foreground border border-border/60">
                    {entry.org}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:col-span-4">
                <p className="text-pretty leading-relaxed text-sm text-foreground/80 md:text-base">{entry.body}</p>
                {entry.points.length > 0 && (
                  <ul className="flex flex-col gap-2 mt-1">
                    {entry.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
