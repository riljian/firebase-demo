import { Box, Container, Stack } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import AuthGuard from '../../components/AuthGuard'
import ChatForm from '../../components/ChatForm'
import ChatMessages from '../../components/ChatMessages'

const initialState = {
  messages: [],
}

const useChatRoom = (chatRoomId: string) => {
  const [state, setState] = useState(() => initialState)
  const leaveMessage = useCallback((message) => {
    console.log(message)
    return Promise.resolve()
  }, [])

  return {
    state,
    actions: {
      leaveMessage: leaveMessage,
    },
  }
}

const ChatRoom: NextPage = () => {
  const router = useRouter()
  const { rid } = router.query
  const {
    state: { messages },
    actions: { leaveMessage },
  } = useChatRoom(rid as string)

  return (
    <AuthGuard>
      <Container sx={{ height: '100vh', py: 2, display: 'flex' }}>
        <Stack flexGrow={1} spacing={2}>
          <Box flexGrow={1} sx={{ overflow: 'auto' }}>
            <ChatMessages messages={messages} />
          </Box>
          <ChatForm leaveMessage={leaveMessage} />
        </Stack>
      </Container>
    </AuthGuard>
  )
}

export default ChatRoom
