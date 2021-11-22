import { ClassNames } from '@emotion/react'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'
import { useAuthContext } from '../providers/AuthProvider'

export type Message = {
  id: string
  sender: string
  message: string
  type: 'text' | 'file'
  timestamp: {
    seconds: number
    nanoseconds: number
  }
}
type Props = {
  messages: Message[]
}
type MessageProps = Pick<Message, 'message' | 'type'> & {
  backgroundColor?: string
  color?: string
  justifyContent?: string
}

const Message: FC<MessageProps> = ({
  message,
  type,
  backgroundColor,
  color,
  justifyContent,
}) => (
  <Box sx={{ display: 'flex', justifyContent }}>
    <Box
      sx={{
        px: 2,
        py: 1,
        color,
        backgroundColor,
        borderRadius: '25px',
        maxWidth: {
          xs: '80%',
          sm: '40%',
        },
      }}
    >
      {type === 'text' && <Typography variant="body2">{message}</Typography>}
      {type === 'file' && (
        <ClassNames>
          {({ css }) => (
            <Image
              src={message}
              alt="sample image"
              className={css({ maxHeight: '100px', maxWidth: '100%' })}
            />
          )}
        </ClassNames>
      )}
    </Box>
  </Box>
)

const ChatMessages: FC<Props> = ({ messages }) => {
  const {
    state: { me },
  } = useAuthContext()
  return (
    <Stack spacing={2}>
      {messages.map(({ id, message, sender, type }) => {
        const isMessageFromMe = me && me.uid === sender
        return isMessageFromMe ? (
          <Message
            key={id}
            message={message}
            type={type}
            justifyContent="flex-end"
            color="white"
            backgroundColor="#0b93f6"
          />
        ) : (
          <Message
            key={id}
            message={message}
            type={type}
            backgroundColor="#e5e5ea"
          />
        )
      })}
    </Stack>
  )
}

export default ChatMessages
