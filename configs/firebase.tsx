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
  appId: '1:349188567153:web:40637fb458cac31161abd0',
  measurementId: 'G-QB8PW4M2TG',
  messagingSenderId: '349188567153',
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
