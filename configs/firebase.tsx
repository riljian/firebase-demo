import { FirebaseOptions } from '@firebase/app'
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  PhoneAuthProvider,
} from '@firebase/auth'
import firebaseui from 'firebaseui'

export const config: FirebaseOptions = {
  apiKey: 'AIzaSyDXOnEwTTkXfv7v6YXBw7mzG2FQPhp0J4A',
  authDomain: 'fir-demo-69b11.firebaseapp.com',
  storageBucket: 'fir-demo-69b11.appspot.com',
  projectId: 'fir-demo-69b11',
}
export const uiConfig: firebaseui.auth.Config = {
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
    {
      provider: PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        size: 'invisible',
      },
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
}
