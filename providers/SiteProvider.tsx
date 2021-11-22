import {
  Analytics,
  getAnalytics,
  logEvent as nativeLogEvent,
} from 'firebase/analytics'
import { createContext, FC, useContext, useMemo } from 'react'

type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never
type SiteEventLoggerParams = DropFirst<Parameters<typeof nativeLogEvent>>
type Context = {
  state: {
    analytics: null | Analytics
  }
  actions: {
    logEvent: (...params: SiteEventLoggerParams) => void
  }
}

const SiteContext = createContext<Context>({
  state: {
    analytics: null,
  },
  actions: {
    logEvent: () => {},
  },
})

const SiteProvider: FC = ({ children }) => {
  const { logEvent, analytics } = useMemo(() => {
    const analytics = typeof window === 'undefined' ? null : getAnalytics()
    if (analytics) {
      return {
        analytics,
        logEvent: (...params: SiteEventLoggerParams) => {
          nativeLogEvent(analytics, ...params)
        },
      }
    }
    return {
      analytics: null,
      logEvent: () => {},
    }
  }, [])
  return (
    <SiteContext.Provider
      value={{ state: { analytics }, actions: { logEvent } }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export const useSiteContext = () => useContext(SiteContext)
export default SiteProvider
