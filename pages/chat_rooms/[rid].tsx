import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage'
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
type MessageWrapper = Omit<Message, 'id'>

const initialState: State = {
  messages: [],
  messageCollectionRef: null,
}

const messageWrapperLoader = async (
  messageWrapper: MessageWrapper & { id: string }
) => {
  const { type, message } = messageWrapper
  if (type === 'text') {
    return messageWrapper
  }
  return {
    ...messageWrapper,
    message: await getDownloadURL(ref(getStorage(), message)),
  }
}

const useChatRoom = (chatRoomId?: string) => {
  const {
    state: { me },
  } = useAuthContext()
  const [state, setState] = useState(() => initialState)
  const { leaveMessage, sendFile } = useMemo(() => {
    const colRef = state.messageCollectionRef
    if (!me || !colRef) {
      const reject = () => Promise.reject('Uninitialized')
      return { leaveMessage: reject, sendFile: reject }
    }
    return {
      leaveMessage: async (message: string) => {
        await addDoc(colRef, {
          message,
          sender: me.uid,
          type: 'text',
          timestamp: serverTimestamp(),
        })
      },
      sendFile: async (file: File) => {
        const filename = file.name
        await uploadBytes(ref(getStorage(), filename), file)
        await addDoc(colRef, {
          message: filename,
          sender: me.uid,
          type: 'file',
          timestamp: serverTimestamp(),
        })
      },
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
    return onSnapshot(q, async (snapshot) => {
      const messageWrappers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as MessageWrapper),
      }))
      const messages: Message[] = await Promise.all(
        messageWrappers.map((wrapper) => messageWrapperLoader(wrapper))
      )
      messages.sort((a, b) => {
        if (!a.timestamp) {
          return 1
        } else if (!b.timestamp) {
          return -1
        } else if (a.timestamp.seconds === b.timestamp.seconds) {
          return a.timestamp.nanoseconds - b.timestamp.nanoseconds
        }
        return a.timestamp.seconds - b.timestamp.seconds
      })
      setState((s) => ({ ...s, messages }))
    })
  }, [chatRoomId])

  return {
    state,
    actions: {
      leaveMessage,
      sendFile,
    },
  }
}

const ChatRoom: NextPage = () => {
  const router = useRouter()
  const { rid } = router.query
  const {
    state: { messages },
    actions: { leaveMessage, sendFile },
  } = useChatRoom(rid as string)

  return (
    <AuthGuard>
      <Container sx={{ height: '100vh', py: 2, display: 'flex' }}>
        <Stack flexGrow={1} spacing={2}>
          <Box flexGrow={1} sx={{ overflow: 'auto' }}>
            <ChatMessages messages={messages} />
          </Box>
          <ChatForm leaveMessage={leaveMessage} sendFile={sendFile} />
        </Stack>
      </Container>
    </AuthGuard>
  )
}

export default ChatRoom
