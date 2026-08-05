'use client'

import { useEffect, useState } from 'react'

export const SITE_LOADED_EVENT = 'site:loaded'

/** True once the preloader has begun lifting, so entrance animations stay in sync. */
export function useSiteLoaded() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (document.documentElement.dataset.loaded === 'true') {
      setLoaded(true)
      return
    }
    const onLoaded = () => setLoaded(true)
    window.addEventListener(SITE_LOADED_EVENT, onLoaded)
    return () => window.removeEventListener(SITE_LOADED_EVENT, onLoaded)
  }, [])

  return loaded
}

export function markSiteLoaded() {
  document.documentElement.dataset.loaded = 'true'
  window.dispatchEvent(new Event(SITE_LOADED_EVENT))
}
