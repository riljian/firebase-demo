import { Box, Button, Stack, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const initialValues = {
  chatRoomId: '',
}

const JoinChatRoom = () => {
  const router = useRouter()
  const onFormikSubmit = useCallback(
    (values) => {
      const { chatRoomId } = values
      router.push(`/chat_rooms/${chatRoomId}/`).catch((error) => {
        console.error(error)
      })
    },
    [router]
  )
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Formik initialValues={initialValues} onSubmit={onFormikSubmit}>
        <Form>
          <Stack spacing={2}>
            <Field
              name="chatRoomId"
              variant="standard"
              label="Chat room ID"
              required
              inputProps={{ pattern: '[a-zA-Z0-9]+' }}
              as={TextField}
            />
            <Button type="submit" variant="contained">
              Join the chat room
            </Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  )
}

export default JoinChatRoom
