import type { NextPage } from 'next'
import JoinChatRoom from '../components/JoinChatRoom'
import Login from '../components/Login'
import { useAuthContext } from '../providers/AuthProvider'

const Home: NextPage = () => {
  const {
    state: { isSigned },
  } = useAuthContext()

  if (isSigned) {
    return <JoinChatRoom />
  }
  return <Login />
}

export default Home
