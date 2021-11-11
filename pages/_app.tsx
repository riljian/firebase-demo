import { getApps, initializeApp } from '@firebase/app'
import type { AppProps } from 'next/app'
import { config } from '../configs/firebase'
import AuthProvider from '../providers/auth'

const App = ({ Component, pageProps }: AppProps) => {
  if (getApps().length === 0) {
    initializeApp(config)
  }

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
