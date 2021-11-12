import { Box, Container, Stack } from '@mui/material'
import {
  addDoc,
  collection,
  CollectionReference,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import AuthGuard from '../../components/AuthGuard'
import ChatForm from '../../components/ChatForm'
import ChatMessages, { Message } from '../../components/ChatMessages'
import { useAuthContext } from '../../providers/auth'

type State = {
  messages: Message[]
  messageCollectionRef: CollectionReference | null
}

const initialState: State = {
  messages: [],
  messageCollectionRef: null,
}

const useChatRoom = (chatRoomId?: string) => {
  const {
    state: { me },
  } = useAuthContext()
  const [state, setState] = useState(() => initialState)
  const { leaveMessage } = useMemo(() => {
    const colRef = state.messageCollectionRef
    if (!me || !colRef) {
      return { leaveMessage: () => Promise.reject('Uninitialized') }
    }
    return {
      leaveMessage: (message: string) =>
        addDoc(colRef, {
          message,
          sender: me.uid,
          timestamp: serverTimestamp(),
        }).then(() => {}),
    }
  }, [me, state.messageCollectionRef])

  useEffect(() => {
    if (!chatRoomId) {
      return
    }
    const messageCollectionRef = collection(
      getFirestore(),
      `chat_rooms/${chatRoomId}/messages`
    )
    setState((s) => ({ ...s, messageCollectionRef }))
    const q = query(
      messageCollectionRef,
      orderBy('timestamp', 'desc'),
      limit(10)
    )
    return onSnapshot(q, (snapshot) => {
      const messages: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, 'id'>),
      }))
      setState((s) => ({ ...s, messages: messages.reverse() }))
    })
  }, [chatRoomId])

  return {
    state,
    actions: {
      leaveMessage,
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