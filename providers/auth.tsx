import { createContext, FC, useContext, useMemo, useState } from 'react'

type User = {}

type State = {
  me: User | null
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
}
const AuthContext = createContext<Context>({
  state: { ...initialState, isSigned: false },
  actions: {
    signOut: () => {},
  },
})

const AuthProvider: FC = ({ children }) => {
  const [{ me }, setState] = useState(() => ({
    ...initialState,
  }))
  const { actions } = useMemo(
    () => ({
      actions: {
        signOut: () => {},
      },
    }),
    []
  )

  return (
    <AuthContext.Provider value={{ state: { me, isSigned: !!me }, actions }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
export default AuthProvider
