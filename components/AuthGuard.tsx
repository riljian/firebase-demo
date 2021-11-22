import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { LOGIN_PATH } from '../configs/path'
import { useAuthContext } from '../providers/AuthProvider'

const AuthGuard: FC = ({ children }) => {
  const router = useRouter()
  const {
    state: { isSigned },
  } = useAuthContext()

  useEffect(() => {
    const { push, asPath } = router
    if (!isSigned && asPath !== LOGIN_PATH) {
      push(LOGIN_PATH).catch((error) => {
        console.error(error)
      })
    }
  }, [isSigned, router])

  if (isSigned) {
    return <>{children}</>
  }
  return null
}

export default AuthGuard
