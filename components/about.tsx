import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const facts = [
  { k: 'Role', v: 'React Native / React Developer' },
  { k: 'Focus', v: 'Cross-platform apps, dashboards, API integration' },
  { k: 'Education', v: 'BS Software Engineering — Virtual University of Pakistan (Recently Graduated)' },
  { k: 'Engagements', v: 'Contract, retainer, or project-based' },
  { k: 'Working hours', v: '07:00 – 23:00 UTC+5 (flexible for calls)' },
  { k: 'Languages', v: 'English, Urdu' },
]

const principles = [
  {
    title: 'Ship, then refine',
    body: 'I get a working vertical slice in front of you early, then harden it. You see progress weekly, not at the end.',
  },
  {
    title: 'Typed end to end',
    body: 'TypeScript across the client and the API contract. Fewer runtime surprises, faster handovers.',
  },
  {
    title: 'Plugs into your stack',
    body: 'Give me a Swagger spec or a staging URL and I will wire it up — no hand-holding, no rewrites of your backend.',
  },
]

export function About() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-[92rem] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <SectionHeading index="02" label="About" title="A developer who takes the whole problem." accentWords={['whole']} />

      <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-7">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-foreground/90 md:text-xl">
              I am a recently graduated Software Engineer who has been working as a professional
              React Native and React developer at a software house, with freelance work running
              alongside it. That mix means I write code that goes into real releases, on real
              deadlines, reviewed by real teams.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              Most of what I do sits where design meets integration: taking a product idea or a
              Figma file, building it in React Native or React with TypeScript, and connecting it to
              whatever backend already exists — Firebase, a Node/Express service, or a documented
              REST API. I care about the parts clients notice later: predictable state, honest
              loading and error states, and builds that survive the app store review.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              Having recently graduated, I am building my practice around remote international clients — teams
              that need a dependable front-end and mobile engineer without adding a headcount.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 110}
                className="group relative flex h-full flex-col gap-2.5 bg-background p-5 transition-all duration-300 hover:bg-card hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-6 items-center justify-center rounded bg-primary/10 border border-primary/25 font-mono text-xs font-bold text-primary">
                    {`0${i + 1}`}
                  </span>
                  <span className="h-1 w-6 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-10 group-hover:bg-primary" />
                </div>
                <h3 className="font-serif text-lg font-normal tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120} direction="left" className="md:col-span-5">
          <dl className="flex flex-col rounded-md border border-border overflow-hidden bg-card/20">
            <div className="border-b border-border bg-card/40 px-5 py-3">
              <span className="label-mono uppercase text-xs tracking-wider text-primary">Key Profile Facts</span>
            </div>
            {facts.map((f) => (
              <div
                key={f.k}
                className="group flex flex-col gap-1 border-b border-border/80 px-5 py-3.5 transition-colors duration-200 last:border-0 hover:bg-card sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="label-mono text-xs text-muted-foreground transition-colors group-hover:text-primary shrink-0">{f.k}</dt>
                <dd className="text-sm font-medium leading-relaxed text-foreground/90 sm:text-right">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
