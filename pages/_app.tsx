import { getApps } from '@firebase/app'
import { CssBaseline } from '@mui/material'
// TODO: adopt issue update https://github.com/firebase/firebaseui-web/issues/901
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import type { AppProps } from 'next/app'
import { config } from '../configs/firebase'
import AuthProvider from '../providers/auth'

const App = ({ Component, pageProps }: AppProps) => {
  if (getApps().length === 0) {
    firebase.initializeApp(config)
  }

  return (
    <AuthProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
