import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signOut,
  User,
} from '@firebase/auth'
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type State = {
  me: User | null
  firebaseAuth: Auth | null
}
type Context = {
  state: State & {
    isSigned: boolean
  }
  actions: {
    signOut: () => void
  }
}

const initialState: State = {
  me: null,
  firebaseAuth: null,
}
const AuthContext = createContext<Context>({
  state: { ...initialState, isSigned: false },
  actions: {
    signOut: () => {},
  },
})

const AuthProvider: FC = ({ children }) => {
  const [{ me, firebaseAuth }, setState] = useState(() => ({
    ...initialState,
    firebaseAuth: getAuth(),
  }))
  const { actions } = useMemo(
    () => ({
      actions: {
        signOut: () => {
          if (firebaseAuth) {
            signOut(firebaseAuth)
              .then(() => {
                setState((s) => ({ ...s, me: null }))
              })
              .catch((error) => {
                console.error(error)
              })
          }
        },
      },
    }),
    [firebaseAuth]
  )

  useEffect(() => {
    if (firebaseAuth) {
      return onAuthStateChanged(firebaseAuth, (user) => {
        setState((s) => ({ ...s, me: user }))
      })
    }
  }, [firebaseAuth])

  return (
    <AuthContext.Provider
      value={{ state: { me, firebaseAuth, isSigned: !!me }, actions }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
export default AuthProvider
