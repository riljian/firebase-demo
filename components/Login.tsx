// noinspection JSUnusedGlobalSymbols

import 'firebaseui/dist/firebaseui.css'
import { useEffect } from 'react'
import { uiConfig } from '../configs/firebase'
import { useAuthContext } from '../providers/AuthProvider'

const firebaseUIContainerId = 'firebaseui-auth-container'

const Login = () => {
  const {
    state: { firebaseAuth, isSigned },
  } = useAuthContext()

  useEffect(() => {
    if (firebaseAuth && !isSigned) {
      import('firebaseui')
        .then((firebaseui) => {
          const ui =
            firebaseui.auth.AuthUI.getInstance() ||
            new firebaseui.auth.AuthUI(firebaseAuth)
          const container = document.querySelector(`#${firebaseUIContainerId}`)
          if (container) {
            ui.start(container, uiConfig)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [firebaseAuth, isSigned])

  return <div id={firebaseUIContainerId} />
}

export default Login
