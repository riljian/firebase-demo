import { getApps } from '@firebase/app'
import { getMessaging, onMessage } from '@firebase/messaging'
import { CssBaseline } from '@mui/material'
// TODO: adopt issue update https://github.com/firebase/firebaseui-web/issues/901
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import type { AppProps } from 'next/app'
import { config } from '../configs/firebase'
import AuthProvider from '../providers/AuthProvider'
import SiteProvider from '../providers/SiteProvider'

const App = ({ Component, pageProps }: AppProps) => {
  if (getApps().length === 0) {
    firebase.initializeApp(config)
    const messaging = getMessaging()
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
    })
  }

  return (
    <SiteProvider>
      <AuthProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </AuthProvider>
    </SiteProvider>
  )
}

export default App
