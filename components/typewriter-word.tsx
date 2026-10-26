'use client'

import { useEffect, useState } from 'react'

/**
 * Typewriter that cycles through `words`: types each one character by character,
 * holds it, deletes it, then moves to the next. The caret is decorative
 * (aria-hidden) and the whole effect is disabled under prefers-reduced-motion,
 * where the first word simply renders statically.
 */
export function TypewriterWord({ words, className }: { words: string[]; className?: string }) {
  const [reduced, setReduced] = useState(false)
  const [wordIdx, setWordIdx] = useState(0)
  const [text, setText] = useState(words[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
    }
  }, [])

  useEffect(() => {
    if (reduced) return
    const word = words[wordIdx]
    const delay = !deleting && text === word ? 1800 : deleting && text === '' ? 300 : deleting ? 40 : 90
    const id = window.setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setWordIdx((i) => (i + 1) % words.length)
      } else if (deleting) {
        setText(word.slice(0, text.length - 1))
      } else {
        setText(word.slice(0, text.length + 1))
      }
    }, delay)
    return () => window.clearTimeout(id)
  }, [text, deleting, wordIdx, words, reduced])

  if (reduced) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] bg-primary motion-safe:animate-pulse"
      />
    </span>
  )
}
