import { FirebaseOptions } from '@firebase/app'
import { GoogleAuthProvider } from '@firebase/auth'
import firebaseui from 'firebaseui'

export const config: FirebaseOptions = {
  apiKey: 'AIzaSyDXOnEwTTkXfv7v6YXBw7mzG2FQPhp0J4A',
  authDomain: 'fir-demo-69b11.firebaseapp.com',
  projectId: 'fir-demo-69b11',
}
export const uiConfig: firebaseui.auth.Config = {
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
}
