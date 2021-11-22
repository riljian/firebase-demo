import { getAnalytics, logEvent as nativeLogEvent } from 'firebase/analytics'
import { createContext, FC, useContext, useMemo } from 'react'

type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never
type SiteEventLoggerParams = DropFirst<Parameters<typeof nativeLogEvent>>
type Context = {
  state: {}
  actions: {
    logEvent: (...params: SiteEventLoggerParams) => void
  }
}

const SiteContext = createContext<Context>({
  state: {},
  actions: {
    logEvent: () => {},
  },
})

const SiteProvider: FC = ({ children }) => {
  const { logEvent } = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        logEvent: () => {},
      }
    }
    const analytics = getAnalytics()
    return {
      logEvent: (...params: SiteEventLoggerParams) => {
        nativeLogEvent(analytics, ...params)
      },
    }
  }, [])
  return (
    <SiteContext.Provider value={{ state: {}, actions: { logEvent } }}>
      {children}
    </SiteContext.Provider>
  )
}

export const useSiteContext = () => useContext(SiteContext)
export default SiteProvider
