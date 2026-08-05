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
    period: 'Final year',
    role: 'BS Computer Science',
    org: 'Virtual University of Pakistan',
    body: 'Final-year student, with TaskFlow — a full-stack Next.js, Express and MongoDB application — as the final year project. Studying while working professionally has meant treating every deadline as a real one.',
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
        accentWords={['freelancing,']}
      />

      <div className="mt-14 md:mt-20">
        {entries.map((entry, i) => (
          <Reveal key={entry.role} delay={i * 110}>
            <div className="group relative grid gap-6 border-t border-border py-9 transition-colors duration-500 last:border-b md:grid-cols-12 md:gap-10 md:py-12">
              <div className="flex items-start gap-4 md:col-span-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-border transition-colors duration-500 group-hover:bg-primary" />
                <span className="label-mono">{entry.period}</span>
              </div>

              <div className="md:col-span-5">
                <h3 className="text-edge font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] transition-colors duration-500 group-hover:text-primary">
                  {entry.role}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{entry.org}</p>
              </div>

              <div className="flex flex-col gap-4 md:col-span-4">
                <p className="text-pretty leading-relaxed text-muted-foreground">{entry.body}</p>
                {entry.points.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {entry.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                        <span className="mt-2 h-px w-4 shrink-0 bg-primary/70" />
                        {point}
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
