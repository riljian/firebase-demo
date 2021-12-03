importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyDXOnEwTTkXfv7v6YXBw7mzG2FQPhp0J4A',
  authDomain: 'fir-demo-69b11.firebaseapp.com',
  storageBucket: 'fir-demo-69b11.appspot.com',
  projectId: 'fir-demo-69b11',
  appId: '1:349188567153:web:40637fb458cac31161abd0',
  measurementId: 'G-QB8PW4M2TG',
  messagingSenderId: '349188567153',
})

firebase.messaging().onBackgroundMessage((payload) => {
  self.registration.showNotification('Background Message title', {
    body: 'Background Message body',
  })
})
