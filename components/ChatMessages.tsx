import { Box, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useAuthContext } from '../providers/auth'

export type Message = {
  id: string
  sender: string
  message: string
}
type Props = {
  messages: Message[]
}
type MessageProps = {
  message: string
  backgroundColor?: string
  color?: string
  justifyContent?: string
}

const Message: FC<MessageProps> = ({
  message,
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
      <Typography variant="body2">{message}</Typography>
    </Box>
  </Box>
)

const ChatMessages: FC<Props> = ({ messages }) => {
  const {
    state: { me },
  } = useAuthContext()
  return (
    <Stack spacing={2}>
      {messages.map(({ id, message, sender }) => {
        const isMessageFromMe = me && me.uid === sender
        return isMessageFromMe ? (
          <Message
            key={id}
            message={message}
            justifyContent="flex-end"
            color="white"
            backgroundColor="#0b93f6"
          />
        ) : (
          <Message key={id} message={message} backgroundColor="#e5e5ea" />
        )
      })}
    </Stack>
  )
}

export default ChatMessages
